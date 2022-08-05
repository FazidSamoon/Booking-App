import { notFound } from "../errors/not-found.js";
import hotelModel from "../models/hotel.js";

export const createHotel = async (req, res) => {
  try {
    console.log(req.body);
    const hotel = await hotelModel.create(req.body);
    res.status(200).json({ hotel });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllHotels = async (req, res) => {
  const hotel = await hotelModel.find({});
  res.status(200).json({ hotel });
};

export const getHotelByID = async (req, res, next) => {
  const { id } = req.params;
  const hotel = await hotelModel.findById({ _id: id });

  if (!hotel) {
    throw new notFound(`Hotel with id ${id} not existed`);
  }

  res.status(200).json({ hotel });
};

export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await hotelModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!hotel) {
      throw new notFound(`hotel with id ${id} not exists`);
    }
    res.status(200).json({ hotel });
  } catch (error) {
    console.log(error);
  }
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  const result = await hotelModel.findByIdAndDelete({ _id: id });
  res.status(200).json({ result });
};
