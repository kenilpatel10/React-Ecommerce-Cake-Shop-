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
import { register } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormDialog() {
  const dispatch = useDispatch();
  const alert= useAlert();
  toast.configure();
  const [open, setOpen] = React.useState(false);
const {isAuthenticated} = useSelector(state => state.user)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {


    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  
  
    setOpen(false);
   
  };
  useEffect(() => {
    
  if(localStorage.getItem('token')){
    alert.success("Registerd Successfull")
  }  
  }, [])
  
  // <ToastContainer/>


  const imageChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <strong variant="outlined" color="info" onClick={handleClickOpen}>
        Register
      </strong>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle color="text">
            Register
            <img
              style={{
                height: "200px",
                marginBottom: "-110px",
                marginLeft: "228px",
                marginTop: "-100px",
                width: "auto",
              }}
              src={Image}
              alt="."
            ></img>
          </DialogTitle>

          <DialogContentText>
            If you are first time user of our website then please fill all
            details.
          </DialogContentText>
          <form encType="multipart/form-data" onSubmit={registerSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="UserName"
              value={user.name}
              type="text"
              fullWidth
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              value={user.email}
              fullWidth
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              variant="standard"
            />{" "}
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              value={user.password}
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              fullWidth
              variant="standard"
            />{" "}
            {/* <TextField
            autoFocus
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
          /> */}
            <div id="registerImage">
              <img
                src={avatarPreview}
                style={{ height: "100px", width: "auto" }}
                alt="Avatar Preview"
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={imageChange}
              />
            </div>
          </form>

          <DialogActions>
            <Button variant="success" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={registerSubmit}>Register</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
