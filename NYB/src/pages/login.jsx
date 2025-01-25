import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the entered password is correct
    if (password === "kitchenkey") {
      // Redirect to the admin dashboard
      navigate("/dashboard/admin");
    } else {
      // Display a message for incorrect password
      alert("Wrong password. Please try again.");
      // Clear the entered password
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
