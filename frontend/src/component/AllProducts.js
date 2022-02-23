import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { getProduct } from "../actions/productAction";
import Cards from "./layout/Cards";
import { Container, Grid, TextField } from "@mui/material";
import Loader from "./layout/Loader";
import Image from "../component/img/back1.jpg";
import { Pagination } from "@mui/material";
import { Slider, Typography } from "@material-ui/core";
import { Box, typography } from "@mui/system";
import Shortcut from "./layout/Shortcut";
const categories = [
  "Anniversary",
  "Birthday",
  "Kids", 
  "Wedding",
  "Victory",
  "Unique",
];

const AllProducts = () => {


  const {isAuthenticated, user} = useSelector(state=> state.user)

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");

  useEffect(() => {
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

      <div >  
        
        <TextField
          label="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          style={{
            margin: "10px 150px 30px",
            width: "1000px",
          }}
        />
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
       


      {loading ? (
        <Loader />
      ) : (
        < >
     <Container className={classes.card} maxWidth="md">
            <Grid container spacing={4}>
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


