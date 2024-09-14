import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useAuth = () => useContext(UserContext);

// - Create `useAuth` hook for accessing authentication functions (`registerUser`, `loginUser`, `logout`, `isLoggedIn`) as well as user and token objects
