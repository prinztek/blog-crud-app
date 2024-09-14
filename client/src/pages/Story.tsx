import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { UserContext } from "../UserContextProvider";
import formatDate from "../utils/dateFormatter";

function Story() {
  // const { user } = useContext(UserContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    // server request for specific story
    async function getStoryById() {
      try {
        const response = await fetch(`http://localhost:3000/stories/${id}`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json(); // Parse the JSON data from the response
        setStory(data);
        console.log(data.content);
      } catch (error) {
        console.error("Error:", error); // Handle errors
      }
    }
    getStoryById();
  }, []);

  async function deleteStory() {
    try {
      const response = await fetch(
        `http://localhost:3000/stories/${story.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Record deleted successfully");
        navigate("/profile/stories");
      } else {
        console.error("Failed to delete user", response.status);
        throw new Error("Deletion failed");
      }
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  }

  async function editStory() {
    navigate(`/edit-story/${story.story_id}`);
  }

  if (!story) {
    return (
      <div>
        <p>No story found...</p>
        <Link to={"/"}>Go Back Home</Link>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
        {/* Header Section */}
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h3 className="text-3xl font-semibold mb-2">{story.title}</h3>
          <p className="text-gray-600 flex justify-between items-center">
            @{story.username}
            <span className="text-xs">{formatDate(story.created_at)}</span>
          </p>
        </header>

        {/* Content Section */}
        <section
          style={{ whiteSpace: "pre-wrap" }}
          className="mb-6 border-b border-gray-200 pb-4"
        >
          <p className="text-gray-800 px-2 py-4">{story.content}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-3xl font-semibold mb-2">{story.title}</h3>
        <p className="text-gray-600 flex justify-between items-center">
          @{story.username}
          <span className="text-xs">{formatDate(story.created_at)}</span>
        </p>
      </header>

      {/* Content Section */}
      <section
        style={{ whiteSpace: "pre-wrap" }}
        className="mb-6 border-b border-gray-200 pb-4"
      >
        <p className="text-gray-800 px-2 py-4">{story.content}</p>
      </section>
      {/* Comment Section */}

      {/* Actions */}
      {story.user_id === user.user_id && (
        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            onClick={editStory}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit Story
          </button>
          <button
            type="button"
            onClick={deleteStory}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Story
          </button>
        </div>
      )}
    </div>
  );
}

export default Story;
