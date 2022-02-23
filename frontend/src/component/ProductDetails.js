import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../actions/productAction";
import { useParams } from "react-router-dom";
import Header from "./layout/Header";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../component/img/back1.jpg";
import { Grid ,Button, Input, Card} from "@mui/material";
import Shortcut from "./layout/Shortcut";
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { borderRadius } from "@mui/system";
import Loader from "./layout/Loader";

const ProductDetails = () => {
  const { product,loading } = useSelector((state) => state.productDetails);
  const product_Id = useParams();


  const {isAuthenticated, user} = useSelector(state=> state.user)

 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(product_Id.id));
  }, [dispatch]);

  const classes = useStyles();
  return (
    <Fragment >
      {loading ? (<Loader/> ):( <div className={classes.heroContent}>

      <Header />  
       
    

       <div className={classes.grid}>
      
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
  <Grid item xs={6} >
  <div >
          <Carousel className={classes.grid1}>
            
            {product.images &&
              product.images.map((item, i) => (
                <img
                className={classes.img}
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
  </Grid>
  <Grid item xs={6} >
  
          <div > 
          {isAuthenticated && <Shortcut user={user}/>}  
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
         
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <Button>-</Button>
                <Input  readOnly value="1" label="kg" type="number"/>
                <Button>+</Button>
              </div>
              <Button >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>
          <div/>
          </div>
  </Grid>
  
</Grid>
</div>
        </div>
      

      )}
     
     
    </Fragment>
  );
};

export default ProductDetails;




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
   
  height:"350px", width:"auto",
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
  grid:{
    padding:"50px",
     backgroundColor:"white",
     height:"450px",
      width:"auto",
     margin:"50px",
     marginTop:"100px",
     borderRadius:"30px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    grid1:{
      
       backgroundColor:"white",
       height:"350px",
        width:"auto",
       margin:"100px",
       marginTop:"0px",
       borderRadius:"30px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      }

}));
