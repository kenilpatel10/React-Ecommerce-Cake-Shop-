import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AboutIcon from "@mui/icons-material/InfoOutlined";
import ProductIcon from "@mui/icons-material/CakeOutlined";
import ContactIcon from "@mui/icons-material/PermContactCalendarOutlined";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge } from '@material-ui/core';
export default function HomeDrawer() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const {cartItems} = useSelector(state=> state.cart)
  const list = (anchor) => (
    <Box
      sx={{ width:'50px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     <List>
    <ListItem button >  
      <ListItemIcon >
          <Link style={{ color: "black" }}to="/"> <HomeIcon /></Link>
       
      </ListItemIcon>

    </ListItem>
</List> 
<List>
    <ListItem button >
      <ListItemIcon>

    <Link to="/cart"style={{ color: "black" }}><CartIcon  /></Link>
      



       
      </ListItemIcon>
    </ListItem>
</List>
<List>
    <ListItem button >
      <ListItemIcon>
          <Link style={{ color: "black" }}to="/products">  <ProductIcon/></Link>
      
      </ListItemIcon>

    </ListItem>
</List>
<List>
    <ListItem button >
      <ListItemIcon>
          <Link style={{ color: "black" }}to="/" > <ContactIcon /></Link>
       
      </ListItemIcon>
     
    </ListItem>
</List> 
<List>
    
    <ListItem button >
      <ListItemIcon>
      <Link to="/"style={{ color: "black" }} > <AboutIcon /></Link>
       
      </ListItemIcon>
  
    </ListItem>
</List>
       
    </Box>
  );


  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <MenuIcon  sx={{ flexGrow: 1, display: {xs: "flex" ,sm: "flex", md: "flex", lg:"none" } }}  style={{color:'black'}} onClick={toggleDrawer(anchor, true)} />
          <Drawer
          
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
