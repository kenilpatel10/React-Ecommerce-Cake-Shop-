import React from "react";
import { useState } from "react";
import CheckOutStepper from "../layout/CheckOutStepper";
import { Button, FormControl, Grid, Hidden } from "@mui/material";
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
import AdminDrawer from "../Admin/AdminDrawer"
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstatnts";
import { clearErrors, newProduct} from "../../redux/actions/productAction"
import Aos from "aos";
const Shipping = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

const [name, setName] = useState("");
const [price, setPrice] = useState(0);
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");

const [images, setImages] = useState([]);
const [imagesPreview, setImagesPreview] = useState([]);

const categories = [
    "Anniversary",
    "Birthday",
    "Kids", 
    "Wedding",
    "Victory",
    "Unique",
  ];
  useEffect(() => {
    Aos.init({duration:1000});
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);
  const handleCreateProduct = (e) => {
e.preventDefault();
      const myForm = new FormData();
      myForm.set("name", name)
      myForm.set("price", price)
      myForm.set("description", description)
      myForm.set("category", category)

      images.forEach((image)=>{
          myForm.append("images", image)
      });
      dispatch(newProduct(myForm))
      console.log(myForm)
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
     <AdminDrawer/>
      <div   data-aos="fade-up" className={classes.grid}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <div style={{ padding: "0px 40px 30px" }} >
            <Typography className={classes.typography}>
         Add Cakes
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
            style={{ borderRight: "2px solid gray", paddingRight:"20px" }}
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
        
               
           
          <FormControl  margin="normal" fullWidth>
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

  <div style={{border: "1px solid gray", height:"150px", borderRadius:"5px", overflow:"scroll" }}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={imageChange}
                multiple
              />
     

            
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} style={{height:"100px", width:"100px "}} alt="Product Preview" />
              ))}
            </div>

          </Grid>
        </Grid>
        <Button
          style={{ margin: "40px 220px" , width:"180px"}}
          onClick={handleCreateProduct}
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
