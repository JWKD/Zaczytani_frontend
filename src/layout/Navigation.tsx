import { InboxOutlined, Person } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <List component="nav">
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <InboxOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton component={Link} to="/account">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Navigation;
