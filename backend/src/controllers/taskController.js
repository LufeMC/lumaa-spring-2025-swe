import pool from '../db.js';

// ✅ GET /api/tasks - Fetch tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user?.userId; // Extract user ID from token
    console.log('🔍 Extracted userId:', userId);

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated.' });
    }

    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE userid = $1 ORDER BY created_at DESC',
      [userId]
    );

    if (rows.length === 0) {
      console.warn('⚠️ No tasks found for this user.');
    }

    console.log('✅ Fetched tasks:', rows);
    res.status(200).json(rows); // Send fetched tasks
  } catch (err) {
    console.error('❌ Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
};


// ✅ POST /api/tasks - Create a new task
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user?.userId; // Extracted from token (keep as is if token provides userId)

  console.log('📥 Request Body:', { title, description });
  console.log('🔍 Extracted userId:', userId);

  if (!userId) return res.status(400).json({ error: 'User not authenticated.' });
  if (!title || title.trim() === '') return res.status(400).json({ error: 'Title is required.' });

  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, "userid") VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );

    console.log('✅ Task created:', rows[0]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('❌ SQL Error:', err);
    res.status(500).json({ error: 'Failed to create task.' });
  }
};

// ✅ PUT /api/tasks/:id - Update an existing task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  const { userId } = req.user;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  try {
    const { rows } = await pool.query(
      `
      UPDATE tasks
      SET title = $1, description = $2, "iscomplete" = $3
      WHERE id = $4 AND "userid" = $5
      RETURNING *
      `,
      [title, description, isComplete, id, userId]
    );

    if (rows.length === 0) {
      console.warn(`⚠️ Task with ID ${id} not found or unauthorized.`);
      return res.status(404).json({ error: 'Task not found.' });
    }

    console.log('✅ Task updated:', rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task.' });
  }
};

// ✅ DELETE /api/tasks/:id - Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const { rowCount } = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND "userid" = $2',
      [id, userId]
    );

    if (rowCount === 0) {
      console.warn(`⚠️ Task with ID ${id} not found or unauthorized.`);
      return res.status(404).json({ error: 'Task not found.' });
    }

    console.log(`✅ Task with ID ${id} deleted successfully.`);
    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('❌ Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
};
