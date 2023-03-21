import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setMessage } from "../../redux/uxSlice";
import { publicRequest } from "../../requestMethods";
import JobItem from "../JobItem/JobItem";
import style from "./Jobs.module.scss";

const Jobs = ({ filters, sort }) => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCounts, setPageCounts] = useState(1);

  useEffect(() => {
    const getJobs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await publicRequest.get(
          `jobs?page=${page}` +
            `&location=${filters?.location || ""}` +
            `&industry=${filters?.industry || ""}` +
            `&title=${filters?.title || ""}` +
            `&sort=${sort || ""}`
        );

        if (res) {
          setJobs(res.data?.jobs);
          setPageCounts(res.data?.pageCounts);
          dispatch(setLoading(false));
        }
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };
    getJobs();
  }, [page, filters, sort, dispatch]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className={style.Container}>
        {jobs?.map((item) => (
          <JobItem item={item} key={item._id} />
        ))}
      </div>
      <div className={style.Pagination}>
        <Pagination
          count={pageCounts}
          color="secondary"
          showFirstButton
          showLastButton
          page={page}
          onChange={handlePage}
        />
      </div>
    </>
  );
};

export default Jobs;
