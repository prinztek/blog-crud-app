import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultStoryList from "../components/SearchResultStoryList";
import StoryList from "../components/StoryList";
import { useAuth } from "../Context/useAuth";
import { UserContext } from "../UserContextProvider";

// // an algorithm to display trending stories
// function StoryList({query}: {query: string | null}) {
//   const filteredStory = stories.filter((s) => s.title.toLowerCase().includes(query?.toLocaleLowerCase()))

//   if (query) {
//     return <div className="story-list">
//       <ul>
//         {filteredStory.map((s) => (<li key={s.id}><Link to={`/story/${s.id}`}>{s.title}</Link></li>))}
//       </ul>
//     </div>
//   }

//   return <div className="story-list">
//     <ul>
//       {stories.map((s) => (<li key={s.id}><Link to={`/story/${s.id}`}>{s.title}</Link></li>))}
//     </ul>
//   </div>
// }

function Home() {
  const { user } = useAuth();
  // const { user } = useContext(UserContext);
  const [search, setSearch] = useSearchParams();
  const [forYouStories, setForYouStories] = useState();

  useEffect(() => {
    // server request for personalized feed
    async function getForYouStories() {
      try {
        const response = await fetch(`http://localhost:3000/stories`);
        if (response.ok) {
          // console.log("Records retrieved successfully");
          const data = await response.json();
          setForYouStories(data);
        } else {
          console.error("Failed to retrieve records", response.status);
          throw new Error("Failed to retrieve records");
        }
      } catch (error) {
        console.error("Error:", error); // Handle errors
      }
    }
    getForYouStories();
  }, []);

  function handleSearchInput(e) {
    e.preventDefault();

    const query = e.target.value;

    if (query) {
      setSearch({
        query,
      });
      console.log(search);
    } else {
      setSearch({});
    }
  }

  function handleSearchRequest() {
    console.log("Make a server request");
  }

  return (
    <div className="flex-grow flex flex-col justify-center">
      <div className="search-result mb-auto">
        <div className="search-input m-3">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-sm mb-5">
            <input
              className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none border-r-2"
              onChange={handleSearchInput}
              type="text"
              placeholder="Search for a story..."
            />
            <button
              onClick={handleSearchRequest}
              type="button"
              className="px-4 text-gray-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10.5 18.5A8 8 0 1010.5 2a8 8 0 000 16z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <h3 className="font-bold text-3xl mb-2">Latest Stories</h3>
        {search.get("query") === null ? (
          <StoryList stories={forYouStories} />
        ) : (
          <SearchResultStoryList query={search.get("query")} />
        )}
      </div>
      {user === null && (
        <div className="get-started-section mb-auto mt-10 h-auto flex flex-col justify-center items-center bg-white border border-black border-opacity-50 rounded-sm p-4">
          <h1 className="text-2xl font-bold mb-2">Got a story to tell?</h1>
          <p className="text-base font-medium text-center mb-5">
            "Sign up, set up your space, and let your words flow. We’re here
            with simple tools and a supportive community to help you share your
            tale. Let’s make it happen!"
          </p>
          <a
            className="text-lg font-semibold bg-white text-green-600 border-green-500 text-center rounded-sm px-5 py-3 border-2 hover:text-white hover:bg-green-500 ease-in-out"
            href="/signup"
          >
            Sign up for free
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;
