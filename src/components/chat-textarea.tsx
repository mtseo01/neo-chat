'use client';
import { addMessage } from '@/lib/useStore';
import UserContext, { User } from '@/lib/user-context';
import { useContext, useEffect, useRef, useState } from 'react';

export default function ChatTextarea({ chatRoomId }: { chatRoomId: string }) {
  const { user } = useContext(UserContext);

  const [text, setText] = useState('');
  const [textareaHeight, setTextareaHeight] = useState(44);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current && textareaHeight < 164) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [text, textareaHeight]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (
      !e.shiftKey &&
      e.key === 'Enter' &&
      text.trim() !== '' &&
      !isSubmitting
    ) {
      e.preventDefault();
      setIsSubmitting(true);
      await addMessage({ chat_room_id: chatRoomId, text, user: user as User });

      resetText();
      setIsSubmitting(false);
    }
  };

  const handleClick = async () => {
    if (text.trim() === '' || isSubmitting) return;
    setIsSubmitting(true);
    await addMessage({ chat_room_id: chatRoomId, text, user: user as User });
    resetText();
    setIsSubmitting(false);
  };

  const resetText = () => {
    setText('');
    setTextareaHeight(44);
  };
  return (
    <>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full py-2.5 pl-5 pr-16 overflow-hidden text-green-300 bg-transparent border border-green-300 rounded-md resize-none focus:outline-none focus:ring-0 focus-visible:ring-0"
        name="textarea"
        id="textarea"
        dir="auto"
        tabIndex={0}
        autoFocus
        style={{ height: textareaHeight, maxHeight: '400px' }}
      />
      <button
        onClick={handleClick}
        className={`absolute p-1 bg-green-800 rounded-sm  bottom-3 right-2 ${
          text.trim().length > 0 ? 'bg-green-300 text-white' : ''
        }`}
      >
        send
      </button>
    </>
  );
}
