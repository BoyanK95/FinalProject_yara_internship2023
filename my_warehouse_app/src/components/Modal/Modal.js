import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { FaBiohazard } from 'react-icons/fa';
import classes from './Modal.module.css';

const backdropRootEl = document.getElementById('backdrop-root');
const modalRootEl = document.getElementById('modal-root');

const Backdrop = ({ onClose }) => {
    return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div open className={!props.hazardous ? classes.modal : classes.hazardousModal}>
            {props.hazardous && (
                <div>
                    <FaBiohazard style={{ margin: '1rem' }} size={40} />
                    <h4 style={{ fontWeight: '800' }}>Hazardous!</h4>
                </div>
            )}
            <div>{props.children}</div>
        </div>
    );
};

function Modal({ onClose, onSubmit, children, hazardous }) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdropRootEl)}
            {ReactDOM.createPortal(<ModalOverlay hazardous={hazardous}>{children}</ModalOverlay>, modalRootEl)}
        </Fragment>
    );
}

export default Modal;
