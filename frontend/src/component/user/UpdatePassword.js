import * as React  from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../img/mainlogo.png"
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/actions/userAction";
import { loadUser, clearErrors } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import {UPDATE_PASSWORD_RESET} from "../../redux/constants/userConstants"
const useStyles = makeStyles((theme) => ({

    button: {
      backgroundColor: "white",
      color: "white"
    },
   
}));
export default function UpdatePassword() {

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

    const history= useNavigate();
  const dispatch= useDispatch();
  const [open, setOpen] = React.useState(false); 


  const PasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldpassword", oldPassword);
    myForm.set("newpassword", newPassword);
    myForm.set("confirmpassword", confirmPassword);
    console.log("data",myForm)
    dispatch(updatePassword(myForm));
   
  };  

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
   
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Password Updated Successfully");

      history("/account");

     dispatch({
       type: UPDATE_PASSWORD_RESET 
     })
    }
  }, [dispatch, error,  history,  isUpdated]);


  const classes = useStyles();
  return (
    <div>
        <strong variant="outlined" color="info" onClick={handleClickOpen}>
 Update Password
      </strong>
       <Dialog open={open} onClose={handleClose}>
        
        <DialogContent>
        <DialogTitle color="text">Update Password<img style={{height:"200px",marginBottom:"-110px",marginLeft:"228px",marginTop:"-100px", width:"auto"}} src={Image} alt='.'></img></DialogTitle>
         
          <DialogContentText >
            If you are first time user of our website then please fill all
            details.
          </DialogContentText>
      
          <form encType="multipart/form-data"
                onSubmit={PasswordSubmit}>
             <TextField
            autoFocus
            margin="dense"
            label="Old Password"
            value={oldPassword}
            type="password"
            fullWidth
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
