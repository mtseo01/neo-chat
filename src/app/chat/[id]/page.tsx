// import ChatRoomHeader from '@/components/chat-room-header';
import ChatTextarea from '@/components/chat-textarea';
import ConversationView from '@/components/conversation-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neo Chat',
  description: 'Join Neo Chat now',
};

export default function ChatPage({ params }: { params: { id: string } }) {
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
