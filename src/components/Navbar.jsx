import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar({ setSearchTerm }) {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    toast.success("Logout Successful");

    navigate("/login");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Search loans..."
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="border px-4 py-2 rounded-lg w-full md:w-80"
      />

      <div className="flex items-center gap-4">
        <span className="font-medium">
          {username}
        </span>

        <div className="w-10 h-10 bg-slate-800 rounded-full text-white flex items-center justify-center">
          {username.charAt(0).toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;