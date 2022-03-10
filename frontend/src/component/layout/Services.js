import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@material-ui/core";
import ShipIcon from "@mui/icons-material/LocalShippingTwoTone";
import PaymentIcon from "@mui/icons-material/MonetizationOnTwoTone";
import SafetyIcon from "@mui/icons-material/HealthAndSafetyTwoTone";
export default function MediaControlCard() {
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        style={{ marginLeft: "10px", marginTop: "0px" }}
      >
        <Grid item style={{ padding: "30px" }}>
          <Card
            sx={{ display: "flex" }}
            style={{
              padding: "20px",
              borderRadius: "30px",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Fastest Delivery
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  at your door step on time.
                </Typography>
              </CardContent>
            </Box>
            <ShipIcon style={{ height: "100px", width: "100px" }} />
          </Card>
        </Grid>
        <Grid item style={{ padding: "30px" }}>
          <Card
            sx={{ display: "flex" }}
            style={{
              padding: "20px",
              borderRadius: "30px",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "0 auto" }}>
                <Typography component="div" variant="h5">
                  Safe And Clean
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  100% Safe Packaging.
                </Typography>
              </CardContent>
            </Box>
            <SafetyIcon style={{ height: "100px", width: "100px" }} />
          </Card>
        </Grid>

        <Grid item style={{ padding: "30px" }}>
          <Card
            sx={{ display: "flex" }}
            style={{
              padding: "20px",
              borderRadius: "30px",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Secure Payment
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  COD Available
                </Typography>
              </CardContent>
            </Box>
            <PaymentIcon style={{ height: "100px", width: "100px" }} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
