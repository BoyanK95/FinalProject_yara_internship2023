import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './Warehouses.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { displayDateHandler } from '../../hooks/displayDateHandler';

function WarehousesCard({ children, title, image, backUpSrc, hazardous, location, storage, createdAt, updatedAt }) {
    const [showDetails, setShowDetails] = useState(false);

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
    }

    function editHandler() {}

    return (
        <Card className={classes.card}>
            {!image ? <Card.Img variant='top' src={backUpSrc} /> : <img src={image} alt={title} />}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {children && <Card.Text>{children}</Card.Text>}
                {!children && <p>There is no description for this item!</p>}
                <Card.Text>Location: {location}</Card.Text>
                <Button variant='outline-primary' onClick={detailsToggleHandler}>
                    Details
                </Button>
            </Card.Body>
            {showDetails && (
                <Modal onClose={detailsToggleHandler}>
                    {!image ? <Card.Img variant='top' src={backUpSrc} /> : <img src={image} alt={title} />}
                    <Card>
                        <Card.Body className='centered'>
                            <Card.Title>{title}</Card.Title>
                            <br />
                            <Card.Text className={classes.storage}>Storage: {storage} capacity</Card.Text>
                            <Card.Text className={classes.storage}>Location: {location} </Card.Text>
                            {children && <Card.Text>{children}</Card.Text>}
                            {!children && <p>There is no description for this item!</p>}
                            <div className={classes.dateContainer}>
                                <p>Create at: {displayDateHandler(createdAt)}</p>
                                <p>Updated at: {displayDateHandler(updatedAt)}</p>
                            </div>
                            <div>
                                <Button style={{ margin: '1rem' }} variant='warning' onClick={editHandler}>
                                    Edit
                                </Button>
                                <Button
                                    style={{ margin: '1rem' }}
                                    variant='outline-danger'
                                    onClick={detailsToggleHandler}
                                >
                                    Close
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal>
            )}
        </Card>
    );
}

export default WarehousesCard;
