import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function signOutUser() {
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="border-b border-black shadow-sm p-2">
      <ul className="flex justify-center items-center">
        <li className="mr-auto px-2 py-1">
          <NavLink to="/">Home</NavLink>
        </li>
        {user === null ? (
          <>
            <li className="px-2 py-1">
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li className="px-2 py-1">
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="px-2 py-1">
              <NavLink to="/write-story">Write</NavLink>
            </li>
            <li className="px-2 py-1">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="px-2 py-1">
              <button onClick={signOutUser}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
