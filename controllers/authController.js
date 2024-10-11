import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import createError from "../utils/Error.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";

// register controller
export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // validataion
    if (!username) {
      return next(createError(400, "Username is required"));
    }
    if (!email) {
      return next(createError(400, "Email is required"));
    }
    if (!password) {
      return next(createError(400, "Address is required"));
    }

    console.log(username, email, password);
    // existing user
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please Login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Fetch the newly created user without the password field
    const userWithoutPassword = await userModel
      .findById(newUser._id)
      .select("-password");

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser:userWithoutPassword,
    });
  } catch (error) {
    return next(createError(500, "Error in registration"));
  }
};

// login controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return next(createError(400, "Invalid email or password"));
    }

    // check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return next(createError(200, "Invalid Password"));
    }

    // token creation
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .send({
        success: true,
        message: "Login successfully",
        user: {
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    return next(createError(error.status, error.message));
  }
};

// verify user Controller
export const verifyUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Token verify successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
