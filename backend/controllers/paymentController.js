const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Reservation = require("../models/reservationModel");
const Trip = require("../models/tripModel");
const User = require("../models/userModel");

// --------------------------------------------------------------------
// NEW PAYMENT
// --------------------------------------------------------------------
const newPayment = asyncHandler(async (req, res) => {
  const { paymentDate, amount, paymentMethod, reservationID } = req.body;

  if (!paymentDate || !amount || !paymentMethod || !reservationID) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const payment = await Payment.create({
    paymentDate,
    amount,
    paymentMethod,
    reservationID: reservationID,
  });

  res.status(201).json(payment);
});

// --------------------------------------------------------------------
// GET ALL PAYMENTS
// --------------------------------------------------------------------
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.findAll({
    include: {
      model: Reservation,
      as: "reservation",
      include: [
        { model: Trip, as: "trip", 

          include: [
            {
              model: User,
              as: "organizer",
              attributes: ["id", "name", "email"], // choose what you need
            },
          ],

        },
        { model: User, as: "user" },
        
      ],
    },
  });
  res.status(200).json(payments);
});

// --------------------------------------------------------------------
// GET SINGLE PAYMENT
// --------------------------------------------------------------------
const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findByPk(req.params.id, {
    include: {
      model: Reservation,
      as: "reservation",
      include: [
        { model: Trip, as: "trip" },
        { model: User, as: "user" },
      ],
    },
  });

  if (!payment) return res.status(400).json({ message: "Invalid payment" });

  res.status(200).json(payment);
});

// --------------------------------------------------------------------
// UPDATE PAYMENT
// --------------------------------------------------------------------
const updatePayment = asyncHandler(async (req, res) => {
  const { paymentDate, amount, paymentMethod, reservationID } = req.body;

  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(400).json({ message: "Invalid payment" });

  payment.paymentDate = paymentDate ?? payment.paymentDate;
  payment.amount = amount ?? payment.amount;
  payment.paymentMethod = paymentMethod ?? payment.paymentMethod;
  payment.reservationId = reservationID ?? payment.reservationId;

  await payment.save();
  res.status(200).json(payment);
});

// --------------------------------------------------------------------
// DELETE PAYMENT
// --------------------------------------------------------------------
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(400).json({ message: "Invalid payment" });

  await payment.destroy();
  res.status(200).json(payment);
});

module.exports = {
  newPayment,
  getPayments,
  deletePayment,
  updatePayment,
  getPayment,
};
