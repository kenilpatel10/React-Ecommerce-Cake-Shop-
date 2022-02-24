import React, { useEffect } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./layout/Header";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../component/img/back1.jpg";
import { Grid, Button, Input, Card } from "@mui/material";
import Shortcut from "./layout/Shortcut";
import Typography from "@mui/material/Typography";
import Loader from "./layout/Loader";
import { Link, useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
  const history = useNavigate();

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
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

            <div className={classes.grid}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6} style={{textAlign:"center", marginTop:"-20px" }} >
                  <div>
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
                <Grid item xs={6}>
                  <div>
                    {isAuthenticated && <Shortcut user={user} />}
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
                  </div>
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

  heroContent: {
    minHeight: "100vh",
    backgroundImage: `url(${Image})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
  },
  img: {
    marginLeft: "10px",
    borderRadius: "50%",
    height: "250px",
    width: "250px",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
  },

  heroButtons: {
    marginTop: theme.spacing(4),
  },
  typography: {
    fontFamily: '"Apple Color Emoji"',
    fontSize: "30px",
  },
  grid: {
    // textAlign: "center",
    padding: "50px",
    backgroundColor: "white",
    height: "450px",
    width: "800px",
    //  margin:"50px",
    marginLeft: "250px",
    marginTop: "100px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
  
  grid1: {
    backgroundColor: "white",
    height: "350px",
    width: "auto",
    margin: "100px",
    marginTop: "0px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },button:{
      color:"white",
      margin:"20px 0px",
      
  }
}));
