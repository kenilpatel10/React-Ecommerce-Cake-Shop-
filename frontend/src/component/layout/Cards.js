// import React from "react";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Image1 from "../img/back1.jpg";
import Logo1 from "../img/mainlogo.png";
import React,{useEffect} from "react";
import Carousel from "react-material-ui-carousel";
import Loader from "../layout/Loader";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductDetails
} from "../../actions/productAction";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Cards = ({ product }) => {
 
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      minHeight: "100vh",
      backgroundImage: `url(${Image})`,
      height: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "norepeat",
      backgroundSize: "cover",
    },

    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      margin:"  0px"
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius:"30px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      cursor: "pointer",
    transition: ".3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)",

      '&:hover': {
        transform: "scale(1.05)"
      }
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
    logo: {
      marginLeft: "270px",
    }, appBar:{
      backgroundImage: `url(${Image1})`,
      backgroundPosition: "center",
      backgroundRepeat: "norepeat",
      backgroundSize: "cover",
      opacity:"0.9"
    }
  }));

 
    


  const classes = useStyles();
  return (
    <Grid className={classes.cardGrid}item key={product._id} xs={12} sm={2} md={4}>
      <Card className={classes.card}>
       
          <CardMedia
            className={classes.cardMedia}
            image="https://unsplash.com/photos/ntfGWVbBiO0/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0OTI1Njkz&force=true"
            title="Image title"
          />
      
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography>{product.description}</Typography>
          <Typography>${product.price}</Typography>
        </CardContent>
        <CardActions>
        <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
          <Button size="small" color="primary" >
      Order Now
      </Button>
      </Link>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Cards;
