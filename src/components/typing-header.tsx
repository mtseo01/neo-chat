'use client';
import Typewriter from 'typewriter-effect';

export default function TypingHeader() {
  return (
    <Typewriter
      options={{
        strings: [
          'Wake up, Neo...',
          'The Matrix has you...',
          'Follow the white rabbit...',
          'Knock, knock, Neo...',
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
}
