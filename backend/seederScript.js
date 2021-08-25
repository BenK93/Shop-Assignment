require("dotenv").config();

const productData = require("./data/products");
const orders = require("./data/orders");
const connectDB = require("./config/db");
const { Product } = require("./models/Product");
const Orders = require("./models/Order");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Orders.deleteMany({});

    await Product.insertMany(productData);
    await Orders.insertMany(orders);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
