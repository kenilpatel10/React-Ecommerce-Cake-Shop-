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
import { updatePassword } from "../../redux/actions/userAction";
import { clearErrors } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstants";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
export default function UpdatePassword() {
  const { error1, isupdatedpassword } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const PasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({oldPassword,newPassword,confirmPassword}));
  };

  const [form, setForm] = useState({
    email:"",
    password:"",
  })
  const [errors, setErrors] = useState({})

  const setField =(field, value)=>{
    setForm({
      ...form,
      [field]: value
    })
    if(!!errors[field])
    setErrors({
      ...errors,
      [field]: null
    })
  }
  const validateForm=()=>{
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const{email, password}= form;
const newErrors={}

if(!email || email=== ''){
  newErrors.email = 'Please Enter Email Address'
}
if( email && regex.test(form.email) === false){
  newErrors.email ="Invalid Email Address"
}

if(!password || password === ''){
  newErrors.password = 'Please Enter Password'
}
return newErrors;
  }
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (error1) {
      alert.error(error1);
      dispatch(clearErrors());
    }

    if (isupdatedpassword) {
      alert.success("Password Updated Successfully");
      setOpen(false);
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      history("/account");

     
    }
  }, [dispatch, error1, history, isupdatedpassword]);

  return (
    <div>
      <strong variant="outlined" color="info" onClick={handleClickOpen}>
        Update Password
      </strong>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle color="text">
            Update Password
            <Typography
              sx={{
                flexGrow: "1",
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
              }}
            >
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
            </Typography>
          </DialogTitle>

          <DialogContentText>
            If you are first time user of our website then please fill all
            details.
          </DialogContentText>

          <form encType="multipart/form-data" onSubmit={PasswordSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Old Password"
              value={oldPassword}
              type="password"
              fullWidth
              // error
              // helperText="Old PassWord Not Valid"
              onChange={(e) => setOldPassword(e.target.value)}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              label="New Password"
              value={newPassword}
              type="password"
              fullWidth
              // error
              // helperText="Password didn't match"
              onChange={(e) => setNewPassword(e.target.value)}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Confirm Password"
              value={confirmPassword}
              type="password"
              fullWidth
              // error
              // helperText="Password didn't match"
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="standard"
            />
          </form>

          <DialogActions>
            <Button variant="success" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={PasswordSubmit}>Update</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
