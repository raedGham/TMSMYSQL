const Complaint = require("./userComplaintsModel");
const User = require("./userModel");
const TripImage = require("./tripImagesModel");
const Trip = require("./tripModel");
const Transportation = require("./transportationModel");
const Token = require("./tokenModel");
const Reservation = require("./reservationModel");
const Payment = require("./paymentModel");
const Activity = require("./activitiesModel");
const Review = require("./userReviewsModel");


// Main user who filed the complaint
Complaint.belongsTo(User, { foreignKey: "userID", as: "complainant" });
User.hasMany(Complaint, { foreignKey: "userID", as: "submittedComplaints" });

// Supervisor reviewing the complaint
Complaint.belongsTo(User, { foreignKey: "supervisorID", as: "supervisor" });
User.hasMany(Complaint, { foreignKey: "supervisorID", as: "assignedReviews" });




Trip.belongsTo(User, { foreignKey: "organizerID", as: "organizer" });
User.hasMany(Trip, { foreignKey: "organizerID", as: "organizedTrips" });



TripImage.belongsTo(Trip, { foreignKey: "tripID" });
Trip.hasMany(TripImage, { foreignKey: "tripID", as: "images" });


Transportation.belongsTo(Trip, { foreignKey: "tripID" });
Trip.hasMany(Transportation, { foreignKey: "tripID", as: "transportations" });

Token.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Token, { foreignKey: "userId", as: "tokens" });

Reservation.belongsTo(Trip, { foreignKey: "tripID", as : "trip" });
Trip.hasMany(Reservation, { foreignKey: "tripID", as: "reservations" });

Reservation.belongsTo(User, { foreignKey: "userID", as: "user" });
User.hasMany(Reservation, { foreignKey: "userID", as: "reservations" });

Payment.belongsTo(Reservation, { foreignKey: "reservationID" , as : "reservation"});
Reservation.hasMany(Payment, { foreignKey: "reservationID", as: "payments" });


Activity.belongsTo(Trip, { foreignKey: "tripID", as : "trip" });
Trip.hasMany(Activity, { foreignKey: "tripID", as: "activities" });

Review.belongsTo(Trip, {foreignKey: "tripID", as: "trip"});
Trip.hasMany(Review, { foreignKey: "tripID",as: "reviews"});


Review.belongsTo(User, {foreignKey: "userID", as: "user"});
User.hasMany(Review, { foreignKey: "userID", as: "reviews"});