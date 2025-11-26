import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerTrans } from "../../../services/transService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import TransForm from "./TransForm";
import { fetchUsers } from "../../../redux/features/auth/authSlice";

const initialState = {
  type: "",
  arrivalLocation: "",
  departureLocation: "",
  arrivalDate: "",
  departureDate: "",
  duration: "",
  costPerTrip: "",
  TripID: "",
};

const AddTrans = () => {
  const { tripID } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const {
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTrans = async (e) => {
    e.preventDefault();

    // validation
    if (
      !type ||
      !arrivalLocation ||
      !departureLocation ||
      !arrivalDate ||
      !departureDate ||
      !duration ||
      !costPerTrip
    ) {
      return toast.error("All fields are required");
    }

    const transData = {
      type,
      arrivalLocation,
      departureLocation,
      arrivalDate,
      departureDate,
      duration,
      costPerTrip,
      tripID,
    };
    setIsLoading(true);
    // attemps to save the new trans
    try {
      const data = await registerTrans(transData);
      toast.success("Trans Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <TransForm
      type={type}
      arrivalLocation={arrivalLocation}
      departureLocation={departureLocation}
      arrivalDate={arrivalDate}
      departureDate={departureDate}
      duration={duration}
      costPerTrip={costPerTrip}
      tripID={tripID}
      handleInputChange={handleInputChange}
      addTrans={addTrans}
      formTitle={"Add Trans"}
    />
  );
};

export default AddTrans;
