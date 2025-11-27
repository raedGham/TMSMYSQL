const asyncHandler = require("express-async-handler");
const Reservation = require("../models/reservationModel");
const Trip = require("../models/tripModel");
const User = require("../models/userModel");

// --------------------------------------------------------------------
// NEW RESERVATION
// --------------------------------------------------------------------
const newReservation = asyncHandler(async (req, res) => {
  const { reservationDate, numberOfPeople, status, tripID, userID } = req.body;

  if (!numberOfPeople || !status || !tripID || !userID) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const reservation = await Reservation.create({
    reservationDate,
    numberOfPeople,
    status,
    tripID: tripID,
    userID: userID,
  });

  res.status(201).json(reservation);
});

// --------------------------------------------------------------------
// GET ALL RESERVATIONS
// --------------------------------------------------------------------
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.findAll({
    include: [
      { model: Trip, as: "trip" },
      { model: User, as: "user" },
    ],
  });
  res.status(200).json(reservations);
});

// --------------------------------------------------------------------
// GET SINGLE RESERVATION
// --------------------------------------------------------------------
const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id, {
    include: [{ model: Trip, as: "trip" }, { model: User, as: "user" }],
  });

  if (!reservation)
    return res.status(400).json({ message: "Invalid reservation" });

  res.status(200).json(reservation);
});

// --------------------------------------------------------------------
// UPDATE RESERVATION
// --------------------------------------------------------------------
const updateReservation = asyncHandler(async (req, res) => {
  const { reservationDate, numberOfPeople, status, tripID, userID } = req.body;

  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation)
    return res.status(400).json({ message: "Invalid reservation" });

  reservation.reservationDate = reservationDate ?? reservation.reservationDate;
  reservation.numberOfPeople = numberOfPeople ?? reservation.numberOfPeople;
  reservation.status = status ?? reservation.status;
  reservation.tripId = tripID ?? reservation.tripId;
  reservation.userId = userID ?? reservation.userId;

  await reservation.save();
  res.status(200).json(reservation);
});

// --------------------------------------------------------------------
// DELETE RESERVATION
// --------------------------------------------------------------------
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation)
    return res.status(400).json({ message: "Invalid reservation" });

  await reservation.destroy();
  res.status(200).json(reservation);
});

// --------------------------------------------------------------------
// UPDATE RESERVATION STATUS
// --------------------------------------------------------------------
const updateResStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const reservation = await Reservation.findByPk(req.params.id);

  if (!reservation)
    return res.status(404).json({ message: "Reservation not found" });

  reservation.status = status;
  await reservation.save();

  res.status(200).json(reservation);
});

module.exports = {
  newReservation,
  getReservations,
  deleteReservation,
  updateReservation,
  getReservation,
  updateResStatus,
};
