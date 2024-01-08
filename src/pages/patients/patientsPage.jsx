import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "./patientSlice";

export const PatientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patientsData = useSelector((state) => state.patients);

  const { patients, status, error } = patientsData;

  console.log({ patients });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Patients</h2>
      {error && <h4>Error: {error}</h4>}

      {/* Patient view */}
      {!error && (
        <div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Ward number</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(({ _id, name, age, gender, contact, ward }) => {
                return (
                  <tr
                    className="cursor"
                    key={_id}
                    onClick={() => navigate(`/patients/${_id}`)}
                  >
                    <th>{name}</th>
                    <th>{age}</th>
                    <th>{gender}</th>
                    <th>{contact}</th>
                    <th>{ward.wardNumber}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add a new patient */}
      <button onClick={() => navigate("/patients/add")}>Add patient</button>

      {/* End */}
    </div>
  );
};
