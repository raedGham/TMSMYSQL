import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateTrip, getTrip } from "../../../services/tripService"; // Your editTrip API function
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import TripForm from "../../../pages/admin/trips/TripForm";
import { fetchUsers } from "../../../redux/features/auth/authSlice";

const EditTrip = () => {
  const { id } = useParams(); // trip ID from route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [demographic, setDemographic] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [organizerID, setOrganizerID] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Load trip details
  useEffect(() => {
    async function fetchData() {
      try {
        const trip = await getTrip(id);
        setTitle(trip.title);
        setDestination(trip.destination);
        setDemographic(trip.demographic);
        setStartDate(trip.startDate);
        setEndDate(trip.endDate);
        setPricePerPerson(trip.pricePerPerson);

        setPreview(trip.thumbnail?.url || null); // Show existing image

        // Only set organizer after trip loads
        setOrganizerID(trip.organizerID?._id || trip.organizerID || "");
      } catch (err) {
        toast.error("Failed to load trip details");
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "destination":
        setDestination(value);
        break;
      case "demographic":
        setDemographic(value);
        break;
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "pricePerPerson":
        setPricePerPerson(value);
        break;
      case "organizerID":
        setOrganizerID(value);
        break;
    }
  };

  // Handle image selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripData = {
      title,
      destination,
      demographic,
      startDate,
      endDate,
      pricePerPerson,
      organizerID,
      thumbnail, // File or null
    };
    try {
      await updateTrip(id, tripData);
      navigate("/admin/trips"); // Go back to list
    } catch (err) {
      toast.error("Failed to update trip");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <TripForm
      title={title}
      destination={destination}
      demographic={demographic}
      startDate={formatDate(startDate)}
      endDate={formatDate(endDate)}
      pricePerPerson={pricePerPerson}
      organizerID={organizerID}
      handleInputChange={handleInputChange}
      addTrip={handleSubmit}
      formTitle={"Edit Trip"}
      users={users}
      handleThumbnailChange={handleThumbnailChange}
      preview={preview}
    />
  );
};

export default EditTrip;
