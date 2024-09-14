import { useEffect, useState } from "react";
import { useAuth } from "../Context/useAuth";
import { UserContext } from "../UserContextProvider";

function ProfileInformation() {
  const { user } = useAuth();
  // const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState(user?.username);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (username === user?.username) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [username, setUsername]);

  function handleUsernameChange(e) {
    const target = e.target;
    setUsername(target.value);
  }

  async function deleteAccount() {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${user.user_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Record deleted successfully");
        // Redirect or update state after deletion
      } else {
        console.error("Failed to delete user", response.status);
        throw new Error("Deletion failed");
      }
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  }

  // async function updateUsername() {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/users/${user.user_id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify({ username: username }),
  //       }
  //     );
  //     if (response.ok) {
  //       console.log("Updated successfully"); // username is updated
  //       const updatedUser = await response.json();
  //       setUser(updatedUser);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function revertChanges() {
    setUsername(user?.username);
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-100 mx-auto p-6">
      <div className="space-y-4 px-4 py-6">
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium w-1/4">Username:</label>
          <input
            type="text"
            id="profile-info-username"
            onChange={handleUsernameChange}
            value={username}
            className="text-gray-900 bg-transparent border px-1 rounded-sm w-3/4"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium w-1/4">Email:</label>
          <p>{user?.email}</p>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium w-1/4">Joined:</label>
          <p>{user?.created_at}</p>
        </div>

        <div className="flex items-center justify-center space-x-4 p-2">
          <button
            type="button"
            onClick={deleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </button>

          <button
            type="button"
            disabled={!isChanged}
            // onClick={updateUsername}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {isChanged ? "Save Changes" : "No Changes"}
          </button>

          <button
            type="button"
            onClick={revertChanges}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
