'use client'

import React, { useState } from 'react'
import Input from '../Input'
import { useAddNote } from '@/api/authApi/authApi'

export default function AddNoteForm({ gameName, page, onFormCancel }) {
  const [noteTitle, setNoteTitle] = useState('')
  const [noteText, setNoteText] = useState('')

  const { mutate: addNote } = useAddNote()

  const onSubmit = async (evt) => {
    evt.preventDefault()

    try {
      if (noteTitle && noteText) {
        addNote({ gameName, page, text: noteText, title: noteTitle })
        onFormCancel()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      className="flex flex-col gap-[8px] rounded-[8px] border border-[#E5E5E5] bg-white px-[12px] py-[10px]"
      onSubmit={onSubmit}
    >
      <label>
        <h3 className="mb-[8px] !text-[14px]/[16px] font-medium">
          Title field
        </h3>
        <Input
          placeholder="Note title…"
          required
          value={noteTitle}
          setValue={setNoteTitle}
        />
      </label>

      <label>
        <h3 className="mb-[8px] !text-[14px]/[16px] font-medium">Note field</h3>
        <textarea
          className="min-h-[100px] w-full resize-none rounded-[8px] border-[1px] border-(--color-text-light-gray-border) bg-white px-[15px] py-[9px] text-[15px] font-normal focus:outline-none"
          placeholder="Add your clarification..."
          value={noteText}
          onChange={(evt) => setNoteText(evt.target.value)}
        ></textarea>
      </label>

      <div className="flex justify-between">
        <button
          className="flex items-center justify-center gap-[4px] rounded-[4px] border border-[#E5E5E5] bg-white px-[12px] py-[7px] !text-[12px]/[16px] font-medium"
          type="submit"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3419_3054)">
              <path
                d="M6.99984 5.83325C6.53835 5.83325 6.08722 5.9701 5.70351 6.22649C5.31979 6.48288 5.02072 6.8473 4.84412 7.27366C4.66751 7.70002 4.62131 8.16917 4.71134 8.6218C4.80137 9.07442 5.0236 9.49018 5.34992 9.8165C5.67625 10.1428 6.09201 10.3651 6.54463 10.4551C6.99725 10.5451 7.46641 10.4989 7.89277 10.3223C8.31913 10.1457 8.68354 9.84663 8.93993 9.46292C9.19632 9.0792 9.33317 8.62808 9.33317 8.16659C9.33317 7.54775 9.08734 6.95425 8.64975 6.51667C8.21217 6.07908 7.61868 5.83325 6.99984 5.83325ZM6.99984 9.33325C6.76909 9.33325 6.54353 9.26483 6.35167 9.13663C6.15982 9.00844 6.01028 8.82623 5.92198 8.61305C5.83368 8.39987 5.81057 8.16529 5.85559 7.93898C5.90061 7.71267 6.01172 7.50479 6.17488 7.34163C6.33804 7.17847 6.54592 7.06735 6.77223 7.02234C6.99854 6.97732 7.23312 7.00042 7.4463 7.08873C7.65948 7.17703 7.84169 7.32656 7.96989 7.51842C8.09808 7.71028 8.16651 7.93584 8.16651 8.16659C8.16651 8.476 8.04359 8.77275 7.8248 8.99154C7.606 9.21034 7.30926 9.33325 6.99984 9.33325Z"
                fill="#212121"
              />
              <path
                d="M13.146 2.40451L11.5955 0.854012C11.3253 0.582378 11.004 0.367033 10.65 0.220443C10.2961 0.0738527 9.91653 -0.00107016 9.53342 1.15478e-05H2.91667C2.1434 0.000937798 1.40208 0.308526 0.855295 0.855307C0.308515 1.40209 0.00092625 2.14341 0 2.91668L0 11.0833C0.00092625 11.8566 0.308515 12.5979 0.855295 13.1447C1.40208 13.6915 2.1434 13.9991 2.91667 14H11.0833C11.8566 13.9991 12.5979 13.6915 13.1447 13.1447C13.6915 12.5979 13.9991 11.8566 14 11.0833V4.4666C14.0011 4.08348 13.9262 3.70396 13.7796 3.35C13.633 2.99605 13.4176 2.67468 13.146 2.40451ZM9.91667 1.21334V1.75001C9.91667 2.21414 9.73229 2.65926 9.4041 2.98745C9.07592 3.31564 8.6308 3.50001 8.16667 3.50001H5.83333C5.3692 3.50001 4.92409 3.31564 4.5959 2.98745C4.26771 2.65926 4.08333 2.21414 4.08333 1.75001V1.16668H9.53342C9.66251 1.16782 9.79107 1.18348 9.91667 1.21334ZM12.8333 11.0833C12.8333 11.5475 12.649 11.9926 12.3208 12.3208C11.9926 12.649 11.5475 12.8333 11.0833 12.8333H2.91667C2.45254 12.8333 2.00742 12.649 1.67923 12.3208C1.35104 11.9926 1.16667 11.5475 1.16667 11.0833V2.91668C1.16667 2.45255 1.35104 2.00743 1.67923 1.67924C2.00742 1.35105 2.45254 1.16668 2.91667 1.16668V1.75001C2.91759 2.52328 3.22518 3.2646 3.77196 3.81138C4.31874 4.35816 5.06007 4.66575 5.83333 4.66668H8.16667C8.9002 4.6644 9.60585 4.38531 10.1425 3.88522C10.6791 3.38513 11.0072 2.7009 11.0612 1.96934L12.3212 3.22935C12.6481 3.55827 12.8321 4.00284 12.8333 4.4666V11.0833Z"
                fill="#212121"
              />
            </g>
            <defs>
              <clipPath id="clip0_3419_3054">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Save
        </button>
        <button
          className="flex items-center justify-center gap-[4px] rounded-[4px] border border-[#E5E5E5] bg-white px-[12px] py-[7px] !text-[12px]/[16px] font-medium"
          type="button"
          onClick={onFormCancel}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9999 4C11.8749 3.87502 11.7053 3.80481 11.5285 3.80481C11.3518 3.80481 11.1822 3.87502 11.0572 4L7.99988 7.05733L4.94255 4C4.81753 3.87502 4.64799 3.80481 4.47121 3.80481C4.29444 3.80481 4.1249 3.87502 3.99988 4C3.8749 4.12502 3.80469 4.29456 3.80469 4.47133C3.80469 4.64811 3.8749 4.81765 3.99988 4.94267L7.05721 8L3.99988 11.0573C3.8749 11.1824 3.80469 11.3519 3.80469 11.5287C3.80469 11.7054 3.8749 11.875 3.99988 12C4.1249 12.125 4.29444 12.1952 4.47121 12.1952C4.64799 12.1952 4.81753 12.125 4.94255 12L7.99988 8.94267L11.0572 12C11.1822 12.125 11.3518 12.1952 11.5285 12.1952C11.7053 12.1952 11.8749 12.125 11.9999 12C12.1249 11.875 12.1951 11.7054 12.1951 11.5287C12.1951 11.3519 12.1249 11.1824 11.9999 11.0573L8.94254 8L11.9999 4.94267C12.1249 4.81765 12.1951 4.64811 12.1951 4.47133C12.1951 4.29456 12.1249 4.12502 11.9999 4Z"
              fill="#212121"
            />
          </svg>
          Cancel
        </button>
      </div>
    </form>
  )
}
