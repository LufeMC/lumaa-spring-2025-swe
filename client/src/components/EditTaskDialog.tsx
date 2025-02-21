import { useState } from "react";
import { Icon } from "@iconify/react";

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedDescription: string) => void;
  taskTitle: string;
  taskDescription: string;
}

const EditTaskDialog = ({ isOpen, onClose, onSave, taskTitle, taskDescription }: EditTaskDialogProps) => {
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Edit Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon icon="mdi:close" width="24" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-primary mb-3"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-primary h-24"
        />

        <div className="mt-4 flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => onSave(title, description)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskDialog;
