import React from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

function TaskColumn({
  title,
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onTaskMove,
}) {
  // Set up drop target
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        onTaskMove(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`task-column ${isOver ? "drop-target" : ""}`}>
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-column">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
