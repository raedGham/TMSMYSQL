import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerPayment } from "../../services/paymentService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import {
  getReservation,
  selectIsLoading,
  selectReserv,
} from "../../redux/features/reservation/ReservationSlice";

import {updateStatus} from "../../services/reservationService";


const initialState = {
  paymentDate: "",
  amount: "",
  paymentMethod: "",
  reservationID: "",
};

const AddPayment = () => {
  const [formData, setFormData] = useState(initialState);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const { reservationID } = useParams();

  const { paymentDate, amount, paymentMethod } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Use the selector you exported from the slice

  const isLoadingReserv = useSelector(selectIsLoading);
  
  useEffect(() => {
      console.log("RESERVATIONID:", reservationID);      
      dispatch(getReservation(reservationID));  
   }, [dispatch, , reservationID]);

  const reserv = useSelector(selectReserv);  

  // to calculate total price
  useEffect(() => {
    
    if (reserv) {
      const total = reserv.tripID.pricePerPerson * reserv.numberOfPeople || 0;
      setFormData((prev) => ({
        ...prev,
        amount: total,
      }));
    }
  }, [reserv]);



      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };



      const addPaym = async (e) => {
        console.log("ADD PAYMENT")
        e.preventDefault();

        // validation
        if (!paymentDate) {
          return toast.error("Please Specify Payment Date");
        }
 
        const paymentData = {
          paymentDate: paymentDate,
          amount: amount,
          paymentMethod: paymentMethod,
          reservationID,
        };
 
        setIsPaymentLoading(true);
        // attempts to save the new trip
        try {
          console.log("registeringPayment")
          const data = await registerPayment(paymentData);
          if (data) {
            await updateStatus(reservationID, "completed");
          }


          toast.success("Payment Added Successfully");
          navigate(-1);
          setIsPaymentLoading(false);
        } catch (error) {
          setIsPaymentLoading(false);          
          toast.error(error.message);
        }
      };

return (
  <>
    {reserv ? (
      <PaymentForm
        paymentDate={paymentDate}
        amount={amount}
        paymentMethod={paymentMethod}
        reserv={reserv}
        handleInputChange={handleInputChange}
        addPaym={addPaym}
        formTitle={"Add Payment"}
      />
    ) : (
      <h1 className="m-[80px] text-white">No Data</h1>
    )}
  </>
);
  
};

export default AddPayment;
