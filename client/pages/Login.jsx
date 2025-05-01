import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendURL, setIsLoggedIn } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          toast.success(data.message);
          setTimeout(() => {
            navigate("/", { state: { email } }); 
          }, 3000); 
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          
          toast.success("Login Successful");
          setTimeout(() => {
            navigate("/", { state: { email } }); 
          }, 3000); 
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {state === "Sign Up"
            ? "Create your Account"
            : "Login to Your Account"}
        </p>
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p
            onClick={() => navigate("/passwordReset")}
            className="text-sm text-blue-500 cursor-pointer hover:underline"
          >
            Forget Password?
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {state}
          </button>

          {state === "Sign Up" ? (
            <p className="text-center text-gray-600 ">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={() => setState("Log In")}
              >
                Log In
              </span>
            </p>
          ) : (
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
