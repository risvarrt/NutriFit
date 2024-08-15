// Created by Rhushabh Bontapalle
const Checkout = require('../models/CheckoutModel');

exports.handleCheckout = async (req, res) => {
  const userId = 'abc@gmail.com'; // For now, the user ID is constant
  const products = req.body.products; // Products from the request body

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ msg: 'Invalid products data' });
  }

  try {
    const newCheckout = new Checkout({
      userId,
      products,
    });

    const checkoutData = await newCheckout.save();

    res.json({ msg: 'Checkout successful', checkoutData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
