import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import ViewTask from "./pages/ViewTask";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/view-task/:taskId" element={<ViewTask />} />
      </Routes>
    </Router>
  );
};

export default App;
