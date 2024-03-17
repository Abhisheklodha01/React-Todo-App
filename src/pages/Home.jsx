import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../constants";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Context } from "../main";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${server}/tasks/gettask`, {
          withCredentials: true,
        })
        .then((res) => setTasks(res.data.tasks));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [refresh]);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
  isAuthenticated ? (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandeler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              required
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((task) => (
          <TodoItem
            title={task.title}
            description={task.description}
            isCompeleted={task.isCompeleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={task._id}
            key={task._id}
          />
        ))}
      </section>
    </div>
  ) : (
    <p className="paragraph">Please Login to Add Task and view your tasks</p>
  )
  )
};

export default Home;
