const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

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

//Jwt ROUTES
app.get("*", checkCart);
app.get("/jwtid", requireAuth, (req, res) => {
  return res.status(200).json(res.locals.admin.id);
});

//Routes
//Admins Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/categories", productRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/admin/options", optionRoutes);
app.use("/api/admin/orders", orderRoutes);

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
