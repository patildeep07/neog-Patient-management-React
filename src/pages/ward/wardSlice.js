import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

// Functions

// 1. Get ward details

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(
    "https://neog-patient-management.onrender.com/wards",
  );

  return response.data.wards;
});

// 2. Add ward

export const addWardAsync = createAsyncThunk(
  "wards/addWardAsync",
  async (newWard) => {
    const response = await axios.post(
      "https://neog-patient-management.onrender.com/wards",
      newWard,
    );

    return response.data.ward;
  },
);

// 3. Delete ward

export const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    const response = await axios.delete(
      `https://neog-patient-management.onrender.com/wards/${id}`,
    );

    // console.log({ response });
    return response.data.ward;
  },
);

// 4. Update ward details

export const updateWardAsync = createAsyncThunk(
  "wards/updateWardAsync",
  async ({ id, updatedWard }) => {
    // console.log({ id, updatedWard });
    const response = await axios.put(
      `https://neog-patient-management.onrender.com/wards/${id}`,
      updatedWard,
    );

    console.log({ response });
    return response.data.ward;
  },
);

// Ward Slice

export const WardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    // Get wards
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";

      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },

    // Add new ward
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = [...state.wards, action.payload];
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Delete ward
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload._id,
      );
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Update ward
    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;

      state.wards = state.wards.map((ward) => {
        if (ward._id === updatedWard._id) {
          return { ...updatedWard };
        } else {
          return ward;
        }
      });
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      // console.log(error);
      state.error = action.error.message;
    },
  },
});

export default WardSlice.reducer;
