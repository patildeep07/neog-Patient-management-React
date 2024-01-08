import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "./patients/patientSlice";
import { fetchWards } from "./ward/wardSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const patientsData = useSelector((state) => state.patients);
  const { patients, status: patientStatus } = patientsData;

  const wardsData = useSelector((state) => state.wards);
  const { wards, status: wardStatus } = wardsData;

  useEffect(() => {
    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }
  }, [patientStatus, dispatch]);

  useEffect(() => {
    if (wardStatus === "idle") {
      dispatch(fetchWards());
    }
  }, [wardStatus, dispatch]);

  // console.log({ patients, wards });

  // Processing the data

  const totalPatients = patients.length;

  const totalCapacity = wards.reduce((acc, ward) => acc + ward.capacity, 0);
  const occupancyRate = (totalPatients / totalCapacity).toFixed(2);

  const topWard = wards.reduce(
    (acc, curr) => {
      const patientsInWard = patients.filter(
        ({ ward }) => ward.wardNumber === curr.wardNumber
      ).length;

      const occupancyRate = patientsInWard / curr.capacity;

      if (occupancyRate > acc.occupancyRate) {
        return { ...curr, occupancyRate };
      } else {
        return acc;
      }
    },
    { wardNumber: "-", occupancyRate: 0 }
  );

  // console.log({ totalPatients, occupancyRate, patients, topWard });

  return (
    <div>
      <h1>Hospital</h1>
      <p>Total patients: {totalPatients}</p>
      <p>Occupancy rate: {occupancyRate}%</p>
      <p>Top performing ward: Ward no. {topWard.wardNumber}</p>
    </div>
  );
};
