import { createContext } from 'react';

export type User = {
  id: string;
  name: string;
};

const UserContext = createContext<{ user: User | null; userLoaded: boolean }>({
  user: null,
  userLoaded: false,
});

export default UserContext;
