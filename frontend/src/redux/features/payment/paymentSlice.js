import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../../../services/paymentService";
import { toast } from "react-toastify";
const initialState = {
  payment: null,
  payments: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL PAYMENTS
export const fetchPayments = createAsyncThunk(
  "Payments/getAll",
  async (_, thunkAPI) => {
    try {
      return await paymentService.getPayments();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// DELETE A PAYMENT

export const deletePayment = createAsyncThunk(
  "Payments/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deletePayment Slice :", id);
      return await paymentService.deletePayment(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get a single paymentation
export const getPayment = createAsyncThunk(
  "Payments/getPayment",
  async (id, thunkAPI) => {
    try {
      return await paymentService.getPayment(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// UPDATE A PAYMENT

export const updatePayment = createAsyncThunk(
  "Payments/updatePayment",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await paymentService.updatePayment(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    SAVE_PAYMENT(state, action) {
      const profile = action.payload;
      state.payment.paymentDate = profile.paymentDate;
      state.payment.amount = profile.amount;
      state.payment.paymentMethod = profile.paymentMethod;
      state.payment.reservationID = profile.reservationID;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // getPayments  in progress case
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
      })
      // get Payments sucessfull  case
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.payments = action.payload;
      })
      //  error getting Payments case
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getpayment  in progress case
      .addCase(getPayment.pending, (state) => {
        state.isLoading = true;
      })
      // get payment sucessfull  case
      .addCase(getPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.payment = action.payload;
      })
      //  error getting payment case
      .addCase(getPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update payment  in progress case
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
      })
      // update payment sucessfull  case
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.payment = action.payload;
      })
      //  error updating payment case
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete payment  in progress case
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
      })
      // delete Payments sucessfull  case
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.payments = state.payments.filter(
          (payment) => payment._id !== action.payload._id
        );
        toast.success("Payment Deleted Sucessfully");
      })
      //  error deleting payment case
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.payment.isLoading;
export const selectPayment = (state) => state.payment.payment;

export const { SAVE_PAYMENT } = paymentSlice.actions;

export default paymentSlice.reducer;
