import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import tripReducer from "../redux/features/trips/tripSlice";
import tripFilterReducer from "../redux/features/trips/filterSlice";
import tripImagesReducer from "./features/trips/tripImagesSlice";
import transReducer from "./features/transes/transSlice";
import transFilterReducer from "../redux/features/transes/transfilterSlice";
import activityReducer from "./features/activity/ActivitySlice";
import activityFilterReducer from "./features/activity/ActivityFilterSlice";
import userFilterReducer from "./features/auth/UserFilterSlice";
import reservationReducer from "./features/reservation/ReservationSlice";
import paymentReducer from "./features/payment/paymentSlice";
import complaintReducer from "./features/complaint/complaintSlice";
import complaintFilterReducer from "./features/complaint/ComplaintFilterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userFilter: userFilterReducer,
    trip: tripReducer,
    tripFilter: tripFilterReducer,
    tripImages: tripImagesReducer,
    trans: transReducer,
    transFilter: transFilterReducer,
    activity: activityReducer,
    activityFilter: activityFilterReducer,
    reservation: reservationReducer,
    payment: paymentReducer,
    complaint: complaintReducer,
    complaintFilter: complaintFilterReducer,
  },
});
