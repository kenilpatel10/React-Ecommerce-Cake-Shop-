import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "../img/mainlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
export default function FormDialog() {
  const history = useNavigate();

  const { error, isAuthenticated} = useSelector((state) => state.user);
  const alert = useAlert();

  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  
  const [loginPassword, setLoginPassword] = useState("");
 const token = localStorage.getItem("authToken")
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    localStorage.setItem('email',loginEmail)
    console.log(localStorage.getItem("authToken"))
   if(token !== 'null'){
    alert.success("Successfully Logged In ");
    console.log("nam",localStorage.getItem("authToken"))
   }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      // console.log("err",error)
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("Successfully Logged In ");
      
      history("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, history]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <strong variant="outlined" color="info" onClick={handleClickOpen}>
        Log In
      </strong>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle color="text">
            Log In
            <img
              style={{
                height: "200px",
                marginBottom: "-110px",
                marginLeft: "120px",
                marginTop: "-100px",
                width: "auto",
              }}
              src={Image}
              alt="."
            ></img>
          </DialogTitle>
          <DialogContentText>
            Please enter your email address and password here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={loginEmail}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            error={error}
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={loginPassword}
            variant="standard"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          ></TextField>
          <Link to="/forgot">Forgot password??</Link>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={loginSubmit}>Log In</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
