import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

