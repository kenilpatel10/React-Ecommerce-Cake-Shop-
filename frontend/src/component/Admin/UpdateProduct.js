import React from "react";
import { useState } from "react";
import { Button, FormControl, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@mui/material";
import Image from "../img/mainlogo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminDrawer from "../Admin/AdminDrawer";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstatnts";
import { clearErrors, updateProduct } from "../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import Aos from "aos";
import axios from "axios";
const Shipping = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const alert = useAlert();
  const productId = useParams();

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );
  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const categories = [
    "Anniversary",
    "Birthday",
    "Kids",
    "Wedding",
    "Victory",
    "Unique",
  ];
  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios.get(`/api/v1/product/${productId.id}`).then(res=>{
     
        setName(res.data.product.name);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setCategory(res.data.product.category);
        setOldImages(res.data.product.images);
     
    })
   
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, updateError, history, isUpdated]);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId.id, myForm));
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <AdminDrawer />
      <div data-aos="fade-up" className={classes.grid}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <div style={{ padding: "0px 40px 30px" }}>
            <Typography className={classes.typography}>
              Update Cake
              <img
                style={{
                  height: "200px",
                  marginBottom: "-110px",
                  marginLeft: "320px",
                  marginTop: "-110px",
                  width: "auto",
                }}
                src={Image}
                alt="."
              ></img>
            </Typography>
          </div>
          <Grid
            item
            xs={6}
            className={classes.grid1}
            style={{ borderRight: "2px solid gray", paddingRight: "20px" }}
          >
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              label="Name "
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <TextField
              fullWidth
              autoFocus
              margin="normal"
              label="Price"
              type="number "
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></TextField>

            <TextField
              autoFocus
              fullWidth
              margin="normal"
              label="Description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.grid1}>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                fullWidth
                id="demo-simple-select-label"
                label="country"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories &&
                  categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <div>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={imageChange}
                multiple
              />
            </div>

            <div>
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  style={{ height: "100px", width: "100px " }}
                  alt="Product Preview"
                />
              ))}
            </div>
          </Grid>
        </Grid>
        <Button
          style={{ margin: "40px 290px" }}
          onClick={handleUpdateProduct}
          variant="contained"
          color="warning"
        >
          Add Product
        </Button>
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
    fontSize: "30px",
  },
  grid: {
    // textAlign: "center",
    padding: "30px",
    backgroundColor: "white",
    height: "450px",
    width: "700px",
    //  margin:"50px",
    marginLeft: "300px",
    marginTop: "110px",
    borderRadius: "30px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  },

  grid1: {
    textAlign: "center",
    marginTop: "60px",
  },
  button: {
    color: "white",
    margin: "20px 0px",
  },
}));
