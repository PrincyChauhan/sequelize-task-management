import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found");
        setErrorMessage("No token found");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/task/get-task/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data); // Check the response
        if (response.data.success) {
          setTask(response.data.task);
        } else {
          const errorMsg = response.data.message || "No task found.";
          setErrorMessage(errorMsg);
          toast.error(errorMsg);
        }
      } catch (error) {
        console.error("Error fetching task:", error.response || error);
        const errorMsg =
          error.response?.data?.message || "Failed to load task.";
        setErrorMessage(errorMsg);
        toast.error(errorMsg); // Directly use the error message
      } finally {
        setLoading(false);
      }
    };
    fetchTaskDetails();
  }, [taskId]);

  if (loading) {
    return <p className="text-center mt-10">Loading task details...</p>;
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Error</h2>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Details</h2>
        <div className="space-y-4">
          {/* Task details */}
          <div>
            <strong>Title:</strong> {task?.title}
          </div>
          <div>
            <strong>Description:</strong> {task?.description}
          </div>
          <div>
            <strong>Assigned To:</strong>
            {task?.assignedToUser.username}
          </div>
          <div>
            <strong>Due Date:</strong>{" "}
            {task?.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {task?.status || "N/A"}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {task?.createdAt
              ? new Date(task.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </div>
          <div>
            <strong>Updated At:</strong>{" "}
            {task?.updatedAt
              ? new Date(task.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </div>

          {/* Subtasks */}
          <div>
            <h3 className="text-xl font-semibold mt-6">Subtasks</h3>
            {task?.subtasks?.length > 0 ? (
              task.subtasks.map((subtask) => (
                <div key={subtask.id} className="p-4 border rounded shadow-sm">
                  <strong>Title:</strong> {subtask?.title}
                  <br />
                  {/* <h4 className="font-bold">{subtask.title}</h4> */}
                  <strong>Description:</strong> {subtask.description}
                  <br />
                  <strong>Status:</strong>{" "}
                  {subtask.isCompleted ? "Completed" : "Pending"}
                  <br />
                  <strong>Created At: </strong>
                  {new Date(subtask.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              ))
            ) : (
              <p>No subtasks available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
