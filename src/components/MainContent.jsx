import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Divider, List, Button, Menu, MenuItem, TextField } from '@mui/material';
import TodoItem from './TodoItem';
import { sortTodos } from '../features/todoSlice';

function MainContent({ section }) {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0];
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = useSelector((state) => {
    if (section === 'Archived Tasks') {
      return state.todos.filter((todo) => todo.deleted);
    }
    switch (section) {
      case 'All Tasks':
        return state.todos.filter((todo) => !todo.deleted);
      case 'Today':
        return state.todos.filter((todo) => todo.targetDate === today && !todo.deleted);
      case 'Completed':
        return state.todos.filter((todo) => todo.completed && !todo.deleted);
      case 'Search':
        return state.todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()) && !todo.deleted);
      default:
        return state.todos.filter((todo) => todo.category === section && !todo.deleted);
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
            <TodoItem key={task.id} todo={task} isDeletedSection={section === 'Archived Tasks'} />
          ))}
        </List>
      }
      {section === 'Search' &&  searchQuery &&
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
