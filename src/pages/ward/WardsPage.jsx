import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchWards } from "./wardSlice";

export const WardsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wardsData = useSelector((state) => state.wards);

  const { wards, status, error } = wardsData;

  // console.log({ wardsData });

  // Retrieving ward info

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Wards</h2>
      {error && <h4>Error: {error}</h4>}
      {/* Ward details */}

      {!error && (
        <div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Ward number</th>
                <th>Capacity</th>
                <th>Specialisation</th>
              </tr>
            </thead>
            <tbody>
              {wards.map(({ _id, wardNumber, capacity, specialisation }) => {
                return (
                  <tr
                    className="cursor"
                    key={_id}
                    onClick={() => navigate(`/wards/${_id}`)}
                  >
                    <th>{wardNumber}</th>
                    <th>{capacity}</th>
                    <th>{specialisation}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add a new ward */}
      <button onClick={() => navigate("/wards/add")}>Add ward</button>
    </div>
  );
};
