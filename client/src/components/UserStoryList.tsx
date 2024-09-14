import { useContext, useEffect, useState } from "react";
import { useAuth } from "../Context/useAuth";
import { UserContext } from "../UserContextProvider";
import StoryList from "./StoryList";

function UserStoryList() {
  const { user, token } = useAuth();
  // const { user } = useContext(UserContext);
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    // server request for specific story
    async function getAllUserStories() {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${user.user_id}/stories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json(); // Parse the JSON data from the response
        setUserStories(data);
      } catch (error) {
        console.error("Error:", error); // Handle errors
      }
    }
    getAllUserStories();
  }, []);

  return <StoryList stories={userStories}></StoryList>;
}

export default UserStoryList;
