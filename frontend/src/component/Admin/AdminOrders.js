import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AdminDrawer from "../Admin/AdminDrawer";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ViewIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import FormControl from "@mui/material/FormControl";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";
import { useAlert } from "react-alert";
import { adminOrders } from "../../redux/actions/orderAction";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { deleteOrder, clearErrors } from "../../redux/actions/orderAction";
import axios from "axios"
import Aos from "aos";

export default function AdminProducts() {
  const dispatch = useDispatch();

  const alert = useAlert();

const [Orders, setOrders] = useState()
  const { error, orders } = useSelector((state) => state.myOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const [toggle, setToggle] = React.useState(false);
  const [open, setOpen] = React.useState(false);


 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
   
      setOpen(false);
   
  };


  useEffect(() => {
    Aos.init({ duration: 1000 });
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Successfully Deleted");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    axios.get("/api/v1/admin/orders").then(res => 
    setOrders(res.data.orders))
    console.log("00000",Orders)
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteHandler = (id) => {
   if( window.confirm("are you sure")){
    dispatch(deleteOrder(id));

   }
  };
  const [Status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const onEdit =()=>{
    setToggle(true)
  }
  

 

  return (
    <Container>
      <AdminDrawer />
      <div data-aos="fade-up" style={{ padding: "80px" }}>
     
        {Orders &&( Orders.reverse()).map((x)=>{
          return(
<>
<Card 
  sx={{
    display: "flex",
    borderRadius: "10px",
    margin: "10px",
    padding:"5px",
    boxShadow:
      "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  }}
 >

        <CardContent sx={{ flex: "1 0 auto" }}>

    {
      toggle === false ? 
    <>
      <Typography
      variant="subtitle1"
      color="text.secondary"
      component="div"
    >
{x.orderStatus}
    </Typography> 
     <ViewIcon onClick={onEdit}/>
    </>
    :
  <FormControl sx={{ m: 1, minWidth: 120 }}>
  <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
  <Select
    native
    value={Status}
    onChange={handleChange}
    input={<OutlinedInput label="Age" id="demo-dialog-native" />}
  >
   
    <option value={10}>Proccessing</option>
    <option value={20}>Delivered</option>

  </Select>
</FormControl>
    }
   
  
    <Typography
      variant="subtitle1"
      color="text.secondary"
      component="div"
    >
 
    </Typography>
    <Button
component={Link}
to={`/admin/order/${x._id}`}
>
<ViewIcon />
</Button>
<Button
onClick={() => deleteHandler(x._id)}
>
<DeleteIcon />
</Button>
  </CardContent>
</Card>
</>
)





        })}
    
   
      </div>
    </Container>
  );
}
