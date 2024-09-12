import { useContext, useState } from "react";
import { UserContext } from "../UserContextProvider";

function ProfileInformation() {
  const { user } = useContext(UserContext);
  const [profileInformation, setProfileInformation] = useState({
    userId: user.user_id,
    username: user.username,
    email: user.email,
    createdAt: user.created_at,
  });

  async function deleteAccount() {
    try {
      const response = await fetch(`http://localhost:3000/users/:id`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Record deleted successfully");
      } else {
        console.error("Failed to delete user", response.status);
        throw new Error("Deletion failed");
      }
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  }

  function handleInputChange(e) {
    const target = e.target;
    setProfileInformation({
      ...profileInformation,
      [target.name]: target.value,
    });
  }

  return (
    <form className="profile-information">
      <p>{user.user_id}</p>
      <label htmlFor="username">Display Name</label>
      <input
        type="text"
        id="username"
        name="username"
        value={profileInformation.username}
        onChange={handleInputChange}
        autoComplete="name" // Suggests names from user profiles
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={profileInformation.email}
        onChange={handleInputChange}
        autoComplete="email" // Suggests email addresses
      />
      <p>{user.createdAt}</p>
      <div className="profile-information-btns">
        <button type="button" onClick={deleteAccount}>
          Delete Account
        </button>
        <button>Save Changes</button>
        <button>Cancel</button>
      </div>
    </form>
  );
}

export default ProfileInformation;
