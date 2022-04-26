import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrderDetail } from "../../redux/actions/orderAction";
import { Button,Card, CardContent, CardMedia, Box } from "@mui/material";
import { useParams,Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
const OrderDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderDetail);
  const orderId = useParams();
  useEffect(() => {
    dispatch(getOrderDetail(orderId.id));
  }, [dispatch, orderId]);

  return (
    <div>
      <div className={classes.grid}>
      <Button
        style={{ marginTop: "-20px" }}
        component={Link}
        to="/"
        color="inherit"
      >
        <HomeIcon />
      </Button>
        <Grid
          container
          justifyContent="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={0} md={6} lg={8} className={classes.grid1}>
            <h1>Ordered Items</h1>
            {order.orderItems &&
              order.orderItems.map((cake) => {
                return (
                  <Card
                    sx={{
                      display: "flex",
                      borderRadius: "30px",
                      margin: "10px",
                      boxShadow:
                        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 101, height: 101, margin: 2 }}
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

                    <Typography
                      variant="subtitle1"
                      sx={{ textAllign: "center", margin: "80px 30px 0px" }}
                      component="div"
                    >
                      {`₹${cake.price * cake.quantity}`}
                    </Typography>
                  </Card>
                );
              })}
          </Grid>
          <Grid
            item
            xs={0}
            md={6}
            lg={4}
            style={{ marginTop: "60px" }}
            className={classes.grid2}
          >
            <h5>Order #{order && order._id}</h5>

            <Typography justifyContent="center">
              <strong>Shipping Info</strong>
            </Typography>
            <div className={classes.infoDiv}>
              <div>
                <b> Name:</b>
                {order.user && order.user.name}
              </div>
              <div>
                <b> Phone:</b>

                {order.shippingInfo && order.shippingInfo.phoneNo}
              </div>
              <div>
                <b> Address:</b>

                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </div>
            </div>
            <Typography justifyContent="center">
              <strong>Payment Info</strong>
            </Typography>
            <div className={classes.infoDiv}>
              <div>
                {order.paymentInfo &&
                order.paymentInfo.status === "succeeded" ? (
                  <b>PAID</b>
                ) : (
                  <b> NOT PAID</b>
                )}
              </div>

              <div>
                <b> Total Amount:</b>
                {order.totalPrice && order.totalPrice}
              </div>
            </div>

            <Typography justifyContent="center">
              <strong>Order Info</strong>
            </Typography>
            <div className={classes.infoDiv}>
              <div>
                <b> OrderStatus:</b>

                {order.orderStatus && order.orderStatus}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderDetails;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  items: {
    textAlign: "center",
    backgroundColor: "white",
    margin: "-10px 10px 10px 10px",
    padding: "15px",
    borderRadius: "30px",
  },
  infoDiv: {
    textAlign: "start",
    backgroundColor: "white",
    margin: "10px",
    padding: "15px",
    borderRadius: "30px",
    borderBottom: "2px solid gray",
  },

  img: {
    height: "200px",
    marginBottom: "-110px",
    marginLeft: "320px",
    marginTop: "-110px",
    width: "auto",
  },

  text: {
    marginBottom: " 10px",
  },
  typography: {
    fontFamily: '"Apple Color Emoji"',
    fontSize: "30px",
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      padding: "50px",
      height: "580px",
      width: "auto",
      marginLeft: "30px",
      marginRight: "30px",

      marginTop: "10px",
      borderRadius: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "50px",
      height: "auto",
      width: "auto",
      marginLeft: "0px",
      marginTop: "0px",
      borderRadius: "30px",
    },
  },

  grid1: {
    [theme.breakpoints.up("lg")]: {
      padding: "10px",
    },
    textAlign: "center",
    height: "450px",
    width: "auto",
    marginTop: "20px",
    overFlow: "auto",
  },
  grid2: {
    [theme.breakpoints.up("lg")]: {
      padding: "10px",
    },
    textAlign: "center",
    height: "450px",
    marginTop: "20px",
    backgroundColor: "white",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
  button: {
    color: "white",
    margin: "0px 0px",
  },
}));
