import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://finloan-pro-backend.onrender.com/api/token/",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      localStorage.setItem(
  "access",
  response.data.access
);

localStorage.setItem(
  "refresh",
  response.data.refresh
);

const userResponse = await axios.get(
  "https://finloan-pro-backend.onrender.com/api/me/",
  {
    headers: {
      Authorization: `Bearer ${response.data.access}`,
    },
  }
);

localStorage.setItem(
  "role",
  userResponse.data.role
);

alert("Login Successful");

if (userResponse.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>
        <p className="text-center mt-4">
  Don't have an account?
  <a
    href="/register"
    className="text-blue-500 ml-2"
  >
    Register
  </a>
</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;