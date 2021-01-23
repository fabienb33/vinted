const mongoose = require("mongoose");

const Offers = mongoose.model("Offers", {
  product_name: String,
  product_description: String,
  product_price: Number,
  product_details: Array,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = Offers;
