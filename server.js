/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//Routes dependences
const adminRoutes = require("./routes/admin.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const optionRoutes = require("./routes/option.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

require("dotenv").config("./.env");

//Dependencies server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

const { requireAuth, checkCart } = require("./middleware/auth.middleware");

//Get cart cookies
app.get("/cartId", checkCart, (req, res) => {
  return res.status(200).json(res.locals.cart.id);
});
//Jwt ROUTES
app.get("/jwtid", requireAuth, (req, res) => {
  return res.json(res.locals.admin.id);
});

//Routes
//Admins Routes
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static(path.join("uploads")));
//Global Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/categories", productRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart", orderRoutes);

//Strating Server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});
