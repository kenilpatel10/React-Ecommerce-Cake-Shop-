import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import DashboardIcon from "@mui/icons-material/DashboardTwoTone";
import CakeIcon from "@mui/icons-material/CakeTwoTone";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "@mui/icons-material/AccountBoxTwoTone";
import LogoutIcon from "@mui/icons-material/LogoutTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { Backdrop } from "@material-ui/core";
import CartIcon from "@mui/icons-material/ShoppingCart";
import {ToastContainer, toast } from "react-toastify"

export default function Shortcut({ user }) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const actions = [
    { icon: <ProfileIcon color="info" />, name: "Profile", func: account },
    {
      icon: <CartIcon color="info" />,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <CakeIcon color="info" />, name: "Orders", func: orders },
    { icon: <LogoutIcon color="info" />, name: "LogOut", func: logOutUser },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon color="info" />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history("/admin/dashboard");
  }
  function orders() {
    history("/orders");
  }
  function account() {
    history("/account");
  }
  function cart() {
    history("/cart");
  }
  function logOutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
    history("/");
  }
  <ToastContainer/>

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16, top: 80 }}
        icon={
          <img
            src={user.avatar.url}
            style={{ height: "56px", width: "56px", borderRadius: "50%" }}
            alt="profile"
          />
        }
        direction="down"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
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
