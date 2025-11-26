import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateActivity, getActivity } from "../../../services/activityService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ActivityForm from "./ActivityForm";

const EditActivity = () => {
  const { id } = useParams(); // activity ID from url
  const [formData, setFormData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [costPerPerson, setCostPerPerson] = useState("");

  // Load activity details
  useEffect(() => {
    async function fetchData() {
      try {
        const activity = await getActivity(id);
        setName(activity.name);
        setDescription(activity.description);
        setStartDate(activity.startDate);
        setFinishDate(activity.finishDate);
        setCapacity(activity.capacity);
        setCostPerPerson(activity.costPerPerson);
      } catch (err) {
        toast.error("Failed to load activity details");
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;

      case "startDate":
        setStartDate(value);
        break;
      case "finishDate":
        setFinishDate(value);
        break;
      case "costPerPerson":
        setCostPerPerson(value);
        break;
      case "capacity":
        setCapacity(value);
        break;
    }
  };

  const handleSubmit = async (e) => {
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
    };
    console.log(activitiyData);
    setIsLoading(true);
    // attemps to save the new activitiy
    try {
      const data = await updateActivity(id, activitiyData);
      toast.success("Activity Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };
  return (
    <ActivityForm
      name={name}
      description={description}
      startDate={formatDate(startDate)}
      finishDate={formatDate(finishDate)}
      capacity={capacity}
      costPerPerson={costPerPerson}
      handleInputChange={handleInputChange}
      addActivity={handleSubmit}
      formTitle={"Edit Activity"}
    />
  );
};

export default EditActivity;
