import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import TodayIcon from '@mui/icons-material/Today';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const drawerWidth = 240;
const selectedColor = 'rgba(158, 86, 255, 0.1)';

function Sidebar({ handleSectionChange, handleAddTask }) {
  const [selectedSection, setSelectedSection] = useState('Today');

  const handleClick = (section) => {
    setSelectedSection(section);
    handleSectionChange(section);
  };
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

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
          <ListItem
            button
            onClick={handleAddTask}
            sx={{
              backgroundColor: selectedSection === 'Add task' ? selectedColor : 'transparent',
              '&:hover': {
                backgroundColor: selectedColor,
              },
            }}
          >
            <ListItemIcon>
              <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={<Typography style={{ color: '#9e56ff' }}>Add task</Typography>} />
          </ListItem>

          <ListItem
            button
            onClick={() => handleClick('Search')}
            sx={{
              backgroundColor: selectedSection === 'Search' ? selectedColor : 'transparent',
              '&:hover': {
                backgroundColor: selectedColor,
              },
            }}
          >
            {selectedSection === 'Search' ?
            <>
              <ListItemIcon>
                <SearchIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography sx={{color:"primary.main"}}>Search</Typography>} />
            </>
            :<>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </>
            }
          </ListItem>

          <ListItem
            button
            onClick={() => handleClick('Today')}
            sx={{
              backgroundColor: selectedSection === 'Today' ? selectedColor : 'transparent',
              '&:hover': {
                backgroundColor: selectedColor,
              },
            }}
          >
            {selectedSection === 'Today' ?
            <>
              <ListItemIcon>
                <TodayIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography sx={{color:"primary.main"}}>Today</Typography>} />
            </>
            :<>
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Today" />
            </>
            }
          </ListItem>

          <ListItem
            button
            onClick={() => handleClick('Completed')}
            sx={{
              backgroundColor: selectedSection === 'Completed' ? selectedColor : 'transparent',
              '&:hover': {
                backgroundColor: selectedColor,
              },
            }}
          >
            {selectedSection === 'Completed' ?
            <>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography sx={{color:"primary.main"}}>Completed</Typography>} />
            </>
            :<>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Completed" />
            </>
            }
          </ListItem>
        </List>
        <Divider />
        <Typography variant="subtitle1" sx={{ padding: 2 }}>
          My Projects
        </Typography>

        <List>
          <ListItem
            button
            onClick={() => handleClick('All Tasks')}
            sx={{
              backgroundColor: selectedSection === 'All Tasks' ? selectedColor : 'transparent',
              '&:hover': {
                backgroundColor: selectedColor,
              },
            }}
          >
            {selectedSection === 'All Tasks' ?
            <>
              <ListItemIcon>
                <AssignmentIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography sx={{color:"primary.main"}}>All Tasks</Typography>} />
              {open ? <ExpandLess onClick={handleOpen} color="primary" /> : 
              <ExpandMore onClick={handleOpen} color="primary" />}
            </>
            :<>
              <ListItemIcon>
                <AssignmentIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="All Tasks" />
              {open ? <ExpandLess onClick={handleOpen} /> : <ExpandMore onClick={handleOpen} />}
            </>
            }
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                onClick={() => handleClick('Starred')}
                sx={{ pl: 4,
                backgroundColor: selectedSection === 'Starred' ? selectedColor : 'transparent',
                '&:hover': {
                  backgroundColor: selectedColor,
                },
              }} 
              >
                {selectedSection === 'Starred' ?
                <>
                  <ListItemIcon>
                    <StarBorder color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography sx={{color:"primary.main"}}>Starred</Typography>} />
                </>
                :<>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </>
                }
              </ListItemButton>

              <ListItemButton 
                onClick={() => handleClick('Appointments')}
                sx={{ pl: 4,
                backgroundColor: selectedSection === 'Appointments' ? selectedColor : 'transparent',
                '&:hover': {
                  backgroundColor: selectedColor,
                },
              }} 
              >
                {selectedSection === 'Appointments' ?
                <>
                  <ListItemIcon>
                    <BookOnlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography sx={{color:"primary.main"}}>Appointments</Typography>} />
                </>
                :<>
                  <ListItemIcon>
                    <BookOnlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Appointments" />
                </>
                }
              </ListItemButton>

              <ListItemButton 
                onClick={() => handleClick('Groceries')}
                sx={{ pl: 4,
                backgroundColor: selectedSection === 'Groceries' ? selectedColor : 'transparent',
                '&:hover': {
                  backgroundColor: selectedColor,
                },
              }} 
              >
                {selectedSection === 'Groceries' ?
                <>
                  <ListItemIcon>
                    <LocalGroceryStoreIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography sx={{color:"primary.main"}}>Groceries</Typography>} />
                </>
                :<>
                  <ListItemIcon>
                    <LocalGroceryStoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Groceries" />
                </>
                }
              </ListItemButton>
            </List>
          </Collapse>
        </List>


        <Divider />
        <List>
          <ListItem
            button
            onClick={() => handleClick('Archived Tasks')}
            sx={{
              backgroundColor: selectedSection === 'Archived Tasks' ? selectedColor : 'transparent',
              '&:hover': {
                backgroundColor: selectedColor,
              },
            }}
          >
            {selectedSection === 'Archived Tasks' ?
            <>
              <ListItemIcon>
                <FolderIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={<Typography sx={{color:"primary.main"}}>Archived Tasks</Typography>} />
            </>
            :<>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Archived Tasks" />
            </>
            }
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
