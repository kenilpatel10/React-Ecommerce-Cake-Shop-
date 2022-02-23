// import * as React from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';

// export default function Loader() {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgress />
//     </Box>
//   );
// }
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Container, Grid } from '@mui/material';

export default function Variants() {
  return (
<Container style={{margin:" 180px   ", marginTop:"10px", marginRight:"150px"}}>  
  <Grid container >
  {Array.from(Array(6)).map((_, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
     <Stack spacing={2}>
     <Skeleton variant="rectangular" width={210} height={118} />
    <Skeleton variant="text" width={210} height={10}/>
    <Skeleton variant="text" width={210} height={10}/>
    <Skeleton variant="circular" width={40} height={40} />
   
  </Stack>
    </Grid>
  ))}
</Grid></Container>

  );
}