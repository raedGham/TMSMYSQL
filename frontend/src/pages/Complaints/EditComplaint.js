import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerComplaint } from "../../services/complaintService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ComplaintForm from "./ComplaintForm";

import {
  fetchComplaints,  
  getComplaint,
  selectIsLoading,
  selectComplaint,
  updateComplaint,  
} from "../../redux/features/complaint/complaintSlice";



const EditComplaint = () => {
  const {id} = useParams();  

   const dispatch = useDispatch();
  const [isComplaintLoading, setIsComplaintLoading] = useState(false);
  const navigate = useNavigate();
  const { userID } = useParams();
  
  // Use the selector you exported from the slice

  const isLoadingComplaint = useSelector(selectIsLoading);
  const complaintEdit = useSelector(selectComplaint);  // the complaint we want to edit 

  console.log(complaintEdit)

 const [complaint, setComplaint] = useState(complaintEdit);
  
  useEffect(()=> {
    dispatch(getComplaint(id))
  }, [dispatch, id])

  useEffect(()=> {
    setComplaint(complaintEdit)
  }, [complaintEdit])

const handleInputChange = (e) => {
  const { name, value } = e.target;

  setComplaint((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const editComplaint = async (e) => {
    e.preventDefault();
      console.log(complaint)
 
    // validation
    if (!complaint.dateFiled || !complaint.status || !complaint.category || !complaint.complaintText) {
      return toast.error("Missing Fields");
    }

    const formData = new FormData();  
    formData.append("dateFiled", complaint?.dateFiled);
    formData.append("status", complaint?.status);
    formData.append("category", complaint?.category);
    formData.append("complaintText", complaint?.complaintText);


    setIsComplaintLoading(true);
    // attempts to save the new trip
    try {
      console.log("ID param:", id)
      if (formData) {
      await dispatch(updateComplaint({id, formData}));
      await dispatch(fetchComplaints())
      toast.success("Complaint Added Successfully");
      navigate(-1);
      setIsComplaintLoading(false);
      }
    } catch (error) {
      setIsComplaintLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

 
 const formattedDateFiled = complaint?.dateFiled
  ? new Date(complaint?.dateFiled).toISOString().split("T")[0]
  : "";
return (

    <ComplaintForm
      status={complaint?.status}
      complaintText={complaint?.complaintText}
      category={complaint?.category}
      dateFiled={formattedDateFiled}
      handleInputChange={handleInputChange}
      addComplaint={editComplaint}
      formTitle={"Edit Complaint"}
      isLoading={isComplaintLoading}
      isLoadingComplaint={isLoadingComplaint}
    />
  );
};

export default EditComplaint;
