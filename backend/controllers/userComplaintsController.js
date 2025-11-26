const asyncHandler = require("express-async-handler");
const Complaint = require("../models/userComplaintsModel");
const User = require("../models/userModel");

// --------------------------------------------------------------------
// NEW COMPLAINT
// --------------------------------------------------------------------
const newComplaint = asyncHandler(async (req, res) => {
  const { userID, category, status, complaintText, dateFiled } = req.body;

  if (!userID || !category || !status || !dateFiled || !complaintText) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const complaint = await Complaint.create({
    userID,
    category,
    status,
    complaintText,
    dateFiled,
  });

  res.status(201).json(complaint);
});

// --------------------------------------------------------------------
// GET ALL COMPLAINTS
// --------------------------------------------------------------------
const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.findAll({
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });

  res.status(200).json(complaints);
});

// --------------------------------------------------------------------
// GET SINGLE COMPLAINT
// --------------------------------------------------------------------
const getComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findByPk(req.params.id, {
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });

  if (!complaint) {
    return res.status(400).json({ message: "Invalid complaint" });
  }

  res.status(200).json(complaint);
});

// --------------------------------------------------------------------
// UPDATE COMPLAINT
// --------------------------------------------------------------------
const updateComplaint = asyncHandler(async (req, res) => {
  const { supervisorID, status, dateReviewed, complaintText } = req.body;

  const complaint = await Complaint.findByPk(req.params.id);

  if (!complaint) {
    return res.status(400).json({ message: "Invalid complaint" });
  }

  complaint.supervisorID = supervisorID ?? complaint.supervisorID;
  complaint.status = status ?? complaint.status;
  complaint.dateReviewed = dateReviewed ?? complaint.dateReviewed;
  complaint.complaintText = complaintText ?? complaint.complaintText;

  await complaint.save();

  res.status(200).json(complaint);
});

// --------------------------------------------------------------------
// DELETE COMPLAINT
// --------------------------------------------------------------------
const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findByPk(req.params.id);

  if (!complaint) {
    return res.status(400).json({ message: "Invalid complaint" });
  }

  await complaint.destroy();

  res.status(200).json(complaint);
});

module.exports = {
  newComplaint,
  getComplaints,
  deleteComplaint,
  updateComplaint,
  getComplaint,
};
