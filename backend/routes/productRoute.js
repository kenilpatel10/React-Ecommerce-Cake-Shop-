const express = require("express");
const { getAllProducts, updateProduct,createProduct, deleteProduct, getProductDetail } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("admin/product/new").post(isAuthenticatedUser,createProduct);
router.route("admin/product/:id").put(isAuthenticatedUser,updateProduct);
router.route("admin/product/:id").delete(isAuthenticatedUser,deleteProduct);
router.route("/product/:id").get(getProductDetail);


module.exports=router;