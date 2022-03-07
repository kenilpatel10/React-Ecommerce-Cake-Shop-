import React, { useEffect } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Input, Card, Container } from "@mui/material";
import Shortcut from "../layout/Shortcut";
import Typography from "@mui/material/Typography";
import Loader from "../layout/Loader";
import { Link, useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import Aos from "aos"
import "aos/dist/aos.css"
import { textAlign } from "@mui/system";
const Profile = () => {
  const history = useNavigate();

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    Aos.init({duration:1000});
    if (isAuthenticated === false) {
      history("/");
      alert("please login...");
    }
  }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.heroContent}>
        {loading ? (
          <Loader />
        ) : (
          <div>

            <Header />
          
<div style={{padding:"50px"}}> </div>
{isAuthenticated && <Shortcut user={user} />}
            <div  data-aos="fade-up" className={classes.grid}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid className={classes.grid2} justifyContent="center" >
                  <div  >
                    <Typography className={classes.typography}><h3>My Profile</h3></Typography>
                    <img
                      className={classes.img}
                      key={user.name}
                      src={user.avatar.url}
                      alt={`profile`}
                    />
                  </div>
                  <div>
                    {" "}
                  
                    <Button style={{color:"white" , margin:"10px"}} variant="contained" color="warning" ><UpdateProfile/></Button>
                  </div>
                </Grid>
                <Grid  className={classes.grid1}  xs={6}>
                  
                   
                    <Typography className={classes.typography}>
                      Full Name:
                    </Typography>
                    <h2>{user.name}</h2>

                    <div className="detailsBlock-3">
                      <Typography className={classes.typography}>
                        Email Address:{" "}
                      </Typography>
                      <h1>{user.email}</h1>
                      
                    </div>   <div className="detailsBlock-3">
                      {/* <Typography className={classes.typography}>
                        Joined At:
                      </Typography>
                      <p>{String(user.createdAt).substr(0,10)}</p> */}
                      
                    </div>
                    <div className={classes.button}>
<Button  variant="contained" color="info" ><Link style={{textDecoration:"none", color:"white"}} to="/orders">My Orders</Link></Button>
                          
</div>
                    <div  className={classes.button}>
                        <Button  variant="contained" color="warning">  <UpdatePassword/></Button>
                 
                    </div>
                    <div />
                
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Profile;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  img: {
    marginLeft: "10px",
    borderRadius: "50%",
    height: "250px",
    width: "250px",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",

    [theme.breakpoints.down('sm')]: {

    borderRadius: "50%",
    height: "150px",
    width: "150px",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
    },
  },

  heroButtons: {
    marginTop: theme.spacing(4),
  },
  typography: {
    fontFamily: '"Apple Color Emoji"',
    fontSize: "30px",
  },
  grid2:{
    [theme.breakpoints.down('sm')]: {
marginLeft:"60px"
      
    },
marginLeft:"40px",
textAlign:"center"
  },
  grid: {
    [theme.breakpoints.up('xs')]: {
      padding: "10px",
      textAlign:"center",
    backgroundColor: "white",
    height: "600px",
    width: "auto", 
    marginLeft: "30px",
    marginRight: "30px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up('sm')]: {
      padding: "50px",
    backgroundColor: "white",
    height: "450px",
    width: "800px", 
    marginLeft: "250px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up('md')]: {
      padding: "50px",
      backgroundColor: "white",
      height: "450px",
      width: "800px", 
      marginLeft: "250px",
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up('lg')]: {
      textAlign:"left",
      padding: "50px",
    backgroundColor: "white",
    height: "450px",
    width: "800px", 
    marginLeft: "250px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    // textAlign: "center",
   
  },  
  
  grid1: {
  
    [theme.breakpoints.down('sm')]: {
      marginTop: "30px",
      textAlign:"left",
      fontSize:"10px",
      marginLeft:"30px"
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "30px",
    },  [theme.breakpoints.up('md')]: {
      marginTop: "30px",
    },  [theme.breakpoints.up('lg')]: {
      marginTop: "50px",
      textAlign:"left",
      fontSize:"10px",
      marginLeft:"60px"
    },
   
   
  },button:{
 
      color:"black",
      margin:"20px 0px",
      
  }
}));
