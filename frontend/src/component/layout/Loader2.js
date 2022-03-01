import React, { useState, useEffect } from 'react'
import ReactLoading from "react-loading"
import '../../../src/App.css'
import Logo from "../../../src/component/img/cake1.png";

const Loader2 = ({ text }) => {

    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in',
    });

    useEffect(() => {
        const timeout = setInterval(() => {
            if (fadeProp.fade === 'fade-in') {
                setFadeProp({
                    fade: 'fade-out'
                })
            } else {
                setFadeProp({
                    fade: 'fade-in'
                })
            }
        }, 500);

        return () => clearInterval(timeout)
    }, [fadeProp])

    return (
        <>
            <h1 className={fadeProp.fade}><img
                    style={{
                      height: "400px",
                      width: "auto",
                      marginLeft: "35%",
                      marginTop: "0px",
                      marginBottom: "-80px",
                    }}
                    src={Logo}
                    alt="."
                  >
                      </img>   <div style={{marginLeft:"630px"}}><ReactLoading  
                 
                 type="bubbles" color="#402901" /></div> </h1>
                   
        </>
    )
}




export default Loader2