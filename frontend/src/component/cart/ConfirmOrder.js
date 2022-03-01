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
    import CheckOutStepper from "../layout/CheckOutStepper"

    const ConfirmOrder = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated, user } = useSelector((state) => state.user);


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;  
    const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        history("/process/payment");
      };


    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    return (
        <>
        <div className={classes.heroContent}>
        <CheckOutStepper activeStep={1} />
    

            <>
                <Container>
                {isAuthenticated && <Shortcut user={user}/>}  

                <Grid container spacing={2}>
                    
                
                    <Grid item xs={8}>
                    <div>
                        <Typography>Details of Shipping </Typography>
                        {/* <p> name:{user.name}</p> */}
                        <p> address:{address}</p>
                        <p>phone:{shippingInfo.phoneNumber}</p>
                    </div>
                    <hr/>
                    <div>  <Typography>Cart Details</Typography>
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
                            </Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ textAllign: "center", margin: "80px 50px 0px" }}
                                component="div"
                            >
                                {`₹${cake.price * cake.quantity}`}
                            </Typography>
                            <div style={{ marginTop: "80px" }}>
                            <span>
                        {cake.quantity} X ₹{cake.price} ={" "}
                        <b>₹{cake.price * cake.quantity}</b>
                        </span>
                            </div>
                            </Card>
                        
                        );
                    })}
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <Box className={classes.grid1}>
                        <Typography className={classes.typography} variant="h4">
                        Total Amount
                        </Typography>
                        
                        <div style={{textAlign:"left"}}>
                <div >
                    <p ><strong>Subtotal:</strong>  <span className={classes.span}>₹{subtotal}</span></p>
                
                </div>
                <div>
                    <p><strong>Shipping Charges:</strong>  <span className={classes.span}>₹{shippingCharges}</span></p>
                
                </div>
                <div>
                    <p><strong>GST:</strong> <span  className={classes.span}>₹{tax}</span></p>
                    
                </div>
                <div>
                <p>
                
                </p>
              
                <hr/>  <strong>Total:</strong> <span className={classes.span} >₹{totalPrice}</span>
                        
                </div>
                </div>

            
                    
                    
                        <Button  style={{margin:"20px", backgroundColor:"tomato", color:"white"}} variant="contained"  onClick={proceedToPayment} color="warning">
                        Payment
                        </Button>
                    </Box>
                    </Grid>
                </Grid>
                </Container>
            </>
        
        </div>
        </>
    );
    };

    export default ConfirmOrder;

    const useStyles = makeStyles((theme) => ({
        icon: {
        marginRight: theme.spacing(2),
        color: "black",
        },
    
    para:{
        fontSize:"15px",
        fontWeight:"bold"
    },
    span:{
        display:"flex",
        marginTop:"-20px",
        marginLeft:"310px",
        textAlign:"right"
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
        padding: "5px",
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
        height: "270px",
        width: "370px ",
        margin: "10px",
        padding: "20px",
        marginTop: "40px",
        borderRadius: "30px",
        boxShadow:
            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        },
    }));
    