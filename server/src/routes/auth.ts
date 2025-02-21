import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../services/user.service";
import bcrypt from "bcrypt";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    res.json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

router.get("/me", auth, async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await findUserByUsername((req as any).user?.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
});

export default router;
