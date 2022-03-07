import React, { Fragment } from 'react'
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Card, Box, Typography,Container, CardContent } from "@mui/material";
import { getAdminProduct } from '../../redux/actions/productAction';
import AdminDrawer from '../Admin/AdminDrawer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CountUp from 'react-countup';
import CakeIcon from '@mui/icons-material/CakeTwoTone';
import OrderIcon from '@mui/icons-material/PlaylistAddCheckCircleTwoTone';
import UsersIcon from '@mui/icons-material/PeopleAltTwoTone';
const DashBoard = () => {
  const dispatch= useDispatch();
    const classes = useStyles();
   
    useEffect(() => {
 

      dispatch(getAdminProduct());
    
    }, [dispatch]);
    const {products} = useSelector(state=> state.products)
    const {user} = useSelector(state=> state.user)
    console.log(products)
  return (
    <Box sx={{ display: "flex" }}>
        <AdminDrawer/>
       <Grid
      className={classes.grid1}
      container
      spacing={{ xs: 2, md: 3, lg: 5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={2} sm={4} md={4}>
  
          <Box className={classes.card} sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "0 auto" }}>
              <Typography component="div" variant="h5">
                Users
              </Typography>
              <Box sx={{display:"flex"}}>  <Typography
                variant="h1"
                color="text.secondary"
                component="div"
              >
                 <CountUp
                 start={0}
                 end=   {user && user.length}
                 duration={2.00}
                />

              </Typography>
              
            
              <UsersIcon color="info" style={{fontSize:"150px",marginLeft:"40px"}}/></Box>
            </CardContent>
          </Box>
      
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
     
          <Box  className={classes.card}sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "0 auto" }}>
              <Typography component="div" variant="h5">
                Orders
              </Typography>
              <Box sx={{display:"flex"}}>  <Typography
                variant="h1"
                color="text.secondary"
                component="div"
              >
                 <CountUp
                 start={0}
                 end=   {products && products.length}
                 duration={2.00}
                />

              </Typography>
              
            
              <OrderIcon color="info" style={{fontSize:"150px",marginLeft:"40px"}}/></Box>
            

            </CardContent>
          </Box>
     
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
     
          <Box className={classes.card}sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent >
              <Typography component="div" variant="h5">
             Products
              </Typography>
              <Box sx={{display:"flex"}}><Typography
                variant="h1"
                color="text.secondary"
                component="div"
              //  style={{margin:"20px", marginLeft:"-60px"}}
              >
                <CountUp
                 start={0}
                 end=   {products && products.length}
                 duration={2.00}
                />
              </Typography>
              <CakeIcon color="info" style={{fontSize:"150px",marginLeft:"40px"}}/></Box>
            </CardContent>
          </Box>
       
      </Grid>
    </Grid>
</Box>
  )
}

export default DashBoard



const useStyles = makeStyles((theme) => ({
    grid1: {
      margin: "8%",
    },
    card: {
    margin:"30px",
      padding: "20px",
      borderRadius:"30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
  }));