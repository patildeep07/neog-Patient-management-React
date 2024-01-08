import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWardAsync } from "./wardSlice";

export const WardDetails = () => {
  const navigate = useNavigate();
  const { wardId } = useParams();
  const dispatch = useDispatch();

  // console.log({ wardId });

  const wardsData = useSelector((state) => state.wards);

  const ward = wardsData.wards.find((ward) => ward._id === wardId);

  // console.log({ ward });

  if (!ward) {
    return (
      <div>
        <h3>Ward not found</h3>.
      </div>
    );
  }

  const handleDeleteButton = (id) => {
    dispatch(deleteWardAsync(id));
    navigate("/wards");
  };

  return (
    <div>
      <h2>Ward details</h2>
      <p>Ward number: {ward.wardNumber}</p>
      <p>Capacity: {ward.capacity}</p>
      <p>Specialisation: {ward.specialisation}</p>

      <div>
        <Link to={`/wards/edit/${ward._id}`} state={ward}>
          Edit Details
        </Link>
      </div>

      <button onClick={() => handleDeleteButton(ward._id)}>Delete</button>

      {/* End */}
    </div>
  );
};
