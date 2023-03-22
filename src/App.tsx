import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { forwardRef, Suspense, useEffect, lazy } from "react";
import MuiAlert from "@mui/material/Alert";
import {
  AlertColor,
  AlertProps,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "./redux/uxSlice";
import { RootState } from "./redux/store";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const JobList = lazy(() => import("./pages/JobList/JobList"));
const Job = lazy(() => import("./pages/Job/Job"));
const User = lazy(() => import("./pages/User/User"));

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { message, loading: uxLoading } = useSelector(
    (state: RootState) => state.ux
  );
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setMessage({ type: "info", text: null }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {message?.text && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(message)}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={message?.type as AlertColor | undefined}
            sx={{ width: "100%" }}
          >
            {message?.text}
          </Alert>
        </Snackbar>
      )}

      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={uxLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Suspense
        fallback={
          <Backdrop sx={{ color: "#fff", zIndex: 10 }} open>
            <span style={{ marginRight: "20px" }}>Please Wait...</span>
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <Routes>
          <Route path="/" element={<JobList />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/job" element={<Job />}>
            <Route path=":id" element={<Job />} />
          </Route>

          <Route
            path="/user"
            element={currentUser ? <User /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
