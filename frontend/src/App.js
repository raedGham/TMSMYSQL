import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";
import Main from "./pages/home/Main";
import Layout from "./components/layout/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import TripsList from "./pages/admin/trips/TripsList";
import AddTrip from "./pages/admin/trips/AddTrip";
import EditTrip from "./pages/admin/trips/EditTrip";
import TripInfo from "./pages/admin/trips/TripInfo";
import AddTrans from "./pages/admin/transportation/AddTrans";
import TransList from "./pages/admin/transportation/TransList";
import EditTrans from "./pages/admin/transportation/EditTrans";
import AddActivity from "./pages/admin/activities/AddActivity";
import ActivityList from "./pages/admin/activities/ActivityList";
import UsersList from "./pages/admin/users/UsersList";
import AddUser from "./pages/admin/users/AddUser";
import Destination from "./pages/Destination/Destination";
import TripDetails from "./pages/Destination/TripDetails/TripDetails";
import AddReservation from "./pages/Reservation/AddReservation";
import AddPayment from "./pages/Payment/AddPayment";
import PaymentsList from "./pages/Payment/PaymentsList";
import TripImages from "./pages/Destination/TripDetails/TripImages";
import UserReservationList from "./pages/Reservation/UserReservationList";
import ChangePass from "./pages/auth/changepass";
import ComplaintsList from "./pages/Complaints/ComplaintsList";
import AddComplaint from "./pages/Complaints/AddComplaint";
import EditComplaint from "./pages/Complaints/EditComplaint";
import AdminComplaintList from "./pages/admin/complaintResponse/AdminComplaintsList";
import AddResponse from "./pages/admin/complaintResponse/AddResponse";
import AdminReservationList from "./pages/admin/adminReservationList/AdminReservationList";
import AdminPaymentList from "./pages/admin/adminPaymentsList/AdminPaymentList";
import EditActivity from "./pages/admin/activities/EditActivity";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/changepassword" element={<ChangePass />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/admin/trips/new" element={<AddTrip />}></Route>
          <Route path="/admin/trips/:id" element={<EditTrip />}></Route>
          <Route path="/admin/trips" element={<TripsList />}></Route>
          <Route
            path="/admin/adminReservationList"
            element={<AdminReservationList />}
          ></Route>
          <Route
            path="/admin/adminPaymentList"
            element={<AdminPaymentList />}
          ></Route>
          <Route
            path="/admin/trips/trip-info/:id"
            element={<TripInfo />}
          ></Route>
          <Route path="/admin/trans/new/:tripID" element={<AddTrans />}></Route>
          <Route path="/admin/trans/:tripID" element={<TransList />}></Route>
          <Route path="/admin/trans/edit/:id" element={<EditTrans />}></Route>
          <Route
            path="/admin/activity/new/:tripID"
            element={<AddActivity />}
          ></Route>
          <Route
            path="/admin/activity/edit/:id"
            element={<EditActivity />}
          ></Route>
          <Route
            path="/admin/activity/:tripID"
            element={<ActivityList />}
          ></Route>
          <Route path="/admin/users" element={<UsersList />}></Route>
          <Route path="/admin/users/new" element={<AddUser />}></Route>
          <Route
            path="/admin/complaints"
            element={<AdminComplaintList />}
          ></Route>
          <Route
            path="/admin/complaints/respond/:id"
            element={<AddResponse />}
          ></Route>
          <Route path="/destination" element={<Destination />}></Route>
          <Route path="/details/:id" element={<TripDetails />}></Route>
          <Route path="/trip/images/:tripId" element={<TripImages />}></Route>
          <Route
            path="/reservation/:tripID"
            element={<AddReservation />}
          ></Route>
          <Route
            path="/userreservation"
            element={<UserReservationList />}
          ></Route>
          <Route
            path="/payment/new/:reservationID"
            element={<AddPayment />}
          ></Route>
          <Route path="/paymentsList" element={<PaymentsList />}></Route>
          <Route path="/complaintsList" element={<ComplaintsList />}></Route>
          <Route
            path="/complaint/new/:userID"
            element={<AddComplaint />}
          ></Route>
          <Route path="/complaint/:id" element={<EditComplaint />}></Route>;
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
