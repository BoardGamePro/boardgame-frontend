import React from 'react'
import ChatsListItem from '../ChatsListItem'

export default function ChatsList({ chats }) {
  return (
    <div className="flex flex-col gap-[5px]">
      {chats.map((chatInfo) => (
        <ChatsListItem chatInfo={chatInfo} key={chatInfo.id} />
      ))}
    </div>
  )
}
