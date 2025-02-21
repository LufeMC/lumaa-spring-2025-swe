import express, { Request, Response } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../services/task.service";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks((req as any).user.userId); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", auth, async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const task = await createTask((req as any).user.userId, title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.put("/:id", auth, async (req: Request, res: Response) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
