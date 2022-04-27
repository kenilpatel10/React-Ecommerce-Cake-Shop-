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
 const token = localStorage.getItem("authToken")
  const loginSubmit = (e) => {
    e.preventDefault();
    const fromErrors= validateForm()

    if(Object.keys(fromErrors).length > 0){
      setErrors(fromErrors)
      console.log(errors)
    }else{

    dispatch(login(form));
    localStorage.setItem('email',form.email)
    console.log(localStorage.getItem("authToken"))
   if(token !== 'null'){
    alert.success("Successfully Logged In ");
    console.log("nam",localStorage.getItem("authToken"))
   }
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
  
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={form.email} 
            onChange={e => setField ('email',e.target.value)}
             error={errors.email}
             helperText={errors.email}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
           variant="standard"
            value={form.password} 
            onChange={e => setField ('password',e.target.value)}
             error={errors.password}
             helperText={errors.pass}
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
