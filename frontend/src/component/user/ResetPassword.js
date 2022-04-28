






import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Header from "../layout/Header";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Input } from "@mui/material";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import Image from "../img/mainlogo.png";
import { clearErrors, resetPassword } from "../../redux/actions/userAction";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
const match = useParams();
const history = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const classes = useStyles();
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      Swal.fire(
        "Thank you",
        "Your Password is reset succesfully",
        "success"
      );

      history("/");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
      <div className={classes.heroContent}>
        <Header />
        <div style={{ padding: "40px" }}></div>
        <div className={classes.grid}>
          <Grid>
          <form
                onSubmit={resetPasswordSubmit}
                
              >
                <img
                style={{
                  height: "200px",
                  width: "auto",
                  margin: "-80px",
                  marginLeft: "40px",
                }}
                src={Image}
                alt=""
              />
                  <h2 style={{margin:"10px", justifyContent:"center", display:"flex"}}>Reset Password</h2>
                
                
                <div  style={{margin:"10px", justifyContent:"center", display:"flex"}}>
                
                  <TextField
                  style={{margin:"10px"}}
                    type="password"
                    placeholder="New Password"
                    label="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div  style={{margin:"10px", justifyContent:"center", display:"flex"}}>
                
                  <TextField
                  style={{margin:"10px"}}
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  value="Update"
                  variant="contained"
                  className="resetPasswordBtn"
                >Submit</Button>
                </div>
             
              </form>

           
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
  },

  img: {
    height: "350px",
    width: "auto",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
  },

  heroButtons: {
    marginTop: theme.spacing(4),
  },
  typography: {
    fontFamily: '"Apple Color Emoji"',
  },
  grid: {
    [theme.breakpoints.up("xs")]: {
      padding: "50px",
      backgroundColor: "white",
      height: "auto",
      width: "400px",
      margin: "50px",
      marginLeft: "20px",
      display: "flex",

      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "50px",
      backgroundColor: "white",
      height: "400px",
      width: "400px",
      margin: "50px",
      marginLeft: "250px",
      justifyContent: "center",
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "50px",
      justifyContent: "center",
      backgroundColor: "white",
      height: "400px",
      width: "400px",
      margin: "50px",
      marginLeft: "450px",

      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
  },
  img1: {
    backgroundColor: "white",
    height: "350px",
    width: "300px",
    margin: "30px",
    marginTop: "0px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
}));

// import React, { Fragment, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, resetPassword } from "../../redux/actions/userAction";
// import { useAlert } from "react-alert";
// import { Button, TextField } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// const ResetPassword = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();
// const match = useParams();
// const history = useNavigate();
//   const { error, success, loading } = useSelector(
//     (state) => state.forgotPassword
//   );

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const classes = useStyles();
//   const resetPasswordSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("password", password);
//     myForm.set("confirmPassword", confirmPassword);

//     dispatch(resetPassword(match.token, myForm));
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Password Updated Successfully");

//       history("/");
//     }
//   }, [dispatch, error, alert, history, success]);

//   return (
//     <Fragment>
    
//         <Fragment>
             
//         </Fragment>
      
//     </Fragment>
//   );
// };

// export default ResetPassword;

// const useStyles = makeStyles((theme) => ({
//   img: {
//     [theme.breakpoints.down("sm")]: {
//       height: "200px",
//       padding: "10px",
//       marginBottom: "-110px",
//       marginLeft: "0px",
//       marginTop: "-135px",
//       width: "auto",
//     },
//       height: "200px",
//       padding: "10px",
//       marginBottom: "-80px",
//       marginLeft: "50px",
//       marginTop: "-130px",
//       width: "auto",
//   },
//   typography: {
//     margin: "10px",
//   },

//   grid: {
//     [theme.breakpoints.down("sm")]: {
//       textAlign: "center",
//       padding: "50px",
//       backgroundColor: "white",
//       height: "auto",
//       width: "auto",
//       marginLeft: "20px",
//       marginRight: "20px",
//       marginTop: "50px",
//       borderRadius: "30px",
//       boxShadow:
//         "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
//     },
//     [theme.breakpoints.up("lg")]: {
//       textAlign: "center",
//       padding: "50px",
//       backgroundColor: "white",
//       height: "auto",
//       width: "400px",
//       marginLeft: "440px",
//       marginTop: "50px",
//       borderRadius: "30px",
//       boxShadow:
//         "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
//     },
//   },

//   // paymentInput: {
//   //   padding: "1vmax 4vmax",
//   //   paddingRight: "1vmax",
//   //   width: "100%",
//   //   boxSizing: "borderBox",
//   //   border: "1px solid rgba(0, 0, 0, 0.267)",
//   //   borderRadius: "4px",
//   //   outline: "none",
//   //   margin: "5px",
//   // },
// }));