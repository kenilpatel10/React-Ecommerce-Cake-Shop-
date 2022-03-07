const mongoose = require("mongoose");

const productSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxlength: [7],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxlength: [4, "stock acnnot exceed more.."],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: {
    name: {
      type: String,
    //   required: true,
    },
    rating: {
      type: Number,
    //   required: true,
    },
    comments: {
      type: Number,
    //   required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
