import React from "react";
import { useState, useEffect } from "react";
import TaskBoard from "./components/TaskBoard";
import AddTaskForm from "./components/AddTaskForm";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/todos");

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform API data to include status
        const transformedTasks = data.todos.map((todo) => ({
          ...todo,
          status: todo.completed ? "completed" : "pending",
        }));

        setTasks(transformedTasks);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching tasks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (newTask) => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: newTask.todo,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const addedTask = await response.json();

      // Add status field
      const taskWithStatus = {
        ...addedTask,
        status: "pending",
      };

      setTasks((prevTasks) => [...prevTasks, taskWithStatus]);
    } catch (err) {
      setError(err.message);
      console.error("Error adding task:", err);
    }
  };

  // Update task
  const updateTask = async (taskId, updatedFields) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating task:", err);
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Map status to completed boolean for API
      const completed = newStatus === "completed";

      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus, completed } : task
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating task status:", err);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting task:", err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <Header />
      <AddTaskForm onAddTask={addTask} />
      <TaskBoard
        tasks={tasks}
        onUpdateTask={updateTask}
        onUpdateTaskStatus={updateTaskStatus}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
