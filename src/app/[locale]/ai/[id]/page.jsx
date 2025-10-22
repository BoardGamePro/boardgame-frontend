'use client'

import {
  useGetChatInfo,
  useGetChatMessages,
  useGetResultByQueryMessage,
  useSendMessage,
} from '@/api/aiApi/aiApi'
import AiLayout from '@/components/layouts/AiLayout'
import MessagesSection from '@/components/ui/MessagesSection'
import AiInputText from '@/components/widgets/AiInputText'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AiChatPage() {
  const params = useParams()
  const chatId = params.id
  const [messages, setMessages] = useState([])
  const [jobId, setJobId] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useGetChatMessages(chatId)

  const {
    data: chatInfo,
    isLoading: isChatInfoLoading,
    error: chatInfoError,
  } = useGetChatInfo(chatId)

  const {
    mutateAsync: sendMessage,
    isPending: isSendMessagePending,
    error: sendMessageError,
  } = useSendMessage()

  const { data: resultData } = useGetResultByQueryMessage(jobId, {
    refetchInterval: (data) => (data?.queued === false ? false : 1500),
    enabled: !!jobId,
  })

  useEffect(() => {
    if (messagesData?.messages.length >= messages.length) {
      setMessages(messagesData?.messages)
    }
  }, [messagesData, messages])

  useEffect(() => {
    if (resultData?.queued === false) {
      setIsGenerating(false)
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: resultData.text },
      ])
      setJobId(null)
    }
  }, [resultData])

  const handleSubmit = async (query) => {
    try {
      setIsGenerating(true)
      setMessages((prev) => [...prev, { role: 'user', content: query }])
      const res = await sendMessage({ chatId, query })
      setJobId(res.id)
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
    }
  }

  return (
    <AiLayout>
      <h1 className="mb-[25px] text-[32px] font-bold">
        {isChatInfoLoading
          ? 'Loading...'
          : chatInfoError
            ? 'Chat was not found'
            : chatInfo.title}
      </h1>
      <MessagesSection
        messages={messages}
        isLoading={isMessagesLoading}
        error={messagesError?.message}
      />

      {isGenerating && (
        <div className="my-3 animate-pulse text-gray-500">
          AI is thinking...
        </div>
      )}

      <AiInputText
        placeholder="Enter your message"
        isPending={isSendMessagePending || isGenerating}
        handleSubmit={handleSubmit}
      />
      <p className="text-red-500">{sendMessageError?.message}</p>
    </AiLayout>
  )
}
