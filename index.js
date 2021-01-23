const express = require("express");
const formidable = require("express-formidable");
const formidableMiddleware = require("express-formidable");
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("./middleware/isAuthenticated");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(formidableMiddleware());
app.use(formidable());

///////////////////////////////MONGOOSE/////////////////////////////////

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
///////////////////////////////CLOUDINARY///////////////////////////////

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_PUBLIC_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

///////////////////////////////APPEL ROUTES/////////////////////////////

const userRoutes = require("./routes/user");
app.use(userRoutes);

const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

const offersRoutes = require("./routes/offers");
app.use(offersRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
