import { UserProfileToken } from "../types/User";

const api = "http://localhost:3000";

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await fetch(`${api}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data: UserProfileToken = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const registerAPI = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${api}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data: UserProfileToken = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
