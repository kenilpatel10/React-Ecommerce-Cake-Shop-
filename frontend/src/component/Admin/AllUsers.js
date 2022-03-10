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
    const {users}= useSelector(state => state.allUsers)
const [Users, setUsers] = useState([])
    console.log(users)
    useEffect(() => {
      Aos.init({duration:1000});
      axios.get("/api/v1/admin/users").then(res => {
        setUsers(res.data.user) })
 
     }, [dispatch])
     const deleteHandler = (id) => {
      window.confirm("are you sure");
    axios.delete(`/api/v1/admin/user/${id}`)
    alert.success("User Deleted Successfully")
    setTimeout(() => {
      axios.get("/api/v1/admin/users").then(res => {
        setUsers(res.data.user) })
    }, 1000);
    };
    const columns = [
      { field: "id", headerName: "User ID", minWidth: 150, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email Address",
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
        renderCell: (params) => {
          return (
            <>
        
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
  
    Users &&
    Users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role
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