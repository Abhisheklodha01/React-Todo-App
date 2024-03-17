import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants";

const Header = () => {
  const LogoutHandeler = async () => {
    try {
      setLoader(true);
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoader(false);
      <Navigate to='/login' />
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoader(false);
    }
  };

  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(Context);
  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>

        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button disabled={loader} onClick={LogoutHandeler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

Header.propTypes = {};

export default Header;
