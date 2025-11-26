const asyncHandler = require("express-async-handler");
const Activity = require("../models/activitiesModel");
const Trip = require("../models/tripModel");

// --------------------------------------------------------------------
// NEW ACTIVITY
// --------------------------------------------------------------------
const newActivity = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    startDate,
    finishDate,
    capacity,
    costPerPerson,
    tripID,
  } = req.body;

  if (!name || !description || !startDate || !finishDate || !capacity || !tripID || !costPerPerson) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const activity = await Activity.create({
    name,
    description,
    startDate,
    finishDate,
    capacity,
    costPerPerson,
    tripId: tripID,
  });

  res.status(201).json(activity);
});

// --------------------------------------------------------------------
// GET ALL ACTIVITIES
// --------------------------------------------------------------------
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.findAll({
    order: [["startDate", "ASC"]],
    include: [{ model: Trip, as: "trip" }],
  });
  res.status(200).json(activities);
});

// --------------------------------------------------------------------
// GET SINGLE ACTIVITY
// --------------------------------------------------------------------
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findByPk(req.params.id, {
    include: [{ model: Trip, as: "trip" }],
  });

  if (!activity) return res.status(400).json({ message: "Invalid activity" });

  res.status(200).json(activity);
});

// --------------------------------------------------------------------
// UPDATE ACTIVITY
// --------------------------------------------------------------------
const updateActivity = asyncHandler(async (req, res) => {
  const { name, description, startDate, finishDate, capacity, costPerPerson } = req.body;

  const activity = await Activity.findByPk(req.params.id);
  if (!activity) return res.status(400).json({ message: "Invalid activity" });

  activity.name = name ?? activity.name;
  activity.description = description ?? activity.description;
  activity.startDate = startDate ?? activity.startDate;
  activity.finishDate = finishDate ?? activity.finishDate;
  activity.capacity = capacity ?? activity.capacity;
  activity.costPerPerson = costPerPerson ?? activity.costPerPerson;

  await activity.save();
  res.status(200).json(activity);
});

// --------------------------------------------------------------------
// DELETE ACTIVITY
// --------------------------------------------------------------------
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findByPk(req.params.id);
  if (!activity) return res.status(400).json({ message: "Invalid activity" });

  await activity.destroy();
  res.status(200).json(activity);
});

module.exports = {
  newActivity,
  getActivities,
  deleteActivity,
  updateActivity,
  getActivity,
};
