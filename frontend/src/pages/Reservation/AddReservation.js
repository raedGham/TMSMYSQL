import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerReserv } from "../../services/reservationService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReservationForm from "./ReservationForm";

import { selectUserID } from "../../redux/features/auth/authSlice";
import { getTrip } from "../../redux/features/trips/tripSlice";

const initialState = {
  numberOfPeople: "",
  status: "",
};

const AddReservation = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { tripID } = useParams();

  const { reservationDate, numberOfPeople, status } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);

  useEffect(() => {
    if (tripID) {
      dispatch(getTrip(tripID));
    }
  }, [dispatch, tripID]);

  const { trip } = useSelector((state) => state.trip);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addReserv = async (e) => {
    e.preventDefault();

    // validation
    if (!numberOfPeople) {
      return toast.error("Please Specify no of People");
    }

    const ReservData = {
      reservationDate:new Date().toISOString().split("T")[0], 
      numberOfPeople: Number(numberOfPeople),
      status: "active",
      tripID: trip._id,
      userID,
    };
    console.log("ReservData:", ReservData);

    setIsLoading(true);
    // attemps to save the new trip
    try {
      const data = await registerReserv(ReservData);
      toast.success("Reservation Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <ReservationForm
      reservationDate = {new Date().toISOString().split("T")[0]}
      numberOfPeople={numberOfPeople}
      trip={trip}
      handleInputChange={handleInputChange}
      addReserv={addReserv}
      formTitle={"Add Reservation"}
    />
  );
};

export default AddReservation;
