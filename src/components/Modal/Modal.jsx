import { Close } from "@mui/icons-material";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import style from "./modal.module.scss";

const portalElement = document.getElementById("modal");

const Modal = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose} />
      {ReactDOM.createPortal(
        <div
          className={style.Modal}
          style={{
            height: props.height,
            top: `calc((100% - ${props.height})/2)`,
          }}
        >
          <div className={style.Header}>
            <h1>{props.title}</h1>
            <div className={style.IconContainer} onClick={props.onClose}>
              <Close className={style.CloseIcon} />
            </div>
          </div>
          <div className={style.Children}>{props.children}</div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default Modal;
