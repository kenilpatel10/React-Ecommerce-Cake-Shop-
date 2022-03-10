import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Image from "../img/cake.jpg";
import Image1 from "../img/back1.jpg";
import Logo1 from "../img/mainlogo.png";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import Login from "../user/Login";
import Register from "../user/Register";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import ProductIcon from "@mui/icons-material/CakeOutlined";
import ContactIcon from "@mui/icons-material/PermContactCalendarOutlined";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchBar from "material-ui-search-bar";
import UserIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import HomeDrawer from "./HomeDrawer";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useAlert } from "react-alert";

export default function Header() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    alert.success("User Logged Out")
    handleClose();
  };
  const handleProfile = () => {
    history("/account");
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <HomeDrawer />
          <img className={classes.logo} src={Logo1} alt="."></img>

          <Box
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "none", md: "none", lg: "inline" },
            }}
          >
            <Button to="/" component={Link}>
              <HomeIcon style={{ color: "black" }} /> Home
            </Button>

            <Button component={Link} to="/products">
              <ProductIcon style={{ color: "black" }} />
              Products
            </Button>

            <Button to="/" component={Link}>
              <ContactIcon style={{ color: "black" }} /> Contact
            </Button>

            <Button to="/" component={Link}>
              <AboutIcon style={{ color: "black" }} /> About
            </Button>
            <Button
              component={Link}
              to="/products"
              style={{
                textDecoration: "none",
                marginRight: "30px",
                marginLeft: "28px",
              }}
            >
              <SearchBar
                style={{
                  margin: "0 auto",
                  maxWidth: 800,
                }}
              />
            </Button>
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              badgeContent={cartItems.length}
              color="primary"
            >
              <Link to="/cart" className={classes.link}>
                <CartIcon style={{ color: "black" }} />
              </Link>
            </Badge>
          </Box>

          <div className={classes.avatar}>
            <Stack direction="row" spacing={2} onClick={handleClick}>
              <Avatar>
                <UserIcon />
                {/* <img src={user.avatar.url}  style={{height:"56px", width:"56px",borderRadius: "50%"}} alt='profile'/> */}
              </Avatar>
            </Stack>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem onClick={handleProfile}>
                    <strong>Profile</strong>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <strong>Logout</strong>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem>
                    {" "}
                    <div>
                      <Login />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <Register />
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  avatar: {
    [theme.breakpoints.up("xs")]: {
      marginLeft: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "90px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "450px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "0px",
    },
  },
  heroContent: {
    minHeight: "100vh",
    backgroundImage: `url(${Image})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
    color: "white",
    clipPath: "circle(75.6% at 34% 0)",
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
    paddingTop: "56.25%",
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
    [theme.breakpoints.up("xs")]: {
      height: "200px",
      width: "auto",
      marginRight: "0px",
      marginTop: "-50px",
      marginBottom: "-90px",
      marginLeft: "50px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "200px",
      width: "auto",
      marginRight: "0px",
      marginTop: "-50px",
      marginBottom: "-90px",
      marginLeft: "200px",
    },
    [theme.breakpoints.up("md")]: {
      height: "200px",
      width: "auto",
      marginRight: "230px",
      marginTop: "-50px",
      marginBottom: "-90px",
      marginLeft: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "200px",
      width: "auto",
      marginRight: "230px",
      marginTop: "-50px",
      marginBottom: "-90px",
      marginLeft: "20px",
    },
  },
  appBar: {
    backgroundImage: `url(${Image1})`,
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
  },
  link: {
    margin: "px",
    textDecoration: "none",
  },
}));
