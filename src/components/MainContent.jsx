import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Divider, List, Button, Menu, MenuItem, TextField } from '@mui/material';
import TodoItem from './TodoItem';
import { sortTodos } from '../features/todoSlice';

function MainContent({ section }) {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = useSelector((state) => {
    if (section === 'All Tasks') {
      return state.todos;
    } else if (section === 'Today') {
      return state.todos.filter((todo) => todo.targetDate === today);
    } else if (section === 'Completed') {
      return state.todos.filter((todo) => todo.completed);
    } else if (section === 'Search') {
      return state.todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      return state.todos.filter((todo) => todo.section === section);
    }
  });

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = (criteria) => {
    setAnchorEl(null);
    if (criteria) {
      const newSortOrder = sortBy === criteria && sortOrder === 'ascending' ? 'descending' : 'ascending';
      setSortBy(criteria);
      setSortOrder(newSortOrder);

      dispatch(sortTodos({ sortBy: criteria, sortOrder: newSortOrder }));
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {section}
      </Typography>
      {section === 'Search' && (
        <TextField
          variant="outlined"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}
      {section === 'Search' ? searchQuery && 
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {tasks.length} tasks
      </Typography>:
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {tasks.length} tasks
      </Typography>}
      

      <Divider sx={{ my: 2 }} />
      {tasks.length!==0 && 
        <Box display="flex" justifyContent="flex-end" my={2}>
          <Button variant="outlined" onClick={handleSortClick}>
            Sort By {sortBy ? `${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} (${sortOrder})` : ''}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleSortClose(null)}
          >
            <MenuItem onClick={() => handleSortClose('date')}>Target Date</MenuItem>
            <MenuItem onClick={() => handleSortClose('priority')}>Priority</MenuItem>
          </Menu>
        </Box>
      }
      {section !== 'Search' && 
      <List>
        {tasks.map((task) => (
          <TodoItem key={task.id} todo={task} />
        ))}
      </List>
      }
      {section === 'Search' &&  searchQuery&&
      <List>
        {tasks.map((task) => (
          <TodoItem key={task.id} todo={task} />
        ))}
      </List>
      }
    </Box>
  );
}

export default MainContent;
