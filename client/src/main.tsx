import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { UserProvider } from "./Context/UserProvider.tsx";
import "./index.css";
// import UserContextProvider from "./UserContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <UserContextProvider> */}
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
    {/* </UserContextProvider> */}
  </StrictMode>
);
