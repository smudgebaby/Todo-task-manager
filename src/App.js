// App.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import TodoInput from './components/TodoInput';

function App() {
  const [section, setSection] = useState('Today');
  const [showTodoInput, setShowTodoInput] = useState(false); 

  const handleSectionChange = (newSection) => {
    setSection(newSection);
    setShowTodoInput(false); 
  };

  const handleAddTask = () => {
    setShowTodoInput(true); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar handleSectionChange={handleSectionChange} handleAddTask={handleAddTask} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {showTodoInput ? (
          <TodoInput onClose={() => setShowTodoInput(false)} />
        ) : (
          <MainContent section={section} />
        )}
      </Box>
    </Box>
  );
}

export default App;

