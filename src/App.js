import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import TodoInput from './components/TodoInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9e56ff',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;

