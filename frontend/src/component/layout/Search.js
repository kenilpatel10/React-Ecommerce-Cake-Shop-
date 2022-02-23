import React from 'react'
import SearchBar from 'material-ui-search-bar'
import { Button } from '@mui/material';




const Search = () => {


    const handleSearch=(e)=>{
        e.prevent.default();
        
    }


  return (
      <>   <SearchBar
      onChange={() => console.log('onChange')}
     
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />
    {/* <Button onClick={handleSearch}>Search</Button> */}
    </>
 
  )
}

export default Search;