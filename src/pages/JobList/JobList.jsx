import Jobs from "../../components/Jobs/Jobs";
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import style from "./JobList.module.scss";
import { Cancel, Search } from "@mui/icons-material";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { setLoading, setMessage } from "../../redux/uxSlice";

const JobList = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [industries, setIndustries] = useState([]);

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFilters({});
    setSearch("");
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        dispatch(setLoading(true));
        const res = await publicRequest.get("/locations");

        if (res) {
          setLocations(res.data);
          dispatch(setLoading(false));
        }
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };

    const getIndustries = async () => {
      try {
        dispatch(setLoading(true));
        const res = await publicRequest.get("/industries");

        if (res) {
          setIndustries(res.data);
          dispatch(setLoading(false));
        }
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };

    getLocations();
    getIndustries();
  }, [dispatch]);

  return (
    <div className={style.Container}>
      <NavBar />
      <div className={style.FilterContainer}>
        <div className={style.FilterItem}>
          <span className={style.FilterTitle}>Filter Jobs</span>

          <div className={style.JobFiltersContainer}>
            <select
              name="location"
              id="locations-select"
              onChange={handleFilters}
              value={filters?.location || ""}
              className={style.FilterSelect}
            >
              <option value="location" hidden>
                Location
              </option>

              {locations?.map((item) => (
                <option value={item.name} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              name="industry"
              id="industry-select"
              onChange={handleFilters}
              value={filters.industry || ""}
              className={style["FilterSelect--Industry"]}
            >
              <option value="industry" hidden>
                Industry
              </option>

              {industries?.map((item) => (
                <option value={item.name} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={style.FilterItem}>
          <span className={style.FilterTitle}>Search Jobs</span>

          <div className={style.SearchContainer}>
            <input
              className={style.Input}
              placeholder="Search"
              name="title"
              value={search?.target?.value || ""}
              onChange={(e) => setSearch(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFilters(search);
                }
              }}
            />
            <Search
              className={style.Search}
              onClick={() => handleFilters(search)}
            />
          </div>
        </div>

        <div className={style.FilterItem}>
          <span className={style.FilterTitle}>Sort Job</span>
          <select
            name="sort"
            id="sort-select"
            defaultValue="newset"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            className={style.FilterSelect}
          >
            <option value="newest">Newest</option>
            <option value="name">Name (Alphabetic)</option>
          </select>
        </div>

        <div className={style.FilterItem}>
          {(filters?.title || filters?.location || filters?.industry) && (
            <div className={style.Reset} onClick={handleReset}>
              <Cancel className={style.Cancel} />
              <span>reset filters</span>
            </div>
          )}
        </div>
      </div>

      <div className={style.Jobs}>
        <Jobs filters={filters} sort={sort} />
      </div>
    </div>
  );
};

export default JobList;
