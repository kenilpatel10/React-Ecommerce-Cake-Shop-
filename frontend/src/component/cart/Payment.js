import React from 'react'
import CheckOutStepper from '../layout/CheckOutStepper'
import { useSelector, useDispatch } from 'react-redux'
import {CardNumberElement, CardCvcElement, CardExpiryElement,useStripe, useElements} from "@stripe/react-stripe-js"
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../img/mainlogo.png";
import { useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearErrors, createOrder } from '../../redux/actions/orderAction';



const Payment = () => {
    const OrderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
const history = useNavigate();
    const dispatch = useDispatch();
 
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);


  const paymentData = {
    amount: Math.round(OrderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: OrderInfo.subtotal,
    taxPrice: OrderInfo.tax,
    shippingPrice: OrderInfo.shippingCharges,
    totalPrice: OrderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert("false");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history("/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert("with error");
    }
  };
  const classes = useStyles();


  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div>
    <CheckOutStepper activeStep={2} />
    <div className={classes.grid}>
      <div style={{marginBottom:"30px"}}>
      <Typography className={classes.typography}>
              Card Info{" "}
              <img
                style={{
                  height: "200px",
                  marginBottom: "-110px",
                  marginLeft: "100px",
                  marginTop: "-110px",
                  width: "auto",
                }}
                src={Image}
                alt="."
              ></img>
            </Typography>

      </div>
   

          <form onSubmit={(e) => submitHandler(e)}>
        
          <div>
         
            <CardNumberElement className={classes.paymentInput} />
          </div>
          <div>
           
            <CardExpiryElement className={classes.paymentInput} />
          </div>
          <div>
           
            <CardCvcElement className={classes.paymentInput} />
          </div>

        
        </form>
      <Button
        style={{ margin: "40px 100px" ,width:"50%"}}

                ref={payBtn}
        variant="contained"
        color="warning"
        onClick={submitHandler}
      >
    {`Pay - ₹${OrderInfo && OrderInfo.totalPrice}`}  
      </Button>
              </div>
            </div>
);
};

export default Payment;

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
},

text: {
  marginBottom: " 10px",
},
typography: {
  fontFamily: '"Apple Color Emoji"',
  fontSize: "20px",
},
grid: {
  // textAlign: "center",
  padding: "50px",
  backgroundColor: "white",
  height: "280px",
  width: "400px",
  //  margin:"50px",
  marginLeft: "440px",
  marginTop: "50px",
  borderRadius: "30px",
  boxShadow:
    "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
},paymentInput: {
  padding: "1vmax 4vmax",
  paddingRight: "1vmax",
  width: "80%",
  boxSizing: "borderBox",
  border: "1px solid rgba(0, 0, 0, 0.267)",
  borderRadius: "4px",
  outline: "none",
  margin:"5px"
}



}));
