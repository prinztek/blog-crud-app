import { useEffect, useState } from "react";
import StoryList from "./StoryList";

function SearchResultStoryList({ query }: { query: string | null }) {
  const [searhResultStories, setSearhResultStories] = useState([]);
  const filteredStories = searhResultStories.filter((s) =>
    s.title.toLowerCase().includes(query?.toLowerCase())
  );

  useEffect(() => {
    async function getAllUserStories() {
      try {
        const response = await fetch(`http://localhost:3000/stories`);

        const data = await response.json(); // Parse the JSON data from the response
        setSearhResultStories(data);
      } catch (error) {
        console.error("Error:", error); // Handle errors
      }
    }
    getAllUserStories();
  }, []);

  return <StoryList stories={filteredStories}></StoryList>;
}

export default SearchResultStoryList;
