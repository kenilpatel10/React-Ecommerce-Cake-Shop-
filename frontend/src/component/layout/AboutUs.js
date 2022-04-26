import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Grid } from '@material-ui/core';
import Header from '../layout/Header'
import LocationIcon from '@mui/icons-material/LocationCity';
import Logo from "../img/cake1.png";
    export default function AboutUs() {
      return (
        <React.Fragment>
          <CssBaseline />
          <Header/>
          <Container  style={{ backgroundColor: '#cfe8fc', minHeight: '50vh', marginTop:'100px' }}>
      <Grid container style={{justifyContent: 'center'}} spacing={3}>
        <Grid item xs={12} sm={6}>
        <img style={{width: '400px'}} src={Logo} alt="."></img>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{justifyContent: 'center', display: 'flex'}}> 
          <h1>About Us </h1>
        
     
          </div>
          <Box style={{padding:"20px"}}>
          <Typography>
          We are happily serving at multiple cities. All the cakes are made by natural colors that are delicious we have more that 1,00,000+ happy customers till date.
        </Typography>

          </Box>
          <Box style={{borderTop:"3px solid gray", display:"flex"}}>
            <div style={{padding:'10px', backgroundColor:"rgba(255, 255, 255, 0.5)", margin:"10px",display:"flex", borderRadius:"10px"}}>
          <p ><LocationIcon style={{fontSize:"100px"}}/></p>
            <hr/>
            <div style={{marginLeft:"15px"}}><h2>Ahemdabad</h2><p>
              Karma Complex, Paladi , Ahemdabad- 380006 </p> </div>
            
       
            </div>
            <div style={{padding:'10px', backgroundColor:"rgba(255, 255, 255, 0.5)", margin:"10px",display:"flex", borderRadius:"10px"}}>
            <p ><LocationIcon style={{fontSize:"100px"}}/></p>
            <hr/>
            <div style={{marginLeft:"15px"}}><h2>Vadodara</h2><p>
              Karma Complex, Paladi , Ahemdabad- 380006 </p> </div>
            </div>
         </Box>
        </Grid>
      </Grid>
    
              </Container>
        </React.Fragment>
      );
    }
    


