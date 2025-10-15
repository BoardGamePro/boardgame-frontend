import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AiMessage({ message }) {
  return (
    <div className="prose max-w-none text-[18px] text-black">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
    </div>
  )
}
