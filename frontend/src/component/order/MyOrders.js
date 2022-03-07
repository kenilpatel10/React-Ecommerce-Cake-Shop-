import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { clearErrors , myOrders} from '../../redux/actions/orderAction';

export default function MyOrders() {
 const dispatch = useDispatch();
 useEffect(() => {


  dispatch(myOrders());

}, [dispatch]);

const { orders } = useSelector((state) => state.myOrders);
  
    const columns = [
        { field: 'id', headerName: 'OrderId', width: 150 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'itemQty', headerName: 'ItemQuantity', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'action', headerName: 'Action', width: 130 },
      ];
      console.log("",orders)
      let rows = [];
      orders &&
      orders.forEach((item) => {
        rows.push({
          itemsQty: item.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });

      
  return (
      <Container> 
   
          <div style={{padding:"80px"}}>
        <DataGrid
        style={{   padding: "50px",
        backgroundColor: "white",
        height: "450px",
        width: "800px",
        marginLeft: "130px",
        borderRadius: "30px",
        boxShadow:
          "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",}}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
         
         
      </Container>
   
  );
}
