const router = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const Order = require("../models/order");
const {authtoken}= require("./userauth");
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;  // Extract user ID from headers
      const { order } = req.body;  // Extract order from body
      
      for (const orderData of order) {
        const newOrder = new Order({ user: id, book: orderData._id });  // Create a new order
        const orderDataFromDb = await newOrder.save();  // Save the new order to the database
  
        // Save the order in the user's model
        await User.findByIdAndUpdate(id, {
          $push: { orders: orderDataFromDb._id },  // Push the new order ID into the user's orders
        });
  
        // Clear the cart by removing the ordered item from the user's cart
        await User.findByIdAndUpdate(id, {
          $pull: { cart: orderData._id },  // Pull the item ID from the user's cart
        });
      }
  
      return res.json({
        status: "Success",
        message: "Order Placed Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Error",
        message: "Something went wrong while placing the order",
      });
    }
  });
  
  router.get("/order-history", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;  // Extract user ID from headers
  
      // Find the user by ID and populate the 'orders' field to get all related order documents
      const user = await User.findById(id).populate('orders');
      
      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: "User not found",
        });
      }
  
      // Return the orders of the user
      return res.json({
        status: "Success",
        orders: user.orders,  // This will contain all the order details
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Error",
        message: "Something went wrong while fetching the order history",
      });
    }
  });

  

models.exports= router;


