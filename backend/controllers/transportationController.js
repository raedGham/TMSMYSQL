const asyncHandler = require("express-async-handler");
const Transportation = require("../models/transportationModel");

// --------------------------------------------------------------------
// NEW TRANSPORTATION
// --------------------------------------------------------------------
const newTransportation = asyncHandler(async (req, res) => {
  const {
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
    tripID,
  } = req.body;

  if (
    !type ||
    !arrivalLocation ||
    !departureLocation ||
    !arrivalDate ||
    !departureDate ||
    !duration ||
    !costPerTrip
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const transportation = await Transportation.create({
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
    tripID,
  });

  res.status(201).json(transportation);
});

// --------------------------------------------------------------------
// GET ALL TRANSPORTATIONS
// --------------------------------------------------------------------
const getTransportations = asyncHandler(async (req, res) => {
  const transportations = await Transportation.findAll({
    order: [["arrivalDate", "ASC"]], // adjust ordering if needed
  });
  res.status(200).json(transportations);
});

// --------------------------------------------------------------------
// GET SINGLE TRANSPORTATION
// --------------------------------------------------------------------
const getTransportation = asyncHandler(async (req, res) => {
  const transportation = await Transportation.findByPk(req.params.id);
  if (!transportation) return res.status(400).json({ message: "Invalid transportation" });
  res.status(200).json(transportation);
});

// --------------------------------------------------------------------
// UPDATE TRANSPORTATION
// --------------------------------------------------------------------
const updateTransportation = asyncHandler(async (req, res) => {
  const {
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
  } = req.body;

  const transportation = await Transportation.findByPk(req.params.id);
  if (!transportation) return res.status(400).json({ message: "Invalid transportation" });

  transportation.type = type ?? transportation.type;
  transportation.arrivalLocation = arrivalLocation ?? transportation.arrivalLocation;
  transportation.departureLocation = departureLocation ?? transportation.departureLocation;
  transportation.arrivalDate = arrivalDate ?? transportation.arrivalDate;
  transportation.departureDate = departureDate ?? transportation.departureDate;
  transportation.duration = duration ?? transportation.duration;
  transportation.costPerTrip = costPerTrip ?? transportation.costPerTrip;

  await transportation.save();
  res.status(200).json(transportation);
});

// --------------------------------------------------------------------
// DELETE TRANSPORTATION
// --------------------------------------------------------------------
const deleteTransportation = asyncHandler(async (req, res) => {
  const transportation = await Transportation.findByPk(req.params.id);
  if (!transportation) return res.status(400).json({ message: "Invalid transportation" });

  await transportation.destroy();
  res.status(200).json(transportation);
});

module.exports = {
  newTransportation,
  getTransportations,
  deleteTransportation,
  updateTransportation,
  getTransportation,
};
