import userModel from "../models/user.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { notFound } from "../errors/not-found.js";
import { badAuth } from "../errors/bad-auth.js";

export const registerUser = async (req, res, next) => {
  //hashing password
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password , salt);
  //   const tempUser = { username, email, password: hashedPassword };
  //   const user = await userModel.create({ ...tempUser })
  //     .then(() => console.log("user created successfully"))
  //     .catch((err) => console.log(err));

  const user = await userModel.create({ ...req.body });
  const { password, isAdmin, ...otherDetails } = user._doc;

  const token = Jwt.sign(
    { userID: user._id, isAdmin: user.isAdmin },
    process.env.JWT_WEB_TOKEN,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );

  res
    .status(200)
    .json({ otherDetails } , token);
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });
  const { _id, isAdmin } = user;
  if (!user) {
    throw new notFound("user not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new badAuth("Username or password incorrect");
  }

  const token = Jwt.sign(
    { userID: _id, isAdmin: isAdmin },
    process.env.JWT_WEB_TOKEN,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );

  res
    .status(200)
    .json({ user  , token});
};
