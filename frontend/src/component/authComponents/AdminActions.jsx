import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { asyncDeleteMovieAction } from "../../redux/actions/movies.action";
import { useDispatch, useSelector } from "react-redux";

const AdminActions = ({ isAdmin ,movie}) => {
    const {page,limit}=useSelector((state)=>state.movies)
const dispatch=useDispatch();
  const Navigate = useNavigate();
  const deleteHandler = () => {
    dispatch(asyncDeleteMovieAction({ id: movie._id, page, limit }));
  };
  const updateHandler = () => {
    Navigate(`/admin/update-movie/${movie._id}`);
  };

  return (
    <>
      {" "}
      <Button
        size="small"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        disabled={!isAdmin}
        onClick={deleteHandler}
      >
        {" "}
        Delete{" "}
      </Button>{" "}
      <Button
        size="small"
        variant="contained"
        color="primary"
        disabled={!isAdmin}
        onClick={updateHandler}
      >
        Update
      </Button>
    </>
  );
};

export default AdminActions;
