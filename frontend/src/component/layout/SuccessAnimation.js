
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 48px;
  margin: 1.5rem 0 60px 0;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes ripple-out {
    20% {
      opacity: 0.5;
    }
    100% {
      top: -15px;
      right: -15px;
      bottom: -15px;
      left: -15px;
      opacity: 0;
    }
  }
  @keyframes pop {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .pop {
    opacity: 0;
    display: block;
    transform-origin: (50%, 50%);
    transform: scale(0) perspective(1px) translateZ(0);
    transition: opacity 200ms ease;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    animation-name: pop;
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.65, 0.05, 0.08, 0.99);
    animation-iteration-count: infinte;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }
`;

const Cicle = styled.div`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  border: 3px solid ${({color}) => color};
  border-radius: 50%;
  display: block;
  width: 60px;
  height: 60px;
  position: relative;
  opacity: 0;
  animation-name: appear;
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.08, 0.99);
  animation-iteration-count: infinte;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  transform: perspective(1px) translateZ(0);
  &:before {
    content: '';
    position: absolute;
    border: ${({color}) => color} solid 7px;
    border-radius: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    animation-duration: 1s;
    animation-name: ripple-out;
    animation-delay: 1.2s;
  }
`;

const Tick = styled.div`
  position: absolute;
  top: 18px;
  left: 16px;
`;

const Message = styled.div`
  color: ${({color}) => color};
  font-family: 'Rubik', Arial;
  font-size: 28px;
  bottom: 0;
  opacity: 0;
  position: absolute;
  animation-name: message-in;
  animation-duration: 1.4s;
  animation-timing-function: cubic-bezier(0, 0.7, 0.31, 1);
  animation-iteration-count: infinte;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  @keyframes message-in {
    0% {
      opacity: 0;
      transform: translate3d(0, 40%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const SuccessAnimation = ({ color = 'green', text = 'Payment Successfull', liveRegion = '' }) => {
  useLayoutEffect(function() {
    if (liveRegion) window.document.getElementById(liveRegion).innerHTML = text
  }, [])

  return (
    <><Container>
    <div  style={{marginTop:"200px",marginBottom:"80px"}}>
    <Cicle  className="ripple-out" color={color}>
      <Tick className="pop" color={color}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" color='green'>
          <path d="M11.637 20.286a2.41 2.41 0 0 1-3.411 0L2.11 14.17a2.42 2.42 0 0 1 0-3.413c.943-.94 2.47-.94 3.41 0l4.412 4.412L22.87 2.23a2.41 2.41 0 1 1 3.411 3.411L11.637 20.286z" fill={color} fillRule="evenodd"/>
        </svg>
      </Tick>
    </Cicle>
   
    </div>
    {
      text && <Message  className="message" color={color}>{text} <div>
      <Button variant="contained"  color="warning" style={{margin:"20px 50px"}}>View Your Orders</Button> </div></Message>
     
    }


  </Container>
 
</>
        
  );
}

SuccessAnimation.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  liveRegion: PropTypes.string
}

export default SuccessAnimation;
