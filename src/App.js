import "./styles.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { WardsPage } from "./pages/ward/WardsPage";
import { WardsForm } from "./pages/ward/WardsForm";
import { WardDetails } from "./pages/ward/wardDetails";
import { PatientsPage } from "./pages/patients/patientsPage";
import { PatientsForm } from "./pages/patients/patientsForm";
import { PatientDetails } from "./pages/patients/patientDetails";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header>
        <h1 onClick={() => navigate("/")}>CareConnect </h1>
        <nav className="navBar">
          {/* <li onClick={() => navigate("/")}>Home</li> */}
          <li onClick={() => navigate("/patients")}>Patients</li>
          <li onClick={() => navigate("/wards")}>Wards</li>
          <li onClick={() => navigate("/")}>Hospital</li>
        </nav>
      </header>

      <div className="main-body">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Patients */}
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/add" element={<PatientsForm />} />
          <Route path="/patients/add" element={<PatientsForm />} />
          <Route path="/patients/edit/:patientId" element={<PatientsForm />} />
          <Route path="/patients/:patientId" element={<PatientDetails />} />

          {/* Wards */}
          <Route path="/wards" element={<WardsPage />} />
          <Route path="/wards/add" element={<WardsForm />} />
          <Route path="/wards/edit/:wardId" element={<WardsForm />} />
          <Route path="/wards/:wardId" element={<WardDetails />} />
        </Routes>
      </div>

      <br />
    </div>
  );
}
