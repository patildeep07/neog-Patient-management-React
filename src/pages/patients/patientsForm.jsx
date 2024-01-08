import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWards } from "../ward/wardSlice";
import { addPatientAsync, updatePatientAsync } from "./patientSlice";

export const PatientsForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  // Ward details
  const wardsData = useSelector((state) => state.wards);
  const { wards, status: wardStatus } = wardsData;

  useEffect(() => {
    if (wardStatus === "idle") {
      dispatch(fetchWards());
    }
  }, [wardStatus, dispatch]);

  // Patient form

  const patient = state ? state : null;

  const [newPatient, setNewPatient] = useState({
    name: patient ? patient.name : "",
    age: patient ? patient.age : "",
    gender: patient ? patient.gender : "",
    contact: patient ? patient.contact : "",
    ward: patient ? patient.ward.wardNumber : ""
  });

  // Button handler

  const submitButtonHandler = () => {
    if (patient) {
      const wardDetails = wards.find(
        (ward) => ward.wardNumber === newPatient.ward
      );
      const wardId = wardDetails?._id;

      const patientToBeUpdated = {
        ...newPatient,
        ward: wardId
      };

      dispatch(
        updatePatientAsync({
          id: patient._id,
          updatedPatient: patientToBeUpdated
        })
      );
      navigate("/patients");
    } else {
      const { name, age, gender, contact, ward } = newPatient;

      if (ward && name && age && gender && contact) {
        const wardDetails = wards.find(
          (ward) => ward.wardNumber === newPatient.ward
        );
        const wardId = wardDetails?._id;

        const patientToBeAdded = {
          ...newPatient,
          ward: wardId
        };

        dispatch(addPatientAsync(patientToBeAdded));
        setNewPatient({
          name: patient ? ward.name : "",
          age: patient ? patient.age : "",
          gender: patient ? patient.gender : "",
          contact: patient ? patient.contact : "",
          ward: patient ? patient.ward.wardNumber : ""
        });
        navigate("/patients");
      } else {
        alert("Fill all details");
      }
    }
  };

  return (
    <div>
      <h2>{patient ? "Edit Patient" : "Add Patient"}</h2>

      <div className="flex-row gap-10px">
        <h4>Name:</h4>
        <input
          type="text"
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              name: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Age:</h4>
        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              age: Number(e.target.value)
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Gender:</h4>
        <input
          type="text"
          placeholder="Male / Female"
          value={newPatient.gender}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              gender: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Contact:</h4>
        <input
          type="number"
          placeholder="Contact"
          value={newPatient.contact}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              contact: Number(e.target.value)
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Ward number:</h4>
        <input
          type="number"
          placeholder="Ward number"
          value={newPatient.ward}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              ward: Number(e.target.value)
            })
          }
        />
      </div>

      <button onClick={submitButtonHandler}>
        {patient ? "Update details" : "Add patient"}
      </button>

      {/* end */}
    </div>
  );
};
