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
        <div open className={!props.hazardous ? classes.modal : classes.hazardousModal}>
            {props.children}
        </div>
    );
};

function Modal({ onClose, onSubmit, children, hazardous }) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdropRootEl)}
            {ReactDOM.createPortal(
                <ModalOverlay hazardous={hazardous}>
                    {children}
                </ModalOverlay>,
                modalRootEl
            )}
        </Fragment>
    );
}

export default Modal;