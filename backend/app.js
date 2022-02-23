const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
//route inmports
const product =require("./routes/productRoute")
const user =require("./routes/userRoute")
const order =require("./routes/orderRoute")
const errorMiddleware = require("../backend/middleware/error")


app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

// Middleware for Error

app.use(errorMiddleware)



module.exports = app;