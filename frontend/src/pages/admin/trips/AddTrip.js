import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerTrip } from "../../../services/tripService";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import TripForm from "./TripForm";
import { fetchUsers } from "../../../redux/features/auth/authSlice";

const initialState = {
  title: "",
  destination: "",
  demographic: "",
  startDate: "",
  endDate: "",
  pricePerPerson: "",
  organizerID: "",
  thumbnail: "",
};

const AddTrip = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const {
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
    thumbnail,
  } = formData;

  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);
  console.log(users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setPreview(URL.createObjectURL(file)); // preview the image
    }
  };

  const addTrip = async (e) => {
    e.preventDefault();

    // validation
    if (
      !title ||
      !destination ||
      !demographic ||
      !startDate ||
      !endDate ||
      !pricePerPerson ||
      !organizerID
    ) {
      return toast.error("All fields are required");
    }

    const tripData = {
      title,
      destination,
      demographic,
      startDate,
      endDate,
      pricePerPerson,
      organizerID,
      thumbnail,
    };
    console.log(tripData);

    setIsLoading(true);
    // attemps to save the new trip
    try {
      const data = await registerTrip(tripData);
      toast.success("Trip Added Sucessfully");
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <TripForm
      title={title}
      destination={destination}
      demographic={demographic}
      startDate={startDate}
      endDate={endDate}
      pricePerPerson={pricePerPerson}
      organizerID={organizerID}
      handleInputChange={handleInputChange}
      addTrip={addTrip}
      formTitle={"Add Trip"}
      users={users}
      handleThumbnailChange={handleThumbnailChange}
      preview={preview}
    />
  );
};

export default AddTrip;
