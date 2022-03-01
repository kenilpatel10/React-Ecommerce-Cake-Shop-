import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { makeStyles } from "@material-ui/core/styles";

import DashboardIcon from '@mui/icons-material/DashboardTwoTone';
import CakeIcon from '@mui/icons-material/CakeTwoTone';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '@mui/icons-material/AccountBoxTwoTone';
import LogoutIcon from '@mui/icons-material/LogoutTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import { Backdrop } from '@material-ui/core';
import CartIcon from '@mui/icons-material/ShoppingCart';

export default function Shortcut({user}) {
const history = useNavigate();
const dispatch= useDispatch();

const {cartItems} = useSelector((state)=> state.cart)
    const actions = [
        { icon: <ProfileIcon />, name: 'Profile' ,func: account },
        { icon: <CartIcon/>, name: `Cart(${cartItems.length})` ,func: cart },
        { icon: <CakeIcon />, name: 'Orders'  , func: orders},
        { icon: <LogoutIcon />, name: 'LogOut' , func: logOutUser},
        

      ];

if(user.role === "admin"){
    actions.unshift( { icon: <DashboardIcon />, name: 'Profile' ,func: dashboard })
 }




 function dashboard() {
     history("/dashboard")
 }
 function orders() { 
     history("/orders")
     
 }function account() { 
     history('/account');
     
 }function cart() { 
  history('/cart');
  
}function logOutUser() {
      dispatch(logout());
      alert.success("logout successfully")
     history('/');

     
 }
 const classes = useStyles();

 const [open, setOpen] = React.useState(false);

  return (
  
  
   
     <>
        <Backdrop open={open}  style={{ zIndex: "10" }}/>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16, top:80 }}
        icon={<img src={user.avatar.url}  style={{height:"56px", width:"56px",borderRadius: "50%"}} alt='profile'/>}   
        direction='down'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        // className={classes.speedDial}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
                onClick={action.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
      </>
  );
}


const useStyles = makeStyles((theme) => ({
    speedDial: {
      
     position:'fixed',
     top:"3vmax"
     
    },

  }));
  
  