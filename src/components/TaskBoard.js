import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskModal from "./TaskModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function TaskBoard({ tasks, onUpdateTask, onUpdateTaskStatus, onDeleteTask }) {
  const [editingTask, setEditingTask] = useState(null);

  const lanes = [
    { id: "pending", title: "Pending" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => {
      if (status === "in-progress") {
        return task.status === "in-progress";
      } else if (status === "completed") {
        return task.status === "completed";
      } else {
        return task.status === "pending" || !task.status;
      }
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  const handleSaveTask = (updatedTask) => {
    onUpdateTask(updatedTask.id, { todo: updatedTask.todo });
    setEditingTask(null);
  };

  const handleTaskMove = (taskId, newStatus) => {
    onUpdateTaskStatus(taskId, newStatus);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        {lanes.map((lane) => (
          <TaskColumn
            key={lane.id}
            title={lane.title}
            status={lane.id}
            tasks={getTasksByStatus(lane.id)}
            onEditTask={handleEdit}
            onDeleteTask={onDeleteTask}
            onTaskMove={handleTaskMove}
          />
        ))}
        {editingTask && (
          <TaskModal
            task={editingTask}
            onClose={handleCloseModal}
            onSave={handleSaveTask}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
