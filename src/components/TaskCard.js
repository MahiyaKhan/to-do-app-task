import React from "react";
import { useDrag } from "react-dnd";

function TaskCard({ task, onEdit, onDelete }) {
  // Set up drag source
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`task-card ${isDragging ? "dragging" : ""}`}>
      <div className="task-content">
        <p>{task.todo}</p>
      </div>
      <div className="task-actions">
        <button onClick={onEdit} className="edit-btn">
          Edit
        </button>
        <button onClick={onDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
