import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userAction';
import AdminDrawer from "../Admin/AdminDrawer"
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Aos from 'aos';
const AllUsers = () => {
    const dispatch= useDispatch();
      const {user} = useSelector((state) => state.allUsers);
    useEffect(() => {
      Aos.init({duration:1000});
      dispatch(getAllUsers())
      console.log(user)
     
     }, [dispatch])

    const columns = [
      { field: "id", headerName: "User ID", minWidth: 150, flex: 0.5 },
  
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 1,
      },
    
  
      {
        field: "email",
        headerName: "Email Address",
        minWidth: 150,
        flex: 0.5,
      },

    ];
  
    const rows = [];
  
    user &&
      user.forEach((i) => {
        rows.push({
          id: i._id,
          email: i.email,
          name: i.name,
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