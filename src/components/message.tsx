'use client';

import UserContext from '@/lib/user-context';
import React, { useContext } from 'react';

export type Message = {
  id: string;
  created_at: string;
  text: string;
  send_by: string;
  user_id: string;
  is_edited: boolean;
  chat_room_id: string;
};

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default function ChatMessage({ message }: { message: Message }) {
  const { user } = useContext(UserContext);
  return (
    <div className="my-5">
      <div className="text-green-400 flex justify-between items-center">
        <div className="flex items-center text-green-400">
          <p className="mr-2">{message.send_by}</p>
          {message.user_id === user?.id ? (
            <p className="mr-2 text-green-400">(you)</p>
          ) : null}
          <p className="text-sm text-gray-600">
            {formatTime(message.created_at)}
          </p>
        </div>
        {message.user_id === user?.id ? (
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="5" cy="12" r="1"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
            </svg>
          </button>
        ) : null}
      </div>

      <p className="text-green-500">
        {message.text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
