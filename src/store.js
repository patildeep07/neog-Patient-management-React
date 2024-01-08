import { configureStore } from "@reduxjs/toolkit";
import { WardSlice } from "./pages/ward/wardSlice";
import { PatientSlice } from "./pages/patients/patientSlice";

export default configureStore({
  reducer: {
    wards: WardSlice.reducer,
    patients: PatientSlice.reducer
  }
});
