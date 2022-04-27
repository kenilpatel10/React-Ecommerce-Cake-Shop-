import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userAction';
import AdminDrawer from "../Admin/AdminDrawer"
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { Button } from '@mui/material';
import Aos from 'aos';
import axios from 'axios';
import { useAlert } from 'react-alert';
const AllUsers = () => {
    const dispatch= useDispatch();
    const alert= useAlert();

const [categories, setCategories] = useState([])
 
    useEffect(() => {
      Aos.init({duration:1000});
      axios.get("/api/v1/categories").then(res => {
        setCategories(res.data.category) })
 
     }, [dispatch])
     const deleteHandler = (id) => {
      
      if(window.confirm("are you sure")){

        axios.delete(`/api/v1/category/${id}`)
        alert.success("category Deleted Successfully")
        setTimeout(() => {
          axios.get("/api/v1/categories").then(res => {
            setCategories(res.data.category) })
        }, 1000);
      }



      
  
    };
    const columns = [
      { field: "id", headerName: "User ID", minWidth: 150, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 100,
        flex: 1,
      },
   
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 60,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          console.log(params)
          return (
            <>
            {params.row.role === 'admin' ? null :   <Button
                  onClick={() => deleteHandler(params.getValue(params.id, "id"))}
              >
                <DeleteIcon />
              </Button>}
         
        
         
              
            </>
          );
        },
      },
    ];
  
    const rows = [];
  
    categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        
      });
    });
        

  return (
    <Container> 
    <AdminDrawer/>
           <div  data-aos="fade-up"  style={{padding:"80px"}}>
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
  )
}

export default AllUsers