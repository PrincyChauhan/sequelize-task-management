import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskListing = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      console.log("Token:", token);
      console.log("Role:", role);

      if (!token || role !== "admin") {
        setErrorMessage("Access denied: Admins only.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/task/get-tasks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API response:", response.data);

        if (response.data.tasks) {
          setTasks(response.data.tasks);
          console.log("Tasks state set successfully:", response.data.tasks);
        } else {
          setErrorMessage(response.data.message || "No tasks found.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.response || error);
        setErrorMessage(
          error.response?.data?.message || "Failed to load tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteClick = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token------------:", token);
      const response = await axios.delete(
        `http://localhost:3000/task/delete-task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Delete response----------:", response.data);

      if (response.data.success) {
        toast.success("Task deleted successfully!");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the task.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      if (!taskId || !newStatus) {
        toast.error("Invalid task or status.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/task/update-task-status",
        { taskId, newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Task status updated successfully!");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        toast.error("Failed to update task status.");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error("An error occurred while updating task status.");
    }
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tasks List (Admin View)
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded text-center">
            {errorMessage}
          </div>
        )}
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title and username ..."
            className="w-full p-2 border rounded"
          />
        </div>

        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Task Title</th>
                <th className="px-4 py-2 border">Assigned To (Username)</th>
                <th className="px-4 py-2 border">Due Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks
                .filter(
                  (task) =>
                    task.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    task.assignedToUser?.username
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-2 border">{task.title}</td>
                    <td className="px-4 py-2 border">
                      {task.assignedTo
                        ? `${task.assignedToUser.username} (${task.assignedToUser.email})`
                        : "Unassigned"}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className="border p-2"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border flex justify-around">
                      <button
                        onClick={() => handleDeleteClick(task.id)}
                        className="text-xl text-red-600 hover:opacity-75"
                        title="Delete Task"
                      >
                        🗑️
                      </button>
                      <Link
                        to={`/update-task/${task.id}`}
                        className="text-xl text-blue-600 hover:text-blue-800"
                        title="Update Task"
                      >
                        ✏️
                      </Link>
                      <Link
                        to={`/view-task/${task.id}`}
                        className="text-xl text-green-600 hover:text-green-800"
                        title="View Task"
                      >
                        👁️
                      </Link>
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

export default TaskListing;
