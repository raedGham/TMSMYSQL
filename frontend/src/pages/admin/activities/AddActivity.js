import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerActivity } from "../../../services/activityService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ActivityForm from "./ActivityForm";

const initialState = {
  name: "",
  description: "",
  startDate: "",
  finishDate: "",
  capacity: "",
  costPerPerson: "",
  TripID: "",
};

const AddActivity = () => {
  const { tripID } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { name, description, startDate, finishDate, capacity, costPerPerson } =
    formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addActivity = async (e) => {
    e.preventDefault();

    // validation
    if (
      !name ||
      !description ||
      !startDate ||
      !finishDate ||
      !capacity ||
      !costPerPerson
    ) {
      return toast.error("All fields are required");
    }

    const activitiyData = {
      name,
      description,
      startDate,
      finishDate,
      capacity,
      costPerPerson,
      tripID,
    };

    console.log(activitiyData);

    setIsLoading(true);
    // attemps to save the new activitiy
    try {
      const data = await registerActivity(activitiyData);
      toast.success("Activity Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <ActivityForm
      name={name}
      description={description}
      startDate={startDate}
      finishDate={finishDate}
      capacity={capacity}
      costPerPerson={costPerPerson}
      tripID={tripID}
      handleInputChange={handleInputChange}
      addActivity={addActivity}
      formTitle={"Add Activity"}
    />
  );
};

export default AddActivity;
