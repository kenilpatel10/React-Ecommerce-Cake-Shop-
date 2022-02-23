const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//create product---admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  
  const resultPerPage = 6
  const productCount = await Product.countDocuments();
  const apiFeature= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
  // let products = await apiFeature.query;

  // let filteredProductsCount = (products.length);

  // apiFeature.pagination(resultPerPage);

 const  products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,

  });
});


//get product details
exports.getProductDetail= catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
          return res.status(500).json({
            success: false,
            message: "product not found",
          });
        }
  res.status(200).json({
    success: true,
    product,
  });
});

//update product --admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {

    return next(new ErrorHandler("product not found", 404))
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product

exports.deleteProduct = catchAsyncError( async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

// product review (do it letter 3:48:39)

