import { useEffect, useState } from "react";
import style from "./Job.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMessage } from "../../redux/uxSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { LinearProgressWithLabel } from "../../components/LinearProgress/LinearProgress";
import { addApplication } from "../../redux/apiCalls";
import useUpdate from "../../hook/useUpdate";

const storage = getStorage(app);

const Job = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.pathname?.split("/")?.[2];
  const { success } = useSelector((state) => state.application);

  const [job, setJob] = useState({});
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setProgress(0);
    setFile("");

    const getJob = async () => {
      dispatch(setLoading(true));
      try {
        const res = await publicRequest.get("/jobs/find/" + id);
        if (res) {
          setJob(res.data);
          dispatch(setLoading(false));
        }
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };
    getJob();
  }, [id, dispatch]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(setMessage({ type: "error", text: error.code?.toString() }));
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
        });
      }
    );
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    const application = { jobId: job._id, resumeLink: file };
    addApplication(dispatch, application);
  };

  useUpdate(() => {
    success && navigate("/");
  }, [success]); //eslint-disable-line

  return (
    <div className={style.Container}>
      <NavBar />
      <div className={style.JobContainer}>
        <div className={style.Wrapper}>
          <div className={style.FileContainer}>
            <img src={job.img} alt="job" />
          </div>
          <div className={style.InfoContainer}>
            <h1>{job.title}</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quam eveniet voluptates quisquam nostrum molestias quas labore
              deserunt delectus architecto nobis aut temporibus consectetur iste
              voluptatem reiciendis, id laudantium distinctio. Sit deserunt
              soluta quaerat impedit est quis iste, ea a cum! Fuga quasi officia
              ad repudiandae maiores perspiciatis, corporis sapiente aliquam
              dicta dolores odio architecto id delectus, sunt consectetur
              quisquam.
            </p>
            <span>Location: {job.location?.name}</span>

            <div className={style.File}>
              <label htmlFor="cv">Resume: </label>
              <input type="file" id="cv" onChange={handleFile} accept=".pdf" />

              {Boolean(progress) && progress !== 100 ? (
                <LinearProgressWithLabel value={progress} />
              ) : Boolean(progress) && progress === 100 ? (
                <div className={style.Uploaded}>File Uploaded</div>
              ) : null}
            </div>

            <div className={style.AddContainer}>
              <button onClick={handleAddClick} disabled={!job || file === ""}>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
