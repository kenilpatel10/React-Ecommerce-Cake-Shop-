import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { TextField } from "@material-ui/core";
import Header from "../layout/Header";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Input } from "@mui/material";
import Loader2 from "../layout/Loader2";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Image from "../img/mainlogo.png";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      Swal.fire(
        "Check Your Email",
        "Reset Password Link has sended to Your email please check..",
        "success"
      );
      history("/");
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      <div className={classes.heroContent}>
        <Header />
        <div style={{ padding: "40px" }}></div>
        <div className={classes.grid}>
          <Grid>
            <form onSubmit={forgotPasswordSubmit}>
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
              <h2
                style={{
                  margin: "10px",
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: "20px",
                }}
              >
                Forgot Password
              </h2>
              <div
                style={{
                  margin: "10px",
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  type="email"
                  placeholder="Email"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit" value="Send" variant="contained">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;

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
      height: "450px",
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
      height: "300px",
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
