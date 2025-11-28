import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerResponse } from "../../../services/responseService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ResponseForm from "./ResponseForm";

import {
  getComplaint,
  selectIsLoading,
  selectComplaint,
} from "../../../redux/features/complaint/complaintSlice";

const initialState = {
  userID: "",
  status: "",
  category: "",
  dateFiled: "",
  responseText: "",
  dateReviewed: Date.now(),
};

const AddResponse = () => {
  const [formData, setFormData] = useState(initialState);
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const { category, status, responseText, dateFiled, userID, dateReviewed } =
    formData;

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const isLoadingResponse = useSelector(selectIsLoading);
  const complaint = useSelector(selectComplaint); // fetched complaint

  // --------------------------
  // FETCH COMPLAINT BY ID
  // --------------------------
  useEffect(() => {
    dispatch(getComplaint(id));
  }, [id, dispatch]);

  // --------------------------
  // WHEN COMPLAINT IS LOADED → FILL FORM WITH ITS DATA
  // --------------------------
  useEffect(() => {
    if (complaint) {
      setFormData({
        userID: complaint.userID.id,
        status: complaint.status || "",
        category: complaint.category || "",
        dateFiled: complaint.dateFiled ? complaint.dateFiled.split("T")[0] : "",
        responseText: "",
      });
    }
  }, [complaint]);

  // --------------------------
  // HANDLE INPUT FIELDS
  // --------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --------------------------
  // SUBMIT RESPONSE
  // --------------------------
  const addRes = async (e) => {
    e.preventDefault();

    if (!dateReviewed || !category || !responseText) {
      return toast.error("Missing Fields");
    }

    const responseData = {
      complaintID: id,
      userID,
      category,
      status:"Replied",
      responseText,
      dateReviewed,     
    };


    setIsResponseLoading(true);

    try {
      await registerResponse(id, responseData);
      toast.success("Response Added Successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error.message || "Failed to add response");
    }

    setIsResponseLoading(false);
  };

  // --------------------------
  // DISPLAY
  // --------------------------
  console.log("-----------------")
  console.log(complaint)
  return (
    <ResponseForm
      complaint={complaint}    
      responseText={responseText}
      dateReviewed={dateReviewed}
      handleInputChange={handleInputChange}
      addRes={addRes}
      formTitle={"Add Response"}
      isLoading={isResponseLoading}
      isLoadingResponse={isLoadingResponse}
    />
  );
};

export default AddResponse;
