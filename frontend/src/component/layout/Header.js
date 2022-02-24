import React from "react";
import AppBar from "@material-ui/core/AppBar";

import Box from "@material-ui/core/Box";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import {Link} from "react-router-dom";
import Image from "../img/cake.jpg";
import Image1 from "../img/back1.jpg";
import Logo1 from "../img/mainlogo.png";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import Logo from "../img/cakelogo3.png";
import Login from "../Login";
import Register from "../Register";
import AboutIcon from '@mui/icons-material/InfoOutlined';
import ProductIcon from '@mui/icons-material/CakeOutlined';
import ContactIcon from '@mui/icons-material/PermContactCalendarOutlined';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchBar from "material-ui-search-bar";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Search from "./Search";
import UserIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";
import Profile from "../Profile";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
      color:"black"
    },
  
    heroContent: {
      minHeight: "100vh",
      backgroundImage: `url(${Image})`,
      height: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "norepeat",
      backgroundSize: "cover",
      color:"white",
      clipPath: "circle(75.6% at 34% 0)",
    },
  
    heroButtons: {
      marginTop: theme.spacing(4),
      
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", 
    },
    cardContent: {
      flexGrow: 1,
    },
    container: {
      paddingTop: "100px",
      marginRight: "1000px",
    },
    typography: {
      fontFamily: '"Apple Color Emoji"',
    },
    logo: {
      marginLeft: "20px",
    },
    appBar:{
      backgroundImage: `url(${Image1})`,
      backgroundPosition: "center",
      backgroundRepeat: "norepeat",
      backgroundSize: "cover",
      opacity:"0.9"
    },link:{
    margin:"8px",
    textDecoration:"none",
    }
  }));
  


    export default function Header() {
const dispatch = useDispatch();
const history = useNavigate();
      const { user, loading, isAuthenticated } = useSelector((state) => state.user);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleLogout=()=>{
        dispatch(logout())
        handleClose();

      }
      const handleProfile=()=>{
        history('/account')
        handleClose();

      }
      const handleClose = () => {
        setAnchorEl(null);
      };
    
        const classes = useStyles();
          return (
 
     <React.Fragment>
     <CssBaseline />
     <AppBar className={classes.appBar} position="fixed">
       <Toolbar>
       <img
             style={{
              
               height: "200px",
               width: "auto",
               marginRight: "230px",
               marginTop: "-50px",
               marginBottom:"-90px",
               
             }}
             src={Logo1}
             alt="."
           ></img>


          <HomeIcon style={{ color: "black" }}/> <Link  to="/" className={classes.link}>Home</Link> 
          <ProductIcon style={{ color: "black" }}/><Link to="/products" className={classes.link}>Products</Link> 
          <ContactIcon style={{ color: "black" }}/><Link to="/" className={classes.link}>Contact Us</Link> 
          <AboutIcon style={{ color: "black" }}/><Link to="/" className={classes.link}>About Us</Link>
   


      <Link to="/products" style={{textDecoration:"none", marginRight:"80px",marginLeft:"28px"}}>    <Search/></Link>

        
         <Link to="/cart" className={classes.link}><CartIcon style={{ color: "black" }}/></Link>
     
   <div>
    <Stack direction="row" spacing={2}  onClick={handleClick}>
      <Avatar><UserIcon/></Avatar>
     
    </Stack>
   
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isAuthenticated ? (<div><MenuItem onClick={handleProfile}><strong>Profile</strong></MenuItem>
         <MenuItem onClick={handleLogout}><strong>Logout</strong></MenuItem></div>):(<div><MenuItem>  <div><Login /></div> 
           </MenuItem>
        <MenuItem ><Register /></MenuItem></div>)}
        
       
      </Menu>
    </div>  
       </Toolbar>
     </AppBar>

   
   </React.Fragment>
  );
}




