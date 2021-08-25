const mongoose = require("mongoose");
const { productSchema } = require("./Product");

const orderSchema = mongoose.Schema({
  date_of_order: {
    type: String,
    required: true,
  },
  user_id: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["received", "in_progress", "done"],
    default: "in_progress",
    required: true,
  },
  products: {
    type: [productSchema],
    required: true,
  },
});

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;
