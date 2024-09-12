import { NavLink, Outlet } from "react-router-dom";

const profileNavItems = [
  { name: "Stories", path: "stories" },
  { name: "My Account", path: "info" },
];

function Profile() {
  return (
    <div className="flex flex-col">
      {/* Profile Nav Items */}
      <div className="w-100 px-4 py-2 flex items-center">
        <ul className="flex space-x-4">
          {profileNavItems.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `py-2 px-4 transition 
                  ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
