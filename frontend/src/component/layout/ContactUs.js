import React, { useRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import Header from "../layout/Header";
import { Box, Button, Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import Image1 from "../img/cake.jpg";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_daw254s",
        "template_5e9158s",
        form.current,
        "QqMZzqIo84ZMw9050"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire("Thank You !!", "thank you for your time", "success");
        },
        (error) => {
          console.log(error.text);
        }
      );
    form.current.reset();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container
        style={{
          backgroundColor: "#cfe8fc",
          height: "80vh",
          marginTop: "100px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              style={{
                border: "2px solid gray",
                padding: "30px",
                borderRadius: "10px",
                marginRight: "-40px",
              }}
            >
              <h1>Contact Us</h1>
              <form ref={form} onSubmit={sendEmail}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="email"
                 
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
               
                />
                <TextField
                  margin="dense"
                  label="Name"
                  name="name"
                  type="text"
                  fullWidth
                  
                  variant="standard"
             
                ></TextField>
                <TextField
                  margin="dense"
                  label="Subject"
                  type="text"
                  name="subject"
                  fullWidth
          
                  variant="standard"
    
                ></TextField>
                <TextField
                  margin="dense"
                  label="Message"
                  type="text"
                  name="message"
                  fullWidth
                  multiline
                  rows={2}
                  maxRows={4}
                  variant="standard"
                ></TextField>
                <Button
                  type="submit"
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              style={{
                height: "100%",
                width: "100%",
                marginBottom: "0px",
                borderRadius: "10px",
              }}
              src={Image1}
              alt="."
            ></img>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
