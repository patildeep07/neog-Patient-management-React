import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWardAsync, updateWardAsync } from "./wardSlice";

export const WardsForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const ward = state ? state : null;

  // Available specialisation
  const availableSpecialisation = [
    "General Practice",
    "Emergency",
    "ICU",
    "Nursery"
  ];

  const [newWard, setNewWard] = useState({
    wardNumber: ward ? ward.wardNumber : "",
    capacity: ward ? ward.capacity : "",
    specialisation: ward ? ward.specialisation : "General Practice"
  });

  const submitButtonHandler = () => {
    if (ward) {
      dispatch(updateWardAsync({ id: ward._id, updatedWard: newWard }));
      navigate("/wards");
    } else {
      const { wardNumber, capacity } = newWard;

      if (wardNumber && capacity) {
        console.log({ newWard });
        dispatch(addWardAsync(newWard));
        setNewWard({
          wardNumber: ward ? ward.wardNumber : "",
          capacity: ward ? ward.capacity : "",
          specialisation: ward ? ward.specialisation : "General Practice"
        });
        navigate("/wards");
      } else {
        alert("Fill all details");
      }
    }
  };

  return (
    <div>
      <h2>{ward ? "Edit Ward" : "Add Ward"}</h2>

      <div className="flex-row gap-10px">
        <h4>Ward Number:</h4>
        <input
          type="number"
          placeholder="Ward Number"
          value={newWard.wardNumber}
          onChange={(e) =>
            setNewWard({
              ...newWard,
              wardNumber: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Capacity:</h4>
        <input
          type="number"
          placeholder="Capacity"
          value={newWard.capacity}
          onChange={(e) =>
            setNewWard({
              ...newWard,
              capacity: e.target.value
            })
          }
        />
      </div>

      <div className="flex-row gap-10px">
        <h4>Specialisation:</h4>
        <select
          value={newWard.specialisation}
          onChange={(e) =>
            setNewWard({
              ...newWard,
              specialisation: e.target.value
            })
          }
        >
          {availableSpecialisation.map((item, idx) => {
            return (
              <option value={item} key={idx}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <button onClick={submitButtonHandler}>
        {ward ? "Update details" : "Add ward"}
      </button>

      {/* End */}
    </div>
  );
};
