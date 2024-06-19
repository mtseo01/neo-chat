import { useEffect, useState } from 'react';
import { supabaseBrowser } from './supabase/browser';
import { Message } from '@/components/message';
import { User } from './user-context';

type PropsType = {
  chatRoomId: string;
};

const supabase = supabaseBrowser();

export function useStore(props: PropsType) {
  const [messages, setMessages] = useState<Message[]>([]);
  // const [users] = useState(new Map());
  const [newMessage, handleNewMessage] = useState<Message>();
  // const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null);
  // const [deletedChatRoom, handleDeletedChatRoom] = useState(null);

  useEffect(() => {
    // 채팅 실시간 구독
    const messageListener = supabase
      .channel('public:message')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'message' },
        (payload) => {
          handleNewMessage(payload.new as Message);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'message' },
        (payload) => {
          handleNewMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, []);

  //
  useEffect(() => {
    if (!props.chatRoomId) return;

    fetchMessages(props.chatRoomId, (messages) => {
      if (messages.length > 0) {
        setMessages(messages);
      } else {
        setMessages([]);
      }
    });
  }, [props.chatRoomId]);

  useEffect(() => {
    if (newMessage && newMessage.chat_room_id === props.chatRoomId) {
      setMessages(messages.concat(newMessage));
    }
  }, [newMessage]);

  return {
    messages: messages,
  };
}

export const fetchMessages = async (
  chatRoomId: string,
  setState: (messages: Message[]) => void
) => {
  try {
    let { data }: { data: Message[] | null } = await supabase
      .from('message')
      .select(`*`)
      .eq('chat_room_id', chatRoomId)
      .order('created_at', { ascending: true });
    if (setState) setState(data as Message[]);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const addMessage = async ({
  text,
  chat_room_id,
  user,
}: {
  text: string;
  chat_room_id: string;
  user: User;
}) => {
  try {
    let { data } = await supabase
      .from('message')
      .insert([{ text, chat_room_id, send_by: user.name, user_id: user.id }])
      .select();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
