require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dns = require("dns")
dns.setServers(['8.8.8.8','1.1.1.1'])

/* ✅ ADDED */
const multer = require("multer");
const path = require("path");

const app = express();

/* =============================
   MIDDLEWARE
============================= */
app.use(cors());
app.use(express.json());

/* ✅ ADDED (MULTER CONFIG) */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

/* =============================
   DATABASE CONNECTION
============================= */
// mongoose.connect("mongodb+srv://areebamirza1408_db_user:areebamirza@cluster0.myspecc.mongodb.net/SharlyDatabase")
// mongoose
mongoose.connect(process.env.MONGO_URI)
//   .connect("mongodb://127.0.0.1:27017/SharlyDatabase")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error :", err));

 

/* =============================
   MODELS
============================= */
const User = require("./models/points");
const Donation = require("./models/Donation");
const Product = require("./models/Product");
const Blog = require("./models/Blog");

/* =============================
   REGISTER USER
============================= */
app.post("/api/get-started", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      points: 10,
    });

    const token = jwt.sign(
  { id: user._id, name: user.name },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
    res.status(201).json({
      message: "Account created successfully 🎉",
      token,
      userId: user._id,
      name: user.name,
      points: user.points,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});

/* =============================
   LOGIN USER
============================= */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found " });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password " });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful 🎉",
      token,
      userId: user._id,
      name: user.name,
      points: user.points || 0,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});

/* =============================
   DONATION SYSTEM
============================= */
app.post("/api/donate", upload.single("image"), async (req, res) => {
  try {
    const {
      userId,
      itemName,
      category,
      condition,
      address,
      quantity,
      weight,
    } = req.body;

    /* ✅ FIXED IMAGE */
    const image = req.file ? req.file.filename : null;

    if (!userId || !itemName || !category || !condition || !address) {
      return res.status(400).json({
        message: "Missing required fields ",
      });
    }

    const pointsMap = {
      Books: 30,
      Clothes: 50,
      Electronics: 100,
      Furniture: 150,
      Toys: 40,
      "Kitchen Items": 60,
    };

    const rewardPoints = pointsMap[category] || 20;

    await Donation.create({
      userId,
      itemName,
      category,
      condition,
      quantity,
      weight,
      image,
      address,
      rewardPoints,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    user.points = user.points + rewardPoints;
    await user.save();

    res.json({
      message: "Donation successful 🎉",
      rewardPoints,
      totalPoints: user.points,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});

/* =============================
   GET USER POINTS
============================= */
app.get("/api/user-points/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    res.json({ points: user.points || 0 });

  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});

/* =============================
   STORE PRODUCTS
============================= */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});

/* =============================
   BUY PRODUCT
============================= */
app.post("/api/buy-product", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found " });
    }

    if (user.points < product.points) {
      return res.status(400).json({ message: "Not enough points " });
    }

    user.points -= product.points;
    await user.save();

    res.json({
      message: "Purchase successful 🎉",
      remainingPoints: user.points,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});

/* =============================
   BLOGS
============================= */
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log(blogs);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
});


// ============================================================
// STEP 1: Install karo — Server folder mein terminal open karo:
//   npm install node-fetch
//
// STEP 2: Yeh poora code server.js mein paste karo
//         app.listen(...) line se PEHLE
// ============================================================

app.post("/api/chatbot", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }


  

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        max_tokens: 400,
        system: `You are Sharly, a friendly eco-assistant for the Sharly platform — a digital recycling and donation marketplace based in India. 

Your job is to help users with:
1. HOW TO DONATE: Users can donate items like clothes, books, electronics, furniture, toys, kitchen items. They earn reward points for each donation.
2. REWARD POINTS: Clothes = 50 pts, Electronics = 100 pts, Books = 30 pts, Furniture = 150 pts, Toys = 40 pts, Kitchen = 60 pts, Other = 20 pts. New users get 10 welcome points.
3. SHARLY STORE: Users can redeem points to buy eco-friendly products.
4. ECO TIPS: Give simple sustainability and recycling tips relevant to India.
5. GENERAL: Answer questions about the platform.

Rules:
- Always reply in the same language the user writes in (Hindi or English or Hinglish).
- Keep answers SHORT — max 3-4 sentences.
- Be warm, friendly, and encouraging.
- If asked something unrelated to eco/donations/platform, politely redirect.
- Never make up features that don't exist on the platform.`,
        messages: [
          ...(history || []),
          { role: "user", content: message },
        ],
      }),
    });
    const data = await response.json();

if (data.error) {
  return res.status(500).json({ error: data.error.message });
}

const reply = data.choices[0].message.content;

res.json({ reply });

  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Chatbot unavailable. Try again later." });
  }
});

/* =============================
   SERVER START
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});