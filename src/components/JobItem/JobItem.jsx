import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import style from "./JobItem.module.scss";

const JobItem = ({ item }) => {
  return (
    <div className={style.Wrapper}>
      <div className={style.Container}>
        <div className={style.ImgContainer}>
          <img src={item.img} alt="" />
        </div>
        <div className={style.Info}>
          <div>
            <Link
              data-testid="item-page-link"
              to={`/job/${item._id}`}
              className={style.Link}
            >
              <SearchOutlined />
            </Link>
          </div>
        </div>
      </div>
      <div className={style.Title}>
        <div>{item.title}</div>
        <div className={style.Location}>@{item.location.name}</div>
      </div>
    </div>
  );
};

export default JobItem;
