const User = require("../models/User");

const jwt = require("jsonwebtoken");

//generate JWT Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//register a new user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create a new user
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//login an existing user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find the user by email
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password " });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//get current user profile

const getProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "User not found" });
  }
};

module.exports = { registerUser, loginUser, getProfile };
