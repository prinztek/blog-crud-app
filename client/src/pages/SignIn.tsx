import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function SignIn() {
  const { setUser } = useContext(UserContext);
  const [toHome, setToHome] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  if (toHome === true) {
    return <Navigate to="/" />;
  }

  const onInputChange = (e) => {
    const target = e.target;
    setUserCredentials({
      ...userCredentials,
      [target.name]: target.value,
    });
  };

  async function signInUser(e) {
    e.preventDefault();
    // server request to insert a record(story) in database
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json(); // Parse the JSON data from the response
      setUser(data);
      setToHome(true);
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  }

  return (
    <form
      className="max-w-lg mx-auto my-auto p-6 bg-white shadow-md rounded-md"
      onChange={onInputChange}
      onSubmit={signInUser}
    >
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignIn;
