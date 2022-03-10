import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
} from "@mui/material";
import { getAdminProduct } from "../../redux/actions/productAction";
import AdminDrawer from "../Admin/AdminDrawer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CountUp from "react-countup";
import CakeIcon from "@mui/icons-material/CakeTwoTone";
import OrderIcon from "@mui/icons-material/PlaylistAddCheckCircleTwoTone";
import UsersIcon from "@mui/icons-material/PeopleAltTwoTone";
import { adminOrders } from "../../redux/actions/orderAction";
import Aos from "aos";
import AdminChart from "./AdminChart";
const DashBoard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1000 });

    dispatch(getAdminProduct());
    dispatch(adminOrders());
  }, [dispatch]);
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.myOrders);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminDrawer />
        <Grid
          data-aos="fade-up"
          className={classes.grid1}
          container
          spacing={{ xs: 2, md: 3, lg: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Card
              sx={{
                display: "flex",
                borderRadius: "30px",
                boxShadow:
                  "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
              className={classes.card}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "0 auto" }}>
                  <Typography component="div" variant="h5">
                    Users
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    {" "}
                    <Typography
                      variant="h2"
                      color="text.secondary"
                      component="div"
                    >
                      <CountUp
                        start={0}
                        end={user && user.length}
                        duration={2.0}
                      />
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <CardMedia />{" "}
              <UsersIcon
                color="info"
                style={{ fontSize: "150px", marginLeft: "40px" }}
              />
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Card
              sx={{
                display: "flex",
                borderRadius: "30px",
                boxShadow:
                  "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
              className={classes.card}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "0 auto" }}>
                  <Typography component="div" variant="h5">
                    Orders
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h2"
                      color="text.secondary"
                      component="div"
                    >
                      <CountUp
                        start={0}
                        end={orders && orders.length}
                        duration={2.0}
                      />
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <CardMedia />{" "}
              <OrderIcon
                color="info"
                style={{ fontSize: "150px", marginLeft: "40px" }}
              />
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Card
              sx={{
                display: "flex",
                borderRadius: "30px",
                boxShadow:
                  "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              }}
              className={classes.card}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography component="div" variant="h5">
                    Products
                  </Typography>
                  <Typography
                    variant="h2"
                    color="text.secondary"
                    component="div"
                    //  style={{margin:"20px", marginLeft:"-60px"}}
                  >
                    <CountUp
                      start={0}
                      end={products && products.length}
                      duration={2.0}
                    />
                  </Typography>
                </CardContent>
              </Box>

              <CardMedia />
              <CakeIcon color="info" style={{ fontSize: "150px" }} />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box data-aos="fade-up" className={classes.chart}>
        <AdminChart />
      </Box>
    </>
  );
};

export default DashBoard;

const useStyles = makeStyles((theme) => ({
  grid1: {
    margin: "100px 100px 10px 50px",
  },
  card: {
    margin: "10px",
    padding: "10px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
  chart: {
    marginLeft: "300px",
    marginTop: "30px",
    padding: "100px",
    width: "800px",
    backgroundColor: "white",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
}));
