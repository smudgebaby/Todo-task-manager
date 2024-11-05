import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../features/todoSlice';
import { ListItem, ListItemText, Checkbox, IconButton, TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editTargetDate, setEditTargetDate] = useState(todo.targetDate);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (editText.trim() === '') {
      setError('Todo cannot be empty');
      return;
    }
    dispatch(editTodo({ id: todo.id, newText: editText, newTargetDate: editTargetDate, newPriority: editPriority }));
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditTargetDate(todo.targetDate);
    setEditPriority(todo.priority);
    setIsEditing(false);
    setError('');
  };

  return (
    <ListItem
      secondaryAction={
        !isEditing && (
          <Box>
            <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTodo(todo.id))}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      }
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        color="primary"
      />
      {isEditing ? (
        <Box display="flex" flexDirection="column" width="100%">
          <TextField
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size="small"
            error={!!error}
            helperText={error}
            label="Edit Task"
            sx={{ mb: 1 }}
          />
          <Box display="flex" justifyContent="space-between" width="100%" gap={1}>
            <TextField
              variant="outlined"
              label="Edit Target Date"
              type="date"
              value={editTargetDate}
              onChange={(e) => setEditTargetDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
              sx={{ width: '48%' }}
            />
            <FormControl size="small" sx={{ width: '48%' }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <ListItemText
          primary={todo.text}
          secondary={
            <>
              <Typography variant="body2" color="textSecondary">
                Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(todo.createdDate))}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Target Date: {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date(todo.targetDate))}
              </Typography>
            </>
          }
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        />
      )}
    </ListItem>
  );
}

export default TodoItem;
