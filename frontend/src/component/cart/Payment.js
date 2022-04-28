import React from "react";
import CheckOutStepper from "../layout/CheckOutStepper";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../img/mainlogo.png";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearErrors, createOrder } from "../../redux/actions/orderAction";
import { useAlert } from "react-alert";
import emailjs from "@emailjs/browser";
const Payment = () => {
  const OrderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(OrderInfo.totalPrice * 100),
  };
  var templateParams = {
    email: localStorage.getItem('email')
};
 

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: OrderInfo.subtotal,
    taxPrice: OrderInfo.tax,
    shippingPrice: OrderInfo.shippingCharges,
    totalPrice: OrderInfo.totalPrice,
    delivery: localStorage.getItem("date")
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

      
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
        emailjs.send('service_js0ropa', 'template_sb05419', templateParams)
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error("Error While Proccessing Payment");
    }
  };
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div>
      <CheckOutStepper activeStep={2} />
      <div data-aos="fade-up" className={classes.grid}>
        <Typography className={classes.typography}>
          Card Info
          <Typography
            sx={{
              flexGrow: "1",
              display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
            }}
          >
            {" "}
            <img className={classes.img} src={Image} alt="."></img>
          </Typography>
        </Typography>
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
          ref={payBtn}
          variant="contained"
          color="warning"
          onClick={submitHandler}>
          {`Pay - ₹${OrderInfo && OrderInfo.totalPrice}`}
        </Button>
      </div>
    </div>
  );
};
export default Payment;
const useStyles = makeStyles((theme) => ({
  img: {
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      padding: "10px",
      marginBottom: "-110px",
      marginLeft: "0px",
      marginTop: "-135px",
      width: "auto",
    },
      height: "200px",
      padding: "10px",
      marginBottom: "-80px",
      marginLeft: "50px",
      marginTop: "-130px",
      width: "auto",
  },
  typography: {
    margin: "10px",
  },

  grid: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      padding: "50px",
      backgroundColor: "white",
      height: "auto",
      width: "auto",
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: "50px",
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up("lg")]: {
      textAlign: "center",
      padding: "50px",
      backgroundColor: "white",
      height: "auto",
      width: "400px",
      marginLeft: "440px",
      marginTop: "50px",
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
  },

  paymentInput: {
    padding: "1vmax 4vmax",
    paddingRight: "1vmax",
    width: "100%",
    boxSizing: "borderBox",
    border: "1px solid rgba(0, 0, 0, 0.267)",
    borderRadius: "4px",
    outline: "none",
    margin: "5px",
  },
}));
