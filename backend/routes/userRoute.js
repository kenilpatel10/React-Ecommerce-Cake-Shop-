
const express =require("express")
const router = express.Router();
const {registerUser,forgotPassword, resetPassword, loginUser, logout, getUserDetails, getAllUserDetails, updateRole, updateProfile, deleteUser, getOneUserDetails, updatePassword} = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
// router.route("/login/:id").put (isAuthenticatedUser, updateProfile);

router.route("/logout").get(logout);
router.route("/me").get (isAuthenticatedUser, getUserDetails);
router.route("/me/update").put (isAuthenticatedUser, updateProfile);
router.route("/password/update").put (isAuthenticatedUser, updatePassword);
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
//for admin
router.route("/admin/user/:id").get (isAuthenticatedUser,authorizeRoles("admin"), getOneUserDetails);
router.route("/admin/users").get (isAuthenticatedUser,authorizeRoles("admin"), getAllUserDetails);
router.route("/admin/user/:id").put(isAuthenticatedUser, updateRole);
router.route("/admin/user/:id").delete (isAuthenticatedUser, deleteUser);



module.exports =router;