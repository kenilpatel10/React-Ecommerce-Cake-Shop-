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
import { Avatar } from '@mui/material';
import Swal from 'sweetalert2';
const AllUsers = () => {
    const dispatch= useDispatch();
    const alert= useAlert();
    const {users}= useSelector(state => state.allUsers)
const [Users, setUsers] = useState([])
 
    useEffect(() => {
      Aos.init({duration:1000});
      axios.get("/api/v1/admin/users").then(res => {
        setUsers(res.data.user) })
 
     }, [dispatch])
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
        axios.delete(`/api/v1/admin/user/${id}`)
        axios.get("/api/v1/admin/users").then(res => {
          setUsers(res.data.user) })
    })
       
     
       
   
    
  
    };
    const columns = [
      // { field: "id", headerName: "User ID", minWidth: 100, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 100,
        flex: 1,
        renderCell: (params) => {
          console.log(params);
          return (
            <>
              <Avatar src={params.value.avatar} />
              &nbsp;    &nbsp;    &nbsp;    &nbsp;
              {params.value.username}
            </>
          );
        }
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 100,
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
  
    Users &&
    Users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name:{
          username:item.name,
          avatar:item.avatar.url,
        },
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
         height: "500px",
         width: "1000px",
         marginLeft: "30px",
         borderRadius: "30px",
         boxShadow:
           "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",}}
           rows={rows}
           columns={columns}
           pageSize={7}
           rowsPerPageOptions={[5]}
         />
       </div>
          
          
       </Container>
  )
}

export default AllUsers