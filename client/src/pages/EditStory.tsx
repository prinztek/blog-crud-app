import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function EditStory() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({
    title: "",
    content: "",
  });

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
      } catch (error) {
        console.error("Error:", error); // Handle errors
      }
    }
    getStoryById();
  }, []);

  function handleInputChange(e) {
    const target = e.target;
    setStory({ ...story, [target.name]: target.value });
    // console.log(story);
  }

  // this would be an update story
  async function updateStory(e) {
    e.preventDefault();
    // server request to insert a record(story) in database
    try {
      const response = await fetch(`http://localhost:3000/stories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
      });
      if (response.status === 200) {
        console.log("Update successful");
        navigate(`/story/${id}`);
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  }

  return (
    <form
      className="mt-7 p-4 bg-white shadow-md rounded-md space-y-4"
      onChange={handleInputChange}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title of the story..."
          onChange={handleInputChange}
          value={story.title}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-green-500 focus:outline-none sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Content of the story..."
          onChange={handleInputChange}
          value={story.content}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 min-h-[250px] focus:border-green-500 focus:outline-none sm:text-sm"
        ></textarea>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          onClick={updateStory}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-0 focus:border-green-700"
        >
          Save Changes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditStory;
