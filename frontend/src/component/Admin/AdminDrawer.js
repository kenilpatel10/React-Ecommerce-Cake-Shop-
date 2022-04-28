import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProductIcon from "@mui/icons-material/CakeOutlined";
import UserIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/AddBox';
import DashBoardIcon from '@mui/icons-material/Dashboard';
import OrderIcon from '@mui/icons-material/LocalMall';
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';  
import AllCatIcon from '@mui/icons-material/Ballot';
import { Tooltip } from "@mui/material";
const drawerWidth = 240; 


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DashBoard
          </Typography>
       
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          
            <ListItem button component={Link}  to="/admin/dashboard" >
              <ListItemIcon >
              <Tooltip title="Dashboard"  placement="right">
              <DashBoardIcon/>
</Tooltip>
            
              </ListItemIcon>
             
              <ListItemText primary="DashBoard" />
            </ListItem>
     
      
      
          
          <ListItem button   component={Link} to="/admin/orders">
            <ListItemIcon>
            <Tooltip title="All Orders"  placement="right">
            <OrderIcon/> 
</Tooltip>

            </ListItemIcon>
           
            <ListItemText primary="Orders" />
          </ListItem>
   
      
    
          
          <ListItem button component={Link} to="/admin/users" >
            <ListItemIcon>
            <Tooltip title="All Users"  placement="right">
             <UserIcon/>
             </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
   
    
    
          <ListItem button component={Link} to="/admin/categories" >
            <ListItemIcon>
            <Tooltip title="All Categories"  placement="right">
             <AllCatIcon/>
             </Tooltip>
            </ListItemIcon>
            <ListItemText primary="All Categories" />
          </ListItem>
          <ListItem button  component={Link} to="/admin/products" >
            <ListItemIcon>
            <Tooltip title="All Products"  placement="right">
            <ProductIcon/>
            </Tooltip>
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItem>
   
    
    
          
          <ListItem button    component={Link} to="/admin/product">
            <ListItemIcon>
            <Tooltip title="Add Product"  placement="right">
         <AddIcon/>
         </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
          <ListItem button    component={Link} to="/admin/category">
            <ListItemIcon>
            <Tooltip title="Add Category"  placement="right">
         <CategoryIcon/>
         </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItem>
 
   <Divider />
        
          
          <ListItem button    component={Link} to="/">
            <ListItemIcon>
            <Tooltip title="User Side"  placement="right">
         <HomeIcon/>
         </Tooltip>
            </ListItemIcon>
            <ListItemText primary="User Side" />
          </ListItem>
      </List>
      </Drawer>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  grid1: {
    margin: "8%",
  },
  
  card: {
    margin:"30px",
    padding: "20px",
    borderRadius:"30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
}));
