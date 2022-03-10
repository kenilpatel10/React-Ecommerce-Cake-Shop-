import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import InstaIcon from "@mui/icons-material/Instagram";
import FbIcon from "@mui/icons-material/FacebookTwoTone";
import MailIcon from "@mui/icons-material/EmailTwoTone";
import AddressIcon from "@mui/icons-material/AddLocationAltTwoTone";
import Logo1 from "../img/mainlogo.png";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "silver",
    padding: theme.spacing(6),
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <img
            style={{
              height: "300px",
              width: "auto",
              marginLeft: "280px",
              marginTop: "-100px",
              marginBottom: "-120px",
            }}
            src={Logo1}
            alt="."
          ></img>
          <Typography variant="h6" align="center" gutterBottom>
            copyright&copy;Cake Paradise
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Follow Us
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            <InstaIcon />
            <FbIcon />
            <MailIcon />
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            <AddressIcon />
          </Typography>
          <Typography variant="p" align="center" gutterBottom>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Town Hall,
            Paldi, ahemdabad - 380002 , Gujarat, India.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
