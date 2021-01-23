const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("../middleware/isAuthenticated");

const User = require("../models/User");
const Offer = require("../models/Offer");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    // console.log(req.files.product_image.path);
    const newOffer = new Offer({
      product_name: req.fields.product_name,
      product_description: req.fields.product_description,
      product_price: req.fields.product_price,
      product_details: [
        { marque: req.fields.marque },
        { taille: req.fields.taille },
        { etat: req.fields.etat },
        { couleur: req.fields.couleur },
        { emplacement: req.fields.emplacement },
      ],
      owner: req.user,
    });
    // console.log("toto");
    const result = await cloudinary.uploader.upload(
      req.files.product_image.path,
      {
        folder: `/vinted/offers/${newOffer._id}`, //créé un dossier offer dans cloudinary/vinted et sauvegarde l'image avec l'id du client
      }
    );
    console.log(result);
    newOffer.product_image = result;
    await newOffer.save();
    res.status(200).json(newOffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//////////////////////////////EXPORT////////////////////////////////
module.exports = router;
