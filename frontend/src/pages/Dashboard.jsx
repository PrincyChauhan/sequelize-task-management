import Navbar from "../components/Navbar";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <p>Here is your dashboard content.</p>
      </div>
    </div>
  );
};

export default Dashboard;
