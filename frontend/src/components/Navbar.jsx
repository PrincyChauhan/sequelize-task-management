import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold text-lg">Admin Dashboard</div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/dashboard"
              className="inline-block w-full px-4 py-2  focus:border-blue-500 text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="inline-block w-full px-4 py-2  focus:border-blue-500 text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="inline-block w-full px-4 py-2 focus:border-blue-500 text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="inline-block w-full px-4 py-2  focus:border-blue-500 text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
