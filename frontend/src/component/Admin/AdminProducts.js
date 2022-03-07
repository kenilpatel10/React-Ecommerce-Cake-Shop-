import * as React from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { clearErrors , getAdminProduct} from '../../redux/actions/productAction';
import AdminDrawer from "../Admin/AdminDrawer"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteProduct } from '../../redux/actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstatnts';
import { useAlert } from 'react-alert';
export default function AdminProducts() {
 const dispatch = useDispatch();
 const history = useNavigate();
 const alert = useAlert();
 const { loading, error, products } = useSelector((state) => state.products);
 const { error: deleteError, isDeleted } = useSelector((state) => state.product);
 useEffect(() => {
 if(error){

alert.error(error)
dispatch(clearErrors())
 }
 if(deleteError){

  alert.error(deleteError)
  dispatch(clearErrors())
   }
   
if(isDeleted){
  alert.success("Product Successfully Deleted")
  history("/admin/dashboard")
  dispatch({type : DELETE_PRODUCT_RESET})
}
  dispatch(getAdminProduct());

}, [dispatch, error, deleteError, isDeleted]);

    const deleteHandler =(id)=>{
      dispatch(deleteProduct(id))
    }
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
  

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params)=>{
        return(
          <>
          <Button component={Link} to ={`/admin/product/${params.getValue(params.id, "id")}`}><EditIcon/></Button>
<Button onClick={()=>deleteHandler(params.getValue(params.id, "id"))}><DeleteIcon/></Button>
          </>
        );
      }
     
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.price,
        name: item.name,
      });
    });

      
  return (
      <Container> 
   <AdminDrawer/>
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
