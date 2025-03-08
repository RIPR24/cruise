import { createContext, JSX, useState } from "react";

export type user = {
  username?: string;
  role?: string;
  name: string;
  room?: string;
  _id?: string;
  token?: string;
} | null;

type Ccontext = {
  user: user;
  setUser: React.Dispatch<React.SetStateAction<user>> | null;
};

export const CruiseContext = createContext<Ccontext>({
  user: null,
  setUser: null,
});

const AppContext = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<user>(null);

  return (
    <CruiseContext.Provider value={{ user, setUser }}>
      {children}
    </CruiseContext.Provider>
  );
};

export default AppContext;
