import { notFound } from "../errors/not-found.js";
import userModel from "../models/user.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new notFound("user not found");
  }

  res.status(200).json({ user });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findByIdAndDelete({ _id: id });
  res.status(200).json({ user });
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById({ _id: id });
  res.status(200).json({ user });
};

export const getAllUsers = async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({ users });
};
