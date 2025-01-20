import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    subtasks: [{ title: "", description: "" }],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log("Form Data========:", formData);

  // Handle changes in main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in subtasks
  const handleSubtaskChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index][name] = value;
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  // Add a new subtask
  const addSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: "", description: "" }],
    });
  };

  // Remove a subtask
  const removeSubtask = (index) => {
    const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token=--------------:", token);

    if (!token) {
      setError("No token found");
      return;
    }
    setError(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/task/create-task",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setError("");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        subtasks: [{ title: "", description: "" }],
      });
      setTimeout(() => {
        navigate("/tasks");
      }, 100);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Task</h2>
        {error && <p className="error text-red-500">{error}</p>}
        {success && <p className="success text-green-500">{success}</p>}

        {loading ? (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin border-4 border-t-4 border-blue-600 border-solid rounded-full w-8 h-8"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Due Date:
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Assigned To:
              </label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Subtasks:
              </label>
              {formData.subtasks.map((subtask, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    name="title"
                    value={subtask.title}
                    onChange={(e) => handleSubtaskChange(index, e)}
                    placeholder={`Subtask ${index + 1} Title`}
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    name="description"
                    value={subtask.description}
                    onChange={(e) => handleSubtaskChange(index, e)}
                    placeholder={`Subtask ${index + 1} Description`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="text-red-500 mt-2"
                  >
                    Remove Subtask
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubtask}
                className="text-blue-500 mt-2"
              >
                Add Subtask
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
