import React, { useState } from "react";

function TaskModal({ task, onClose, onSave }) {
  const [taskText, setTaskText] = useState(task.todo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onSave({ ...task, todo: taskText });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task description"
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
