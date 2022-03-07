  import React, { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { makeStyles } from "@material-ui/core/styles";
  import { useSelector } from "react-redux";
  import { getProduct } from "../../redux/actions/productAction";
  import Cards from "../layout/Cards";
  import { Container, Grid, MenuItem, MenuList, TextField } from "@mui/material";

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
      dispatch(getProduct(page, price,category,search));
    }, [dispatch, page, price,category,search]);

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
    let count = resultPerPage   / productCount;
const reload=()=>{

window.location.reload();
}
    const classes = useStyles();
    return (
    
      <div >
       
    
              {isAuthenticated && <Shortcut user={user}/>}  

              <Box sx={{ flexGrow: 1, marginBottom:"30px" }}>
        <Grid   data-aos="fade-up" container spacing={{ xs: 2, md: 2 ,lg: 2}}>
          
            <Grid item xs={2} sm={1} md={1}>
            <Button  component={Link}  to="/"><HomeIcon/></Button>
            </Grid>
            <Grid item xs={8} sm={6} md={10}>
            <TextField
            label="search"
            value={search}
            className={classes.search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
            </Grid>
            <Grid item xs={2} sm={1} md={1} >
            <Button className={classes.cartButton} component={Link} to="/cart">   <Badge anchorOrigin={{
      vertical: 'top',
      horizontal: 'left'}} badgeContent={cartItems.length}  color="primary">
        <CartIcon style={{ color: "black" }}/></Badge>
      </Button>
            </Grid>
        </Grid>
      </Box>
        <div >  
        </div>
        
    
      
            

      {loading ? (<Loader2/>):(
  < >
  <Container  className={classes.card}>
          <Grid     spacing={{ xs: 2, md: 2 , lg: 1}}  data-aos="fade-up" container>
          {/* <Button>
              <FilterProducts name={category}/>
              </Button> */}
          <Grid item xs={2} sm={4} md={3} lg={2} sx={{flexGrow:"1", display:{xs:"none", sm:"flex", md:"flex", lg:"flex"}}} >
              
          <Box className={classes.box} >
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
        <Typography>Categories</Typography>

                {categories.map((category) => (
                  <Button 
                  variant="contained"
               color="warning"
               className={classes.button}
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
                <Button onClick={reload} className={classes.button}>Show All</Button>
           
  
        </Box>
    </Grid>




    <Grid item xs={10} sm={8} md={7} lg={9} spacing={{ xs: 2, md: 2, lg:6 }} data-aos="fade-up" container>
    {products &&
              products
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
    </Grid>
          
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
  
    },button:{
      color:"white",
      backgroundColor:"#0336FF",
      width:"150px",
      borderRadius:"20px",
      margin:"2px"
    } ,  cartButton:{
    
    
      [theme.breakpoints.up('sm')]: {
        marginLeft:"180px",
      },
      [theme.breakpoints.up('md')]: {
        marginLeft:"30px",
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft:"30px",
      },
    },
      search:{
        
                
      
       [theme.breakpoints.up('xs')]: {
     width:"220px",
       },
             
       [theme.breakpoints.up('sm')]: {
        width:"520px",
          },
       [theme.breakpoints.up('md')]: {
         width:"780px",
       },
       [theme.breakpoints.up('lg')]: {
         width:"1080px",
       },
    },
    
    box: {
      height: "380px",
      textAlign:"center",
      position:"fixed",
      marginLeft:"-30px",
      width:"180px",
      borderRadius:"30px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      cursor: "pointer",
    transition: ".3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)",

      '&:hover': {
        transform: "scale(1.05)"
      }
  },
  }));


