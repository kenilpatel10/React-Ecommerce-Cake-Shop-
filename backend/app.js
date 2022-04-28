const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv =require("dotenv")

const app = express();
app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser())
app.use(fileUpload())

// config 
dotenv.config({path: "backend/config/config.env"})



//route inmports
const product =require("./routes/productRoute")
const user =require("./routes/userRoute")
const order =require("./routes/orderRoute")
const errorMiddleware = require("./middleware/error")
const payment =require("./routes/paymentRoute")
const category = require("./routes/CategoryRoute");

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)
app.use("/api/v1", category)
// Middleware for Error

app.use(errorMiddleware)



module.exports = app;