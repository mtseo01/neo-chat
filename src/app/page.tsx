import TypingHeader from '@/components/typing-header';
import ChatRoomList from '@/components/chat-room-list';
import { type Chat } from '@/lib/types';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default async function Page() {
  const supabase = supabaseBrowser();
  // fetch chat room list
  const { data } = await supabase
    .from('chat_room')
    .select('*')
    .eq('is_expired', false);

  return (
    <div className="items-center min-h-screen p-2 mx-auto text-green-300 md:max-w-3xl md:p-24 ">
      <div className="relative text-2xl  md:text-3xl min-h-9 drop-shadow-[0_0px_3px_rgba(55,205,50,1)]">
        <TypingHeader />
      </div>

      <div className="w-full mt-10">
        <ChatRoomList chats={data as Chat[]} />
      </div>
    </div>
  );
}
