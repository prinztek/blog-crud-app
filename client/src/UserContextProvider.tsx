import { createContext, ReactNode, useState } from "react";
import { User } from "./types/userInterface.ts";

export const UserContext = createContext(null);

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
