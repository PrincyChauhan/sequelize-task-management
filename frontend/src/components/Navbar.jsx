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
              to="/create-user"
              className="inline-block w-full px-4 py-2  focus:border-blue-500 text-white"
            >
              Create User
            </Link>
          </li>
          <li>
            <Link
              to="/create-task"
              className="inline-block w-full px-4 py-2 focus:border-blue-500 text-white"
            >
              Create Task
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="inline-block w-full px-4 py-2 focus:border-blue-500 text-white"
            >
              Tasks List
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
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
