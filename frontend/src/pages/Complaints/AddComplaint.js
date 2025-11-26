import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerComplaint } from "../../services/complaintService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ComplaintForm from "./ComplaintForm";

import {
  getComplaint,
  selectIsLoading,
  selectComplaint,
} from "../../redux/features/complaint/complaintSlice";

const initialState = {
  status: "",
  complaintText: "",
  category: "",
  DateFiled: "",
};

const AddComplaint = () => {
  const [formData, setFormData] = useState(initialState);
  const [isComplaintLoading, setIsComplaintLoading] = useState(false);

  const { category, status, complaintText, dateFiled } = formData;

  const navigate = useNavigate();
  const { userID } = useParams();

  // Use the selector you exported from the slice

  const isLoadingComplaint = useSelector(selectIsLoading);

  console.log("userid:", userID);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addComplaint = async (e) => {
    e.preventDefault();

    // validation
    if (!dateFiled || !status || !category || !complaintText) {
      return toast.error("Missing Fields");
    }

    const complaintData = {
      userID,
      category,
      status,
      complaintText,
      dateFiled,
    };

    console.log("ComplaintData:", complaintData);

    setIsComplaintLoading(true);
    // attempts to save the new trip
    try {
      const data = await registerComplaint(complaintData);
      toast.success("Complaint Added Successfully");
      navigate(-1);
      setIsComplaintLoading(false);
    } catch (error) {
      setIsComplaintLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <ComplaintForm
      status={status}
      complaintText={complaintText}
      category={category}
      dateFiled={dateFiled}
      handleInputChange={handleInputChange}
      addComplaint={addComplaint}
      formTitle={"Add Complaint"}
      isLoading={isComplaintLoading}
      isLoadingComplaint={isLoadingComplaint}
    />
  );
};

export default AddComplaint;
