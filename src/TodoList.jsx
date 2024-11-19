import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaPlusCircle, FaRegSave } from "react-icons/fa";
import { GoAlert } from "react-icons/go";

export const TodoList = () => {
  const [value, setValue] = useState("");
  const [btn, setBtn] = useState("ADD");
  const [index, setIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleTask = () => {
    if (!value.trim()) return;
    if (index === null) {
      // Add new task
      setTasks((prevState) => [...prevState, { text: value, done: false }]);
    } else {
      // Update existing task
      const updatedTasks = tasks.map((task, id) =>
        id === index ? { ...task, text: value } : task
      );
      setTasks(updatedTasks);
      setIndex(null);
      setBtn("ADD");
    }
    setValue("");
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => index !== i);
    setTasks(updatedTasks);
  };

  const handleUpdate = (index) => {
    setIndex(index);
    setBtn("Update");
    setValue(tasks[index].text);
  };

  const handleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">To-Do List</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-4 mb-6"
      >
        <input
          type="text"
          className="border border-gray-400 rounded-md p-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInput}
          value={value}
          placeholder="Enter your task..."
        />
        <button
          className={`flex items-center px-4 py-2 rounded-md text-white ${
            btn === "ADD"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={handleTask}
        >
          {btn === "ADD" ? (
            <FaPlusCircle className="mr-1" />
          ) : (
            <FaRegSave className="mr-1" />
          )}
          {btn}
        </button>
      </form>
      <div className="w-full max-w-md">
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center bg-white shadow-md rounded-md p-3 ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
              >
                <span className="text-gray-700 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleDone(index)}
                  />
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrashAlt className="mr-1" />
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleUpdate(index)}
                  >
                    <FaEdit className="mr-1" />
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            No tasks <GoAlert className="inline-block" />
          </p>
        )}
      </div>
    </div>
  );
};
