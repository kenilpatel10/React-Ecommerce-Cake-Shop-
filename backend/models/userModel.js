const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxlength: [30, "name cannot exceed more"],
    minlength: [4, "name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email.."],
  },
  password: {
    type: String,
    required: [true, "please enter your name"],
    minlength: [8, "Password should have more than 8 characters"],
    select:false,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,   
    },
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },


  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token
userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)

}

//Genrating Password reset token

// userSchema.methods.getResetPasswordToken = function(){
//   //genrating token 
//   const resettoken = crypto.randomBytes(20).toString("hex")

//   //hasing reser password
//   this.resetPasswordToken = crypto.createHash("sha256")
//   .update(resetToken)
//   .digest("hex")
// }

module.exports = mongoose.model("User", userSchema);
