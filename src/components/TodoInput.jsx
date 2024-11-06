import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function TodoInput({ onClose }) {
  const [text, setText] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [priority, setPriority] = useState('none');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim() && targetDate) {
      dispatch(addTodo({ text, targetDate, priority, category }));
      setText('');
      setTargetDate('');
      setPriority('none');
      setCategory('');
      if (onClose) onClose();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <TextField
        variant="outlined"
        label="New Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />
      <Box display="flex" justifyContent="space-between" width="100%" sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          label="Target Date"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: '48%' }}
        />
        <FormControl sx={{ width: '48%' }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <FormControl sx={{ width: '100%', mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="Appointments">Appointments</MenuItem>
          <MenuItem value="Groceries">Groceries</MenuItem>
          <MenuItem value="Starred">Starred</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <Button variant="text" color="secondary" onClick={onClose} sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
}

export default TodoInput;
