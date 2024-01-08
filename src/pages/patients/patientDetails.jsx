import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePatientAsync } from "./patientSlice";

export const PatientDetails = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const dispatch = useDispatch();

  // console.log({ patientId });

  const patientsData = useSelector((state) => state.patients);

  // console.log({ patientsData });

  const patient = patientsData.patients.find(
    (patient) => patient._id === patientId
  );

  // console.log({ patient });

  if (!patient) {
    return (
      <div>
        <h3>Patient not found</h3>.
      </div>
    );
  }

  const handleDeleteButton = (id) => {
    dispatch(deletePatientAsync(id));
    navigate("/patients");
  };

  return (
    <div>
      <h2>Patient details</h2>
      <p>Name: {patient.name}</p>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Contact: {patient.contact}</p>
      <p>Ward number: {patient.ward.wardNumber}</p>

      <div>
        <Link to={`/patients/edit/${patient._id}`} state={patient}>
          Edit Details
        </Link>
      </div>

      <button onClick={() => handleDeleteButton(patient._id)}>Delete</button>

      {/* End */}
    </div>
  );
};
