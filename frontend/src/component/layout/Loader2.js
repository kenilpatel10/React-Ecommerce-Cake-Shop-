import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import "../../../src/App.css";
import Logo from "../../../src/component/img/cake1.png";
import { Grid, makeStyles } from "@material-ui/core";

const Loader2 = ({ text }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });
  const classes = useStyles();

  useEffect(() => {
    const timeout = setInterval(() => {
      if (fadeProp.fade === "fade-in") {
        setFadeProp({
          fade: "fade-out",
        });
      } else {
        setFadeProp({
          fade: "fade-in",
        });
      }
    }, 500);

    return () => clearInterval(timeout);
  }, [fadeProp]);

  return (
    <Grid>
      <h1 className={fadeProp.fade}>
        <img className={classes.img} src={Logo} alt="."></img>{" "}
        <div className={classes.load}>
          <ReactLoading type="bubbles" color="#402901" />
        </div>{" "}
      </h1>
    </Grid>
  );
};

export default Loader2;

const useStyles = makeStyles((theme) => ({
  img: {
    [theme.breakpoints.up("xs")]: {
      height: "200px",
      width: "auto",
      marginLeft: "20%",
      marginTop: "50px",
      marginBottom: "-80px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "300px",
      width: "auto",
      marginLeft: "30%",
      marginTop: "0px",
      marginBottom: "-80px",
    },
    [theme.breakpoints.up("md")]: {
      height: "400px",
      width: "auto",
      marginLeft: "30%",
      marginTop: "0px",
      marginBottom: "-80px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "400px",
      width: "auto",
      marginLeft: "35%",
      marginTop: "0px",
      marginBottom: "-80px",
    },
  },
  load: {
    [theme.breakpoints.up("xs")]: {
      marginLeft: "130px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "340px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "440px",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));
