import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      const response = await axios.get("http://localhost:3000/auth/get-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { users } = response.data;
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table
            className="w-full border border-gray-300"
            style={{ tableLayout: "fixed" }}
          >
            <thead className="bg-blue-500 text-white">
              <tr>
                <th
                  className="px-4 py-2 border border-gray-300"
                  style={{ width: "10%" }}
                >
                  Sr No
                </th>
                <th
                  className="px-4 py-2 border border-gray-300"
                  style={{ width: "30%" }}
                >
                  Username
                </th>
                <th
                  className="px-4 py-2 border border-gray-300"
                  style={{ width: "40%" }}
                >
                  Email
                </th>
                <th
                  className="px-4 py-2 border border-gray-300"
                  style={{ width: "20%" }}
                >
                  Is Invited
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="w-full px-4 py-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="w-full px-4 py-2 border border-gray-300">
                    {user.username}
                  </td>
                  <td className="w-full px-4 py-2 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="w-full px-4 py-2 border border-gray-300">
                    {user.isInvited ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
