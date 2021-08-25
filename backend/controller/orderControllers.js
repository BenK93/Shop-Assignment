const Orders = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    //  if User is not admin
    if (!req.user.isAdmin) {
      const orders = await Orders.find({ user_id: req.user.id });
      const response = appendTotalAndId(orders);
      return res.status(200).json({ orders: response });
    }
    const orders = await Orders.find({});
    let response = appendTotalAndId(orders);
    res.json({ orders: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// appending total & adding id
const appendTotalAndId = (orders) => {
  return orders
    .map((order) => ({ ...order._doc, id: order.id }))
    .map((order) => ({
      ...order,
      total: order.products.reduce((a, b) => a.price + b.price),
    }));
};

const createOrder = async (req, res) => {
  try {
    const date_of_order = new Date();
    const user_id = req.user.id;
    const status = "in_progress";
    const { products } = req.body;
    if (!products) {
      return res
        .status(400)
        .json({ error: "You can not make order with no products" });
    }
    const order = {
      date_of_order,
      user_id,
      status,
      products,
    };
    const response = await Orders.create(order);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const setStatus = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "only admins can change status" });
    }
    await Orders.updateOne(
      { _id: req.params.id },
      { $set: { status: req.query.status } }
    );
    res.json({ status: "Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getOrders,
  createOrder,
  setStatus,
};
