import React from 'react';
import { card_des, card_typo, cardS, deleteS, editS } from './Style';
import { Button, Card, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';

interface Task {
    id: number;
    title: string;
    description: string;
    is_complete: boolean;
}

interface TaskProp {
    id: number;
    title: string;
    description: string;
    is_complete: boolean;
    handleDeleteTask: (id: number) => void;
    handleToggleComplete: (id: number) => void;
    handleEditTask: (task: Task) => void;
    loading: boolean;
}

const TaskCard: React.FC<TaskProp> = ({
    id,
    title,
    description,
    is_complete,
    handleEditTask,
    handleDeleteTask,
    handleToggleComplete,
    loading,
}) => {
    return (
        <Card sx={cardS(is_complete)}>
            <CardContent>
                <Typography variant="h6" sx={card_typo(is_complete)}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={card_des(is_complete)}>
                    {description}
                </Typography>

                {/* Task Actions */}
                <div>
                    <Button
                        color="primary"
                        variant="outlined"
                        sx={editS(is_complete)}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EditIcon />}
                        onClick={() => handleEditTask({ id, title, description, is_complete })}
                        disabled={loading}
                    >
                        {loading ? 'Editing...' : 'Edit'}
                    </Button>

                    <Button
                        color="error"
                        variant="outlined"
                        sx={deleteS(is_complete)}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
                        onClick={() => handleDeleteTask(id)}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>

                    {/* Complete/Incomplete Toggle Button */}
                    <IconButton
                        color={is_complete ? 'secondary' : 'primary'}
                        onClick={() => handleToggleComplete(id)}
                        sx={{ ml: 1 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : is_complete ? <CancelIcon /> : <CheckCircleIcon />}
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
