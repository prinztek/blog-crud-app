import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProfileInformation from "./components/ProfileInformation";
import UserStoryList from "./components/UserStoryList";
import EditStory from "./pages/EditStory";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Story from "./pages/Story";
import WriteStory from "./pages/WriteStory";
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function App() {
  return (
    <div className="wrapper flex flex-col h-screen ">
      <Navigation />
      <main className="flex flex-col flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/story/:id" element={<Story />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />}>
              <Route index element={<UserStoryList />} />
              <Route path="stories" element={<UserStoryList />} />
              <Route path="info" element={<ProfileInformation />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/write-story" element={<WriteStory />}></Route>
            <Route path="/edit-story/:id" element={<EditStory />}></Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}
