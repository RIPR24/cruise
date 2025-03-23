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
  setPop: React.Dispatch<React.SetStateAction<string>> | null;
  pop: string;
};

export const CruiseContext = createContext<Ccontext>({
  user: null,
  setUser: null,
  pop: "",
  setPop: null,
});

const AppContext = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<user>(null);
  const [pop, setPop] = useState("");

  return (
    <CruiseContext.Provider value={{ user, setUser, pop, setPop }}>
      {children}
    </CruiseContext.Provider>
  );
};

export default AppContext;
