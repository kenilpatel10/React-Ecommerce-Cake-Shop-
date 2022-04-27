import React from "react";
import { useState } from "react";
import { Button, FormControl, Grid} from "@mui/material";
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
import { createCategory } from "../../redux/actions/categoryAction";
const AddCategory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();

  const { error, success } = useSelector((state) => state.newProduct);

const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    Aos.init({duration:1000});
    console.log(success)
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Category Created Successfully");
      history("/admin/dashboard");
    }
  }, [dispatch, alert, error, history, success]);
  const handleCreateCategory = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("name", categoryName)
      dispatch(createCategory(myForm))
      alert.success("Category Created Successfully");
      history("/admin/dashboard");
  };






  return (
    <div>
     <AdminDrawer/>
      <div   data-aos="fade-up" className={classes.grid}>
       
          <div style={{ padding: "0px 40px 30px" }} >
            <Typography className={classes.typography}>
         Add Category
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
            style={{paddingRight:"20px" }}
          >
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              label="Category Name "
              type="text"
              
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />

         
            
           


         
     
        </Grid>
        <Button
          style={{ margin: "40px 220px" , width:"180px"}}
          onClick={handleCreateCategory}
          variant="contained"
          color="warning"
        >
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default AddCategory;

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
    height: "350px",
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
