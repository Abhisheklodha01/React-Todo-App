import react, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "./constants";
import { Context } from "./main";

function App() {
  const { setUser, setIsAuthenticated, setLoader } = useContext(Context);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${server}/users/myprofile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user), setIsAuthenticated(true), setLoader(false);
      })
      .catch((error) => {
        setUser({}),
          setIsAuthenticated(false),
          error.response.data.message,
          setLoader(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
