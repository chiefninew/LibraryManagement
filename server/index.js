// server.js

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routers
const authRouter = require("./routes/authRouter");
const bookRouter = require("./routes/bookRouter");
const authorRouter = require("./routes/authorRouter");
const borrowalRouter = require("./routes/borrowalRouter");
const genreRouter = require("./routes/genreRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- CORS setup ---
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // allow cookies/sessions
  })
);

// --- Session setup ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// --- Passport setup ---
app.use(passport.initialize());
app.use(passport.session());
const initializePassport = require("./passport-config");
initializePassport(passport);

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("DB connection error", err));

// --- Routes ---
app.use("/auth", authRouter);
app.use("/book", bookRouter);
app.use("/author", authorRouter);
app.use("/borrowal", borrowalRouter);
app.use("/genre", genreRouter);
app.use("/user", userRouter);
app.use("/review", reviewRouter);

app.get("/", (req, res) => res.send("Welcome to Library Management System"));

// --- Start server ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
