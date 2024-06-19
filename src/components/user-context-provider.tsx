'use client';
import UserContext, { User } from '@/lib/user-context';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function UserContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  const fetchUser = () => {
    const userData = sessionStorage.getItem('neo-user');

    if (!userData) {
      const ramdomId = uuidv4();
      const ramdom5 = Math.floor(Math.random() * 90000) + 10000;
      const user = {
        id: `${ramdomId}`,
        name: `Smith#${ramdom5}`,
      };
      sessionStorage.setItem('neo-user', JSON.stringify(user));
      return setUser(user);
    }

    setUser(JSON.parse(userData));
  };

  useEffect(() => {
    fetchUser();
    setUserLoaded(true);
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoaded }}>
      {children}
    </UserContext.Provider>
  );
}
