import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const backdropRootEl = document.getElementById('backdrop-root');
const modalRootEl = document.getElementById('modal-root');

const Backdrop = ({ onClose }) => {
    return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div open className={classes.modal}>
            {props.children}
        </div>
    );
};

function Modal({ onClose, onSubmit,children }) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdropRootEl)}
            {ReactDOM.createPortal(
                <ModalOverlay>
                    {children}
                </ModalOverlay>,
                modalRootEl
            )}
        </Fragment>
    );
}

export default Modal;