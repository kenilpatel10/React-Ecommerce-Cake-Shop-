import React from "react";
import { useState } from "react";
import CheckOutStepper from "../layout/CheckOutStepper";
import { Button, FormControl, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@mui/material";
import Image from "../img/mainlogo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import { Country, State } from "country-state-city";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const handleShip = (e) => {
    e.preventDefault();
    if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      alert("Phone number should be 10 numbers");
    }else{
      dispatch(
        saveShippingInfo({ address, pinCode, country, city, state, phoneNumber })
      );
      history("/order/confirm");
    }
    
  };

  return (
    <div>
      <CheckOutStepper activeStep={0} />
      <div data-aos="fade-up" className={classes.grid}>
        <Grid
          container
          justifyContent="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <div style={{ padding: "0px 40px 0px" }}>
            <Typography className={classes.typography}>
              Shipping Info{" "}
              <Typography
                sx={{
                  flexGrow: "1",
                  display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                }}
              >
                <img className={classes.img} src={Image} alt="."></img>
              </Typography>
            </Typography>
          </div>
          <Grid xs={12} md={6} lg={6} className={classes.grid1}>
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              label="Address line "
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <TextField
              fullWidth
              autoFocus
              margin="normal"
              label="Phone Number"
              type="number "
              hintText="Hint Text (MultiLine)"
              inputProps={{
                maxLength: 10,
              }}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></TextField>

            <TextField
              autoFocus
              fullWidth
              margin="normal"
              label="City"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={0} md={6} lg={6} className={classes.grid1}>
            <TextField
              fullWidth
              margin="normal"
              label="Pin Code"
              type="number "
              inputProps={{
                maxLength: 6,
              }}
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value);
              }}
            ></TextField>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                fullWidth
                id="demo-simple-select-label"
                label="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {country && (
              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  fullWidth
                  id="demo-simple-select-label"
                  label="country"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleShip}
            variant="contained"
            color="warning"
          >
            Continue
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Shipping;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
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
      // textAlign: "center",
      padding: "50px",
      backgroundColor: "white",
      height: "680px",
      width: "auto",
      //  margin:"50px",
      marginLeft: "30px",
      marginRight: "30px",

      marginTop: "10px",
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up("lg")]: {
      // textAlign: "center",
      padding: "50px",
      backgroundColor: "white",
      height: "450px",
      width: "700px",
      //  margin:"50px",
      marginLeft: "260px",
      marginTop: "10px",
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
  },

  grid1: {
    [theme.breakpoints.up("lg")]: {
      padding: "10px",
    },
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    color: "white",
    margin: "0px 0px",
  },
}));
