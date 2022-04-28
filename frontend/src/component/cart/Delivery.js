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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';



export default function FormDialog() {
  const history = useNavigate();

 

  const { error, isAuthenticated} = useSelector((state) => state.user);
  const alert = useAlert();

  const dispatch = useDispatch();
  
  const [dateTime, setDateTime] = useState("");


  const CheckOut = (e) => {
    e.preventDefault();
localStorage.setItem("date", value)
    console.log(localStorage.getItem("date"))
  history("/shipping")
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      // console.log("err",error)
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, isAuthenticated, history]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState();

  return (
    <div>
      <strong variant="outlined" color="info" onClick={handleClickOpen}>
   CheckOut
      </strong>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle color="text">
          
            <img
              style={{
                height: "200px",
                marginBottom: "-110px",
                marginLeft: "320px",
                marginTop: "-100px",
                width: "auto",
              }}
              src={Image}
              alt="."
            ></img>
          </DialogTitle>
         <h5> Select Date and Time For Delivery</h5>
          <DialogContentText>
             Make Sure You will get Your order after half an hour of ordered time
          </DialogContentText>
          <p></p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
       
        <MobileDateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Select date and time"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
            minDate={new Date()}
          minTime={new Date(0, 0, 0, 11)}
          maxTime={new Date(0, 0, 0, 23, 45)}
        
        />
      </Stack>
    </LocalizationProvider>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={CheckOut}>Continue</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
