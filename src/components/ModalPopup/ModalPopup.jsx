import React, {useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import ModalPortal from './ModalPortal/ModalPortal';
import Modal from './Modal/Modal';

const ModalPopup = (props) => {
  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    bodyEl.style.overflow = props.show ? 'hidden' : 'auto'
  }, [props.show]);

  return (
    <ModalPortal onClick={props.onClickOutside} show={props.show}>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={{enter: 300, exit: 300}}
        classNames="Modal"
      >
        <Modal onClick={props.onClick}>
          {props.children}
        </Modal>
      </CSSTransition>
    </ModalPortal>
  )

};

export default ModalPopup;