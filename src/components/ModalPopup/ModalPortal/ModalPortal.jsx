import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import './ModalPortal.css';

const ModalPortal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <>
          <Backdrop onClick={props.onClick} show={props.show} />
          {props.children}
        </>,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default ModalPortal;
