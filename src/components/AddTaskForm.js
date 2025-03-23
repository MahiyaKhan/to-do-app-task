import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask({ todo: taskText });
      setTaskText("");
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
