import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/actions/productAction";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const categories = [
  "Anniversary",
  "Birthday",
  "Kids",
  "Wedding",
  "Victory",
  "Unique",
];
const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://unsplash.com/photos/kPxsqUGneXQ/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0ODQxMjI2&force=true",
    title: categories[0],
    width: "40%",
  },
  {
    url: "https://unsplash.com/photos/0uBlylsBuWk/download?force=true",
    title: categories[1],
    width: "20%",
  },
  {
    url: "https://unsplash.com/photos/IYExyJnvJHw/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0ODQxMzg2&force=true",
    title: categories[2],
    width: "40%",
  },

  {
    url: "https://unsplash.com/photos/j4n1YIK0e9k/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0ODQxNTEx&force=true",
    title: categories[3],
    width: "40%",
  },
  {
    url: "https://unsplash.com/photos/1vdmsiyX9W8/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0ODQxNDcy&force=true",
    title: categories[4],
    width: "20%",
  },
  {
    url: "https://unsplash.com/photos/qrDbj7OV2EU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTA4fHxjYWtlc3xlbnwwfHx8fDE2NDQ4NDE0MTU&force=true",
    title: categories[5],
    width: "40%",
  },
];

export default function CategoryLibrary() {
  const history = useNavigate();
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(category));
  }, [dispatch,category]);

  const categoryHandler = (name) => {
    setCategory(category);

    if (name === categories[0]) {
      history(`/products`, { state: name });
    } else if (name === categories[1]) {
      history(`/products`, { state: name });
    } else if (name === categories[2]) {
      history(`/products`, { state: name });
    } else if (name === categories[3]) {
      history(`/products`, { state: name });
    } else if (name === categories[4]) {
      history(`/products`, { state: name });
    } else if (name === categories[5]) {
      history(`/products`, { state: name });
    } else if (name === categories[6]) {
      history(`/products`, { state: name });
    }
  };
  return (
    <Container id="scroll" component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={() => categoryHandler(image.title)}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
