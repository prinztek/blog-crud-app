import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { UserProfile } from "../types/User";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);

      if (res) {
        // Assuming res is already parsed JSON
        localStorage.setItem("token", res.token);

        const userObject = {
          user_id: res.user_id,
          username: res.username,
          email: res.email,
          created_at: res.created_at,
        };

        localStorage.setItem("user", JSON.stringify(userObject));
        setToken(res.token);
        setUser(userObject);
        console.log("Registration Success!");

        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);

      if (res) {
        localStorage.setItem("token", res.token);

        const userObject = {
          user_id: res.user_id,
          username: res.username,
          email: res.email,
          created_at: res.created_at,
        };

        localStorage.setItem("user", JSON.stringify(userObject));
        setToken(res.token);
        setUser(userObject);
        console.log("Login Success!");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isLoggedIn = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      // value={{ registerUser, loginUser, user, logout, isLoggedIn }}
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

// - Implement `UserProvider` to manage user state, login, registration, and logout
