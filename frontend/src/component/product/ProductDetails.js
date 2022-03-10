import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Button, Input } from "@mui/material";

import { addItemsToCart } from "../../redux/actions/cartAction";
import Loader2 from "../layout/Loader2";
import Aos from "aos";
import "aos/dist/aos.css";
import { useAlert } from "react-alert";
const ProductDetails = () => {
  const alert = useAlert();
  const { product, loading } = useSelector((state) => state.productDetails);
  const product_Id = useParams();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity <= 5) {
      const qty = quantity + 1;
      setQuantity(qty);
    }
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(addItemsToCart(product_Id.id, quantity));
    alert.success("Added to cart");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({ duration: 1000 });
    dispatch(getProductDetails(product_Id.id));
  }, [dispatch, product_Id]);

  const classes = useStyles();
  return (
    <Fragment>
      {loading ? (
        <Loader2 />
      ) : (
        <div className={classes.heroContent}>
          <Header />
          <div style={{ padding: "40px" }}></div>
          <div data-aos="fade-up" className={classes.grid}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid data-aos="fade-up" item xs={6}>
                <div>
                  <Carousel className={classes.img1}>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className={classes.img}
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>
              </Grid>
              <Grid data-aos="fade-up" >
                <div>
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>

                  <div>
                    <h1>{`₹${product.price}`}</h1>
                    <div >
                      <div>
                        <Button
                          style={{
                            margin: "0px 10px 10px  0px ",
                            borderRadius: "50%",
                          }}
                          variant="contained"
                          onClick={decreaseQuantity}
                        >
                          - kg
                        </Button>
                        <Input
                          style={{ width: "30px", textAlign: "center" }}
                          readOnly
                          value={quantity}
                          type="number"
                        />
                        <Button
                          style={{
                            margin: "0px 0px 10px  10px ",
                            borderRadius: "50%",
                          }}
                          variant="contained"
                          onClick={increaseQuantity}
                        >
                          + kg
                        </Button>
                      </div>
                      <Button
                        style={{ margin: "0px 10px 10px  0px " }}
                        variant="contained"
                        color="warning"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                  </div>
                  <div />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: "black",
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
  },
  grid: {
    [theme.breakpoints.up("xs")]: {
      padding: "50px",
      backgroundColor: "white",
      height: "auto",
      width: "400px",
      margin: "50px",
      marginLeft: "20px",
      display:"flex",
  
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "50px",
      backgroundColor: "white",
      height: "450px",
      width: "900px",
      margin: "50px",
      marginLeft: "250px",
  
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "50px",
      backgroundColor: "white",
      height: "450px",
      width: "900px",
      margin: "50px",
      marginLeft: "250px",
  
      borderRadius: "30px",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
   
  },
  img1: {
    backgroundColor: "white",
    height: "350px",
    width: "300px",
    margin: "30px",
    marginTop: "0px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },
}));
