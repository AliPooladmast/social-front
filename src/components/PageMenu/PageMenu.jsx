import {
  HowToReg,
  Login,
  Logout,
  PlaylistAddCheck,
  Work,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { userRequest } from "../../requestMethods";

const PageMenu = ({
  ItemClassName,
  TitlesClassName,
  SelectedClassName,
  currentUser,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    userRequest.defaults.headers.token = "";
  };

  return (
    <>
      <div
        className={`${ItemClassName} ${
          location.pathname === "/" ? SelectedClassName : ""
        }`}
        onClick={() => navigate("/")}
      >
        <span className={TitlesClassName}>Jobs</span>
        <Work />
      </div>

      {currentUser ? (
        <>
          <div
            className={`${ItemClassName} ${
              location.pathname === "/applications" ? SelectedClassName : ""
            }`}
            onClick={() => navigate("/applications")}
          >
            <span className={TitlesClassName}>Applications</span>
            <PlaylistAddCheck />
          </div>

          <div
            className={`${ItemClassName} ${
              location.pathname === "/login" ? SelectedClassName : ""
            }`}
            onClick={handleLogout}
          >
            <span className={TitlesClassName}>Logout</span>
            <Logout />
          </div>
        </>
      ) : (
        <>
          <div
            className={`${ItemClassName} ${
              location.pathname === "/register" ? SelectedClassName : ""
            }`}
            onClick={() => navigate("/register")}
          >
            <span className={TitlesClassName}>Register</span>
            <HowToReg />
          </div>

          <div
            className={`${ItemClassName} ${
              location.pathname === "/login" ? SelectedClassName : ""
            }`}
            onClick={() => navigate("/login")}
          >
            <span className={TitlesClassName}>Sign In</span>
            <Login />
          </div>
        </>
      )}
    </>
  );
};

export default PageMenu;
