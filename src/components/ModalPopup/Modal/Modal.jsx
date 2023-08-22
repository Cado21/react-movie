import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
    <div className="Modal" onClick={props.onClick}>
      {props.children}
    </div>
  );
};
export default Modal;
