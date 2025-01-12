import React, { useState } from "react";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!name) {
      setError("Name must be fill");
      return;
    }

    setError("");

    try {
      const res = await axiosInstance.post("/api/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (res.data && res.data.error) {
        setError(res.data.message);
        return;
      }

      if (res.data && res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (error.res && error.res.data && error.res.data.message) {
        setError(error.res.data.message);
      } else {
        setError("An expected error occurred. Please try again");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col flex-grow min-h-screen bg-gray-100 justify-center items-center w-full">
        <div className="text-4xl text-medium font-bold py-4 caveat">
          Note App
        </div>
        <div className="w-[80%] md:w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Register
          </h1>
          <form className="mt-4" onSubmit={handleSignup}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
            {error && <p className="text-sm pb-4 text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full px-3 py-2 text-white bg-primary rounded-lg"
            >
              Login
            </button>
          </form>
          <div className="mt-2">
            <Link to="/login" className="text-sm text-gray-600 hover:underline">
              Already have Account? <span className="text-primary">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
