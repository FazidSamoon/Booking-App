import { notFound } from "../errors/not-found.js";
import hotelModel from "../models/hotel.js";
import roomModel from "../models/rooms.js";

export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;

  try {
    const room = await roomModel.create(req.body);
    try {
      await hotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: room._id },
      });
    } catch (error) {
      throw new notFound("Something went wrong .... Please try again later");
    }
    res.status(200).json({ room });
  } catch (error) {
    throw new notFound("Something went wrong .... Please try again later");
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await roomModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!room) {
      throw new notFound(`room with id ${id} not exists`);
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRoom = async (req, res) => {
  const { id , hotelId } = req.params;
  const result = await roomModel.findByIdAndDelete({ _id: id });
  try {
    await hotelModel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: id},
    });
  } catch (error) {
    throw new notFound("Something went wrong .... Please try again later");
  }
  res.status(200).json({ result });
};

export const getRoomByID = async (req, res, next) => {
  const { id } = req.params;
  const room = await roomModel.findById({ _id: id });

  if (!room) {
    throw new notFound(`Room with id ${id} not existed`);
  }

  res.status(200).json({ room });
};

export const getAllRooms = async (req, res) => {
  const rooms = await roomModel.find({});
  res.status(200).json({ rooms });
};
