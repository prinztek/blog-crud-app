import { useState } from "react";
import { Navigate } from "react-router-dom";

function SignUp() {
  const [toHome, setToHome] = useState(false);
  const [newUserCredentials, setNewUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  if (toHome === true) {
    return <Navigate to="/" />;
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (newUserCredentials.password !== newUserCredentials.confirmPassword) {
      alert("password does not match");
      return;
    }

    async function createNewAccount() {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserCredentials),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setToHome(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    createNewAccount();
  }

  const onInputChange = (e) => {
    const target = e.target;
    setNewUserCredentials({
      ...newUserCredentials,
      [target.name]: target.value,
    });
  };

  return (
    <form
      className="max-w-lg mx-auto my-auto p-6 bg-white shadow-md rounded-md"
      onChange={onInputChange}
      onSubmit={createNewAccount}
    >
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <div className="mb-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        Create New Account
      </button>
    </form>
  );
}

export default SignUp;
