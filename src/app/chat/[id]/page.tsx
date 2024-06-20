// import ChatRoomHeader from '@/components/chat-room-header';
import ChatTextarea from '@/components/chat-textarea';
import ConversationView from '@/components/conversation-view';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Neo Chat',
  description: 'Join Neo Chat now',
};

export default async function ChatPage({ params }: { params: { id: string } }) {
  const supabase = supabaseBrowser();

  let { data: isValidPage, error } = await supabase
    .from('chat_room')
    .select('id, is_expired')
    .eq('id', `${params.id}`)
    .eq('is_expired', false);

  if (!isValidPage || error) {
    return notFound();
  }

  return (
    <div className="flex items-center w-full h-full  overflow-auto">
      <div className="flex w-full overflow-hidden h-screen ">
        <div className="flex flex-col w-full">
          {/* chat room 헤더 */}
          {/* <ChatRoomHeader /> */}

          {/* 채팅 영역 */}
          <ConversationView chatRoomId={params.id} />

          {/* form 영역 */}
          <div className="p-2">
            <div className="relative mx-auto max-w-3xl">
              <ChatTextarea chatRoomId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
