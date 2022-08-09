import { notFound } from "../errors/not-found.js";
import hotelModel from "../models/hotel.js";
import roomModel from "../models/rooms.js";

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
  const { min, max, ...others } = req.query;
  try {
    const hotels = await hotelModel
      .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 10000 } })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    throw new notFound(`Hotels not existed`);
  }
};

export const getHotelByID = async (req, res, next) => {
  const { id } = req.params;
  const hotel = await hotelModel.findById({ _id: id });

  if (!hotel) {
    throw new notFound(`Hotel with id ${id} not existed`);
  }

  res.status(200).json(hotel);
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

export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city });
      })
    );
    res.json(list);
  } catch (error) {}
};

export const countType = async (req, res) => {
  try {
    const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "villa", count: villaCount },
      { type: "resort", count: resortCount },
      { type: "cabin", count: cabinCount },
      { type: "apartment", count: apartmentCount },
    ]);
  } catch (error) {
    res.json({ error });
    console.log(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  const { id } = req.params;
  const hotel = await hotelModel.findById({ _id: id });

  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return roomModel.findById(room);
    })
  );

  res.status(200).json(list);
};
