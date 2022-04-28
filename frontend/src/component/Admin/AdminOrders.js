import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AdminDrawer from "../Admin/AdminDrawer";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditIcon from "@mui/icons-material/ModeEditTwoTone";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";
import { useAlert } from "react-alert";
import { adminOrders, updateOrder } from "../../redux/actions/orderAction";
import { deleteOrder, clearErrors } from "../../redux/actions/orderAction";
import Aos from "aos";
import Swal from "sweetalert2";
import ViewIcon from '@mui/icons-material/Visibility';
export default function AdminProducts() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.myOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
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
      
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(adminOrders());
    console.log(orders)
  }, [dispatch, error, deleteError, isDeleted]);

  const [Status, setStatus] = useState( {
    orderStatus:""
   });

  const onEdit =(id)=>{
    // setToggle(true)

      Swal.fire({
        title: 'Select Order Status',
  input: 'select',
  inputOptions: {
   Proccessing: 'Proccessing',
      Delivered: ' Delivered',
  },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update Status'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Updated!',
            ( ' Order status has been updated.'),
            'success'
          )
      
          console.log("rree",result.value)
          const  status1 =result.value
          setStatus({orderStatus:status1})
         
    
         
         console.log("daS",Status)
          const fd = new FormData;
          fd.append("orderStatus",Status.orderStatus)
          dispatch(updateOrder(id,fd))
          // console.log("daS",Status.Delivered)
          console.log(id)
        
        }
      })
  }

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your order has been deleted.',
          'success'
        )
      }
      dispatch(deleteOrder(id));  
    })
     


  };
  const columns = [
 
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.5 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Payment",
      minWidth: 100,
      flex: 1,
    },


    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              component={Link}
              to={`/admin/order/${params.getValue(params.id, "id")}`}
            >
              <ViewIcon />
            </Button>
            <Button onClick={()=> onEdit(params.id)}>
            <EditIcon />
            </Button>
            <Button
              onClick={() => deleteHandler(params.getValue(params.id, "id"))}
             >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((i) => {
      rows.push({
        id: i._id,
        status: i.orderStatus,
        total: i.totalPrice,
        payment:i.paymentInfo.status,
        name: i.user.name,  
      });
    });

  return (
    <Container>
      <AdminDrawer />
      <div data-aos="fade-up" style={{ padding: "80px" }}>
        <DataGrid
          style={{
            padding: "50px",
            backgroundColor: "white",
            height: "500px",
            width: "1000px",
            marginLeft: "30px",
            borderRadius: "30px",
            boxShadow:
              "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          }}
          rows={rows}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Container>
  );
}
