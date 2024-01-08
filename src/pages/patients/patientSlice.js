import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

// Functions

// 1. Get patient details

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(
      "https://neog-patient-management.onrender.com/patients",
    );

    return response.data.patients;
  },
);

// 2. Add patients

export const addPatientAsync = createAsyncThunk(
  "patients/addPatientAsync",
  async (newPatient) => {
    const response = await axios.post(
      "https://neog-patient-management.onrender.com/patients",
      newPatient,
    );

    return response.data.patient;
  },
);

// 3. Update patient

export const updatePatientAsync = createAsyncThunk(
  "patients/updatePatientAsync",
  async ({ id, updatedPatient }) => {
    console.log({ id, updatedPatient });
    const response = await axios.put(
      `https://neog-patient-management.onrender.com/patients/${id}`,
      updatedPatient,
    );

    console.log({ response });
    return response.data.patient;
  },
);

// 4. Delete patient

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async (id) => {
    const response = await axios.delete(
      `https://neog-patient-management.onrender.com/patients/${id}`,
    );

    console.log({ response });
    return response.data.patient;
  },
);

// Patient Slice

export const PatientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    // Get patients
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";

      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Add patient
    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";

      state.patients = [...state.patients, action.payload];
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // Update patient
    [updatePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;

      state.patients = state.patients.map((patient) => {
        if (patient._id === updatedPatient._id) {
          return { ...updatedPatient };
        } else {
          return patient;
        }
      });
    },
    [updatePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      // console.log(error);
      state.error = action.error.message;
    },

    // Delete patient
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id,
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    // End extra reducers
  },
});

export default PatientSlice.reducer;
