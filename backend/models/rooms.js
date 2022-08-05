import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumbers: [{ number: Number, unAvailableDates: { type: [Date] } }],
});

const roomModel = mongoose.model("Rooms", roomSchema);
export default roomModel;
