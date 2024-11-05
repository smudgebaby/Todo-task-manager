import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';

const drawerWidth = 240;

function Sidebar({ handleSectionChange, handleAddTask }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto', padding: 2 }}>
        <List>
          <ListItem button onClick={handleAddTask}>
            <ListItemIcon>
              <AddCircleOutlineIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Add task" />
          </ListItem>
          <ListItem button onClick={() => handleSectionChange('Search')}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button onClick={() => handleSectionChange('Today')}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Today" />
          </ListItem>
          <ListItem button onClick={() => handleSectionChange('Completed')}>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Completed" />
          </ListItem>
        </List>
        <Divider />
        <Typography variant="subtitle1" sx={{ padding: 2 }}>
          My Projects
        </Typography>
        <List>
          <ListItem button onClick={() => handleSectionChange('All Tasks')}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Tasks" />
          </ListItem>
          <ListItem button onClick={() => handleSectionChange('Appointments')}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
          <ListItem button onClick={() => handleSectionChange('Goals')}>
            <ListItemIcon>
              <AssignmentIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Goals" />
          </ListItem>
          <ListItem button onClick={() => handleSectionChange('Groceries')}>
            <ListItemIcon>
              <AssignmentIcon sx={{ color: 'green' }} />
            </ListItemIcon>
            <ListItemText primary="Groceries" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => alert('Active Listings clicked')}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Active Listings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
