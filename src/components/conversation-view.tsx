'use client';
import { useEffect, useRef } from 'react';
import ChatMessage from './message';
import { useStore } from '@/lib/useStore';

export default function ConversationView({
  chatRoomId,
}: {
  chatRoomId: string;
}) {
  const messagesEndRef = useRef(null);
  const { messages } = useStore({ chatRoomId });

  useEffect(() => {
    if (!messagesEndRef.current) return;
    (messagesEndRef.current as HTMLElement).scrollIntoView({
      block: 'start',
      behavior: 'instant',
    });
  }, [messages]);

  // if (isFetchingMessages) {
  //   return (
  //     <div className="flex-1 p-2 h-full flex items-center justify-center">
  //       {/* chat 아이템 */}
  //       <div className="mx-auto max-w-3xl">
  //         <p className="text-center animate-pulse text-green-500 font-semibold text-base sm:text-lg">
  //           Loading...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex-1 p-2 h-full overflow-auto ">
      {/* chat 아이템 */}
      <div className="mx-auto max-w-3xl">
        {messages.map((message, i) => (
          <ChatMessage message={message} key={i} />
        ))}
      </div>
      <div ref={messagesEndRef} style={{ height: 0 }} />
    </div>
  );
}
