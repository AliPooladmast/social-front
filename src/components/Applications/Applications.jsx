import style from "./applications.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getApplications } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Applications = () => {
  const dispatch = useDispatch();
  const { applications, isFetching } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    getApplications(dispatch);
  }, []); //eslint-disable-line

  const columns = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <span>{params.row.location.name}</span>
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Application Date",
      minWidth: 90,
      flex: 2,
      renderCell: (params) => {
        const date = params.row.createdAt.split("T")?.[0];
        const time = params.row.createdAt.split("T")?.[1];
        const cleanTime = time.split(".")?.[0];
        return (
          <>
            <span style={{ marginRight: "20px" }}>{date}</span>
            <span>{cleanTime}</span>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 110,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <span
              className={style.Edit}
              style={{
                backgroundColor:
                  params.row.status !== "applied" ? "#3bb077" : "darkBlue",
              }}
            >
              {params.row.status}
            </span>
          </>
        );
      },
    },
  ];

  return (
    <div className={style.Wrapper}>
      <div className={style.Container}>
        <div className={style.Title}>
          <h1>Applications List</h1>
        </div>

        <DataGrid
          rows={isFetching ? [] : applications}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default Applications;
