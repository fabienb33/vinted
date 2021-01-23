const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("../middleware/isAuthenticated");

const User = require("../models/User");
const Offer = require("../models/Offer");
const Offers = require("../models/Offers");

router.get("/offers", async (req, res) => {
  try {
    let filters = {};
    if (req.query.title) {
      filters.product_name = new RegExp(req.query.title, "i");
    }

    if (req.query.priceMin) {
      filters.product_price = { $gte: Number(req.query.priceMin) };
    }

    if (req.query.priceMax) {
      if (filters.product_price) {
        filters.product_price.$lte = Number(req.query.priceMax);
      } else {
        filters.product_price = {
          $lte: Number(req.query.priceMax),
        };
      }
    }

    let sort = {};

    if (req.query.sort === "price-desc") {
      sort.product_price = -1;
    }
    if (req.query.sort === "price-asc") {
      sort.product_price = 1;
    }

    let page;
    if (req.query.page < 1) {
      page = 1;
    } else {
      page = Number(req.query.page);
    }
    let limit = Number(req.query.limit);

    const count = await Offer.countDocuments(filters);

    const offers = await Offer.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("product_name product_price");

    res.status(200).json({ count: count, offers: offers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
