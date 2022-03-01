import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Button, Container, Input } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { addItemsToCart, removeItemsFromCart } from "../../redux/actions/cartAction";
import RemoveIcon from "@mui/icons-material/HighlightOff";
import NoCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import Shortcut from "../layout/Shortcut";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader2 from "../layout/Loader2";
import Aos from "aos"
import "aos/dist/aos.css"
import { useAlert } from "react-alert";

export default function Cart() {
  const { cartItems, loading } = useSelector((state) => state.cart);
const alert = useAlert();
useEffect(() => {
  
  Aos.init({duration:1000});



}, [])

const history = useNavigate();

  const classes = useStyles();
  const dispatch = useDispatch();
  const increaseQuantity = (id, quantity) => {
    const newQty = quantity + 1;
    if (quantity <= 5) {
      dispatch(addItemsToCart(id, newQty));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;

    dispatch(addItemsToCart(id, newQty));

  };

const checkOutCart=()=>{
 
    history("/shipping")

 
}

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("Item Removed From Cart")
  };
  const {isAuthenticated, user} = useSelector(state=> state.user)

  return (
    <>
  {loading ? (<Loader2/>):( <div className={classes.heroContent}>
    <Container>
          
      <h1 style={{ textAlign: "center" , padding:"10px"}}>Cart</h1>
      {isAuthenticated && <Shortcut user={user}/>}  
        {cartItems.length === 0 ? (
       
            <div  data-aos="fade-up" style={{ textAlign: "center" }}>
              <NoCartIcon
                style={{ opacity: "0.6", fontSize: "300px", margin: "10px" }}
              />
              <Typography style={{ margin: "10px" }}>
                No Items Available In Cart
              </Typography>
              <Button variant="contained">
                <Link
                  style={{
                    textDecoration: "none",
                    fontSize: "20px ",
                    padding: "5px",
                    color: "black",
                  }}
                  to="/products"
                >
                  View Cakes{" "}
                </Link>
              </Button>
            </div>
      
        ) : (
              <Grid  data-aos="fade-up" container spacing={2}>
             
                                                <Grid  data-aos="fade-up" item xs={8}>
                                                  {cartItems.map((cake) => {
                                                    return (
                                                      <Card className={classes.grid} sx={{ display: "flex" }}>
                                                        <CardMedia
                                                          component="img"
                                                          sx={{ width: 151, height: 151, margin: 2 }}
                                                          image={cake.image}
                                                          alt="Live from space album cover"
                                                        />
                                                        <Box
                                                          key={cake.name}
                                                          sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            marginLeft: "10px",
                                                          }}
                                                        >
                                                          <CardContent sx={{ flex: "1 0 auto" }}>
                                                            <Typography component="div" variant="h5">
                                                              {cake.name}
                                                            </Typography>
                                                            <Typography
                                                              variant="subtitle1"
                                                              color="text.secondary"
                                                              component="div"
                                                            >
                                                              {`₹${cake.price}`}
                                                            </Typography>
                                                            <Typography
                                                              variant="subtitle1"
                                                              color="text.secondary"
                                                              component="div"
                                                            >
                                                              {cake.quantity}
                                                            </Typography>
                                                          </CardContent>
                                                        </Box>
                                                        <Box
                                                          sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            pl: 1,
                                                            pb: 1,
                                                            marginLeft: "100px",
                                                          }}
                                                        >
                                                          <Button
                                                          style={{
                                                            margin:"10px",
                                                            borderRadius:"50%"
                                                          }}
                                                            onClick={() => {
                                                              decreaseQuantity(cake.product, cake.quantity);
                                                            }}
                                                            variant="contained"
                                                            color="warning"
                                                          >
                                                            - Kg
                                                          </Button>
                                                          <Input
                                                            style={{
                                                              width: "30px",
                                                              textAlign: "center",
                                                              border: "none",
                                                            }}
                                                            readOnly
                                                            value={cake.quantity}
                                                            type="number"
                                                          />
                                                          <Button style={{
                                                            margin:"10px",
                                                            borderRadius:"50%"
                                                            }}
                                                            onClick={() => {
                                                              increaseQuantity(cake.product, cake.quantity);
                                                            }}
                                                            variant="contained"
                                                            color="info"
                                                          >
                                                            + Kg
                                                          </Button>
                                                        </Box>
                                                        <Typography
                                                          variant="subtitle1"
                                                          sx={{ textAllign: "center", margin: "80px 30px 0px" }}
                                                          component="div"
                                                        >
                                                          {`₹${cake.price * cake.quantity}`}
                                                        </Typography>
                                                        <div style={{ marginTop: "80px" }}>
                                                          <span
                                                            style={{ color: "red" }}
                                                            onClick={() => {
                                                              deleteCartItems(cake.product);
                                                            }}
                                                          >
                                                            <RemoveIcon />
                                                          </span>
                                                        </div>
                                                      </Card>
                                                    );
                                                  })}
                                                </Grid>
                                <Grid   data-aos="fade-up"  item xs={4}>
                                  <Box className={classes.grid1}>
                                    <Typography className={classes.typography} variant="h5">
                                      Total Amount
                                    </Typography>
                                    <Typography className={classes.typography} variant="h5">
                                  {`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) }`}
                                    </Typography>
                                    <Button  onClick={checkOutCart} style={{margin:"20px", backgroundColor:"tomato", color:"white"}} variant="contained" color="info">
                                  
                                      Check Out
                                    </Button>
                                  </Box>
                                </Grid>
              </Grid>
            
 
        )}
        </Container>
      </div>)}
     
    </>
  );
}

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
    borderBottom: "1px solid gray",
    padding: "10px",
  },
  grid: {
    padding: "10px",
    margin: "40px",
    backgroundColor: "white",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
  grid1: {
    textAlign: "center",
    position: "fixed",
    backgroundColor: "white",
    height: "200px",
    width: "370px ",
    margin: "10px",
    padding: "20px",
    marginTop: "40px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
}));
