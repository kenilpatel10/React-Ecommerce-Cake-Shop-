import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { getProduct } from "../../redux/actions/productAction";
import Cards from "../layout/Cards";
import { Container, Grid, TextField } from "@mui/material";

import Image from "../../component/img/back1.jpg";
import { Pagination } from "@mui/material";
import { Button, Slider, Typography } from "@material-ui/core";
import { Box, typography } from "@mui/system";
import Shortcut from "../layout/Shortcut";
import { Link } from "react-router-dom";
import CartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { Badge } from "@mui/material";
import Aos from "aos"
import "aos/dist/aos.css"
import Loader2 from "../layout/Loader2";
const categories = [
  "Anniversary",
  "Birthday",
  "Kids", 
  "Wedding",
  "Victory",
  "Unique",
];

const AllProducts = () => {

const {cartItems} = useSelector(state=> state.cart)
  const {isAuthenticated, user} = useSelector(state=> state.user)

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    Aos.init({duration:1000});
    dispatch(getProduct(page, price));
  }, [dispatch, page, price]);

  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const priceHandler = (event, value) => {
    setPrice(value);
  };
  let count = productCount;

  const classes = useStyles();
  return (
  
    <div className={classes.heroContent}>
            {isAuthenticated && <Shortcut user={user}/>}  

            <Box sx={{ flexGrow: 1 }}>
      <Grid   data-aos="fade-up" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
          <Grid item xs={2} sm={4} md={4}>
          <Button style={{marginTop:"15px", borderRadius:"50%"}}><Link style={{textDecoration:"none", color:"black"}}to="/"><HomeIcon/></Link></Button>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          <TextField
          label="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          style={{
              margin: "10px -300px 30px",
              width: "1000px",
          }}
        />
           </Grid>
           <Grid item xs={2} sm={4} md={4}>
           <Button style={{marginLeft:"350px", marginTop:"15px", borderRadius:"50%"}}>      <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left'}} badgeContent={cartItems.length}  color="primary">
      <Link to="/cart" className={classes.link}><CartIcon style={{ color: "black" }}/></Link>
    </Badge>
     </Button>
           </Grid>
      </Grid>
    </Box>

      <div >  
        
       
        {/* <Button onClick={handleSearch}>Search</Button> */}
    
      </div>
      <Box className={classes.box}>
      <Typography>Price</Typography>
      <Slider
        className={classes.slider}
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={5000}
      />
        
      </Box>
   
    
         {/* <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
         */}
       


    {loading ? (<Loader2/>):(
 < >
 <Container  className={classes.card} maxWidth="md">
        <Grid    data-aos="fade-up" container spacing={4}>
          {products &&
            products
              .filter((e) => {
                if (search === "") {
                  return e;
                } else if (
                  e.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return e;
                }
              })
              .map((product) => {
                console.log(product);
                return <Cards product={product} />;
              })}
        </Grid>
        {resultPerPage < count ? (
          <Pagination
            className={classes.page}
            count={productCount}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            variant="outlined"
            color="primary"
          />
        ) : null}
      </Container>
    </>
    )}
       
    
    </div>
  );
};

export default AllProducts;

const useStyles = makeStyles((theme) => ({
  page: {
    padding: "20px",
    marginLeft: "225px",
  },
  slider: {
    width: "100px",
  },
  heroContent: {
    minHeight: "100vh",
    backgroundImage: `url(${Image})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "norepeat",
    backgroundSize: "cover",
 
  },   card:{
    // marginTop:"-300px",
    marginLeft:"100px"
  },
  
  box: {
    height: "300px",
    // display: "flex",
    textAlign:"center",
    position:"fixed",
    width:"150px",
    marginLeft:"20px",
    // marginRight:"200px",

    // flexDirection: "column",
    borderRadius:"30px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    cursor: "pointer",
  transition: ".3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)",

    '&:hover': {
      transform: "scale(1.05)"
    }
},
}));

