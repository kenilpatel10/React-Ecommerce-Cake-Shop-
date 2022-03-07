import React, { useEffect } from "react";

import Footer from "./component/layout/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Cards from "./component/layout/Cards";
import CategoryLibrary from "./component/layout/CategoryLibrary";
import Services from "./component/layout/Services";

import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "./redux/actions/productAction";

import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";

import Image1 from "../src/component/img/cake.jpg";

import Logo from "../src/component/img/cakelogo3.png";
import Aos from "aos"
import "aos/dist/aos.css"
import CommonHeader from "./component/layout/Header";
import Shortcut from "./component/layout/Shortcut";

const Home = () => {
  const dispatch = useDispatch();



  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  const {isAuthenticated, user} = useSelector(state=> state.user)

  useEffect(() => { 
    Aos.init({duration:1000});
   
      dispatch(getProduct())
   
    
  }, [dispatch]);
  const classes = useStyles();
  return (
    <>
      
    
        <main>
          <React.Fragment>
            <CssBaseline />

            <CommonHeader />
            <main className={classes.main}>
            {isAuthenticated && <Shortcut user={user}/>}  
          
              <div  className={classes.heroContent}>
              
                <Container  data-aos="fade-up" maxWidth="sm" className={classes.container}>
                  <img
                  className={classes.img}
                    src={Logo}
                    alt="."
                  ></img>

                  <Typography
                   className={classes.text}
                    align="center"
                    color="textSecondary"
                    paragraph
                  >
                    All types Of cakes .... We served you with the best quility
                    as well as best flavors that differs us from other cake
                    shops..
                  </Typography>

                  <div   data-aos="fade-up" className={classes.heroButtons}>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item>
                        <Button href="#scroll"  variant="contained" color="primary">
                          Explore More
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </div>
            </main>
          </React.Fragment>
          <div  data-aos="fade-up">
          <Services />
          </div>
          <div  data-aos="fade-up">
          <CategoryLibrary />
          </div>
         
          <>
            <Container  data-aos="fade-up" className={classes.cardGrid} maxWidth="md">
              <Grid  data-aos="fade-up" container spacing={4}>
                {products &&
                  products.map((product) => <Cards  data-aos="fade-up" product={product} />)}
              </Grid>
            </Container>
          </>
          {/* <Footer /> */}
        </main>

    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
  },

  heroContent: {
    minHeight: "100vh",
    backgroundImage: `url(${Image1})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
    color: "white",
    clipPath: "circle(75.6% at 34% 0)",
  },text:{

    [theme.breakpoints.up('xs')]: {
      fontSize:"12px",
      margin:"70px 0px 0px 50px"
    },
[theme.breakpoints.up('sm')]: {
  fontSize:"18px",
  marginTop:"10px",
  marginRight:"20px"
},
[theme.breakpoints.up('md')]: {
  fontSize:"18px"
},
[theme.breakpoints.up('lg')]: {
  fontSize:"20px",
  marginTop:"-30px"
},
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "100px",
    marginRight: "1000px",
  },
  typography: {
    fontFamily: '"Apple Color Emoji"',
  },
  img:{
    [theme.breakpoints.up('xs')]: {
      height: "250px",
      width: "auto",
      marginLeft: "60px",
      marginTop: "-100px",
      marginBottom: "-90px",
    }, [theme.breakpoints.up('sm')]: {
      height: "250px",
      width: "auto",
      marginLeft: "150px",
      marginTop: "-100px",
      marginBottom: "-80px",
    },
    [theme.breakpoints.up('md')]: {
      height: "400px",
    width: "auto",
    marginLeft: "100px",
    marginTop: "-100px",
    marginBottom: "-80px",
    },
    [theme.breakpoints.up('lg')]: {
      height: "400px",
    width: "auto",
    marginLeft: "100px",
    marginTop: "-80px",
    marginBottom: "-80px",
    },
  
  },
  appBar: {
    backgroundImage: `url(${Image1})`,
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
    opacity: "0.9",
  },
 

}));
