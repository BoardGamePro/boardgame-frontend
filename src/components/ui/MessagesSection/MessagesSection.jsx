import React, { useEffect, useRef } from 'react'
import AiMessage from '../AiMessage'
import UserMessage from '../UserMessage'

export default function MessagesSection({ messages, isLoading, error }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="mb-[35px] min-h-0 w-full flex-1 overflow-y-auto">
      <section className="mx-auto flex h-full w-[800px] flex-col gap-[30px] text-start">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          messages &&
          messages.map((messageInfo, index) =>
            messageInfo.role === 'model' ? (
              <AiMessage key={index} message={messageInfo.content} />
            ) : (
              <UserMessage key={index} message={messageInfo.content} />
            )
          )
        )}

        <div ref={bottomRef} />
      </section>
    </div>
  )
}
