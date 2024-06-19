'use client';
import Link from 'next/link';
import { type Chat } from '@/lib/types';
import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function ChatRoomList({ chats }: { chats: Chat[] }) {
  const [chatList, setChatList] = useState<Chat[]>(chats);

  const supabase = supabaseBrowser();
  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_room' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setChatList((prev) => [...prev, payload.new as Chat]);
          } else if (payload.eventType === 'DELETE') {
            setChatList(chatList.filter((chat) => chat.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setChatList(
              chatList.map((chat) =>
                chat.id === payload.new.id ? (payload.new as Chat) : chat
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, chatList, setChatList]);

  return (
    <>
      <div className="flex justify-between text-green-300 drop-shadow-[0_0px_3px_rgba(55,205,50,1)]">
        <p className="">{chatList.length} chatList</p>
        <button className="hover:text-green-200">create +</button>
      </div>
      <div className="flex flex-col w-full gap-3 py-4 rounded-md ">
        {chatList.map((chat, i) => (
          <Link
            href={`/chat/${chat.id}`}
            key={i}
            className="border text-green-300 drop-shadow-[0_0px_3px_rgba(55,205,50,1)] border-green-300 p-2 rounded-md transition-transform duration-200 ease-in-out hover:translate-x-1 hover:text-green-200 hover:border-green-200"
          >
            <div>{chat.title}</div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
