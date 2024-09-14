import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

function Navigation() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="border-b border-black shadow-sm p-2">
      <ul className="flex justify-center items-center">
        <li className="mr-auto px-2 py-1">
          <NavLink to="/">Home</NavLink>
        </li>
        {!isLoggedIn() ? (
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
              <button onClick={logout}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
