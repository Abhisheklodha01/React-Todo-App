import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } = useContext(
    Context
  );

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      setLoader(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandeler}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={loader} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register"> Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
