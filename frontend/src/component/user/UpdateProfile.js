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
import { updateProfile } from "../../redux/actions/userAction";
import { loadUser, clearErrors } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import {UPDATE_RESET} from "../../redux/constants/userConstants"
import { Typography } from "@mui/material";
const useStyles = makeStyles((theme) => ({

    button: {
      backgroundColor: "white",
      color: "white"
    },
   
}));
export default function UpdateProfile() {

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const history= useNavigate();
  const dispatch= useDispatch();
  const [open, setOpen] = React.useState(false); 
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("");

  const UpdateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    console.log("data",myForm)
    dispatch(updateProfile(myForm));
   
  };  

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
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history("/account");

     dispatch({
       type: UPDATE_RESET 
     })
    }
  }, [dispatch, error,  history, user, isUpdated]);


  const classes = useStyles();
  return (
    <div>
        <strong variant="outlined" color="info" onClick={handleClickOpen}>
 Update Profile
      </strong>
       <Dialog open={open} onClose={handleClose}>
        
        <DialogContent>
        <DialogTitle color="text">Update<Typography  sx={{flexGrow:"1", display:{xs:"none", sm:"flex", md:"flex", lg:"flex"}}} ><img  style={{height:"200px",marginBottom:"-110px",marginLeft:"228px",marginTop:"-100px", width:"auto"}} src={Image} alt='.'/></Typography></DialogTitle>
         
          <DialogContentText >
            If you want to update your profile then please fill all
            details.
          </DialogContentText>
      
          <form encType="multipart/form-data"
                onSubmit={UpdateSubmit}>
             <TextField
            autoFocus
            margin="dense"
            label="UserName"
            value={name}
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            variant="standard"

          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />{" "}
         
          <div id="UpdateImage">
                  <img src={avatarPreview}  style={{height:"56px", width:"56px", borderRadius:"50%"}}alt="Avatar Preview" />
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
          <Button onClick={UpdateSubmit}>Update</Button>
        </DialogActions>
        </DialogContent>
      
      </Dialog>
    
    </div>
  );
}
