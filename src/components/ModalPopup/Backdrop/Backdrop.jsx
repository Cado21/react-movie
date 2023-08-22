import React from 'react';
import './Backdrop.css';
import {CSSTransition} from 'react-transition-group';

const Backdrop = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={{enter: 800, exit: 300}}
      classNames="Backdrop"
    >
      <div className="Backdrop" onClick={props.onClick} />
    </CSSTransition>
  );
};

export default Backdrop;
