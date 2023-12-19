const {
  addOrder,
  getOrders,
  getSingleOrder,
  updateStatus,
  deleteOrder,
} = require("../controller/orders");
const route = require("express").Router();

route.post("/order", addOrder);
route.get("/get-orders", getOrders);
route.get("/get-single-order/:id", getSingleOrder);
route.put("/change-status/:id", updateStatus);
route.post("/delete-order/:id", deleteOrder);

module.exports = { route };
