const dotenv = require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const userComplaintsRoutes = require("./routes/userComplaintsRoutes");
const tripRoutes = require("./routes/tripRoutes");
const transportationRoutes = require("./routes/transportationRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const activitiesRoutes = require("./routes/activitiesRoutes");
const userReviewRoutes = require("./routes/userReviewsRoutes");
const userFavoritesRoute = require("./routes/userFavoritesRoutes");
const crypto = require("crypto");
const fs = require("fs");

const app = express();
// Middlewares

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Error Middleware
app.use(errorHandler);

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/favorites", userFavoritesRoute);
app.use("/api/complaint", userComplaintsRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/transportation", transportationRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/reviews", userReviewRoutes);

const PORT = process.env.PORT || 5000;


sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Connected Successfully");

    // Sync models (optional)
    return sequelize.sync(); // or { alter: true }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MySQL Connection Error:", err);
  });
