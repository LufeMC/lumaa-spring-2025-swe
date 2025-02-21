import { Task } from "../store/tasks";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import EditTaskDialog from "./EditTaskDialog";

interface TaskProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, onUpdate, onDelete }: TaskProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center border-l-4 transition-all duration-300 ease-in-out 
        hover:shadow-lg hover:border-primary"
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <button
            onClick={() => onUpdate(task.id, { isComplete: !task.isComplete })}
            className={`rounded-full p-2 transition-all hover:scale-105 ${task.isComplete ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
          >
            <Icon icon={task.isComplete ? "mdi:check-circle" : "mdi:checkbox-blank-circle-outline"} width="24" />
          </button>
          <div>
            <h3 className={`text-lg font-semibold ${task.isComplete ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </h3>
            <p>
              {task.description && <p className="text-sm text-gray-500 ">{task.description}</p>}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditDialogOpen(true)}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <Icon icon="mdi:pencil-outline" width="24" />
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Icon icon="mdi:trash-can-outline" width="24" />
          </button>
        </div>
      </motion.div>

      {/* Edit Task Dialog */}
      <EditTaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        taskTitle={task.title}
        taskDescription={task.description || ""}
        onSave={(updatedTitle, updatedDescription) => {
          onUpdate(task.id, { title: updatedTitle, description: updatedDescription });
          setIsEditDialogOpen(false);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(task.id);
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
};

export default TaskCard;
