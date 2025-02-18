const { getTasks, createTask, updateTask, deleteTask } = require("../services/taskService");

// ====================================== GET TASKS ==============================================>

exports.getTasks = async (req, res) => {
    try {
        const tasks = await getTasks(req.user.userId);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ====================================== CREATE TASKS ==============================================>

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await createTask(title, description, req.user.userId);
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ====================================== UPDATE TASKS ==============================================>

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        const task = await updateTask(id, title, description, isComplete, req.user.userId);
        if (!task) {
            return res.status(404).json({ error: "Task not found or you do not have permission to update it." });
        }
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ====================================== DELETE TASKS ==============================================>

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await deleteTask(id, req.user.userId);
        console.log("Delete function result:", success);

        if (!success) {
            return res.status(404).json({ error: "Task not found or you do not have permission to delete it." });
        }

        res.status(200).json({ message: "Task successfully deleted!" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

