import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from '../Modal/Modal';
// import axios from 'axios';
import { displayDateHandler } from '../../hooks/displayDateHandler';
import classes from './Warehouses.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomTextarea from '../CustomTextarea/CustomTextarea';

function WarehousesCard({ id, children, title, image, backUpSrc, hazardous, location, storage, createdAt, updatedAt }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);

    console.log(editMode);
    function detailsToggleHandler() {
        setShowDetails(!showDetails);
    }

    function editToggleHandler() {
        setEditMode(!editMode);
    }

    function deleteWarehouseHandler() {
        const confirmDelete = window.confirm(`Are you sure you want to delete the warehouse with title: ${title}?`);
        if (confirmDelete) {
            return fetch(`http://localhost:3001/warehouses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error('There was a problem with the DELETE request:', error);
                });
        }
    }

    return (
        <Card className={!hazardous ? classes.card : classes.hazardousCard}>
            {!image ? (
                <Card.Img variant='top' src={backUpSrc} />
            ) : (
                <img className={classes.warehouseImg} src={image} alt={title} />
            )}
            <Card.Body className={classes.cardBody}>
                <Card.Title>{title}</Card.Title>
                {children && <Card.Text>{children}</Card.Text>}
                {!children && <p>There is no description for this item!</p>}
                <Card.Text>Location: {location}</Card.Text>
                <Button variant='outline-primary' style={{ fontWeight: '700' }} onClick={detailsToggleHandler}>
                    Details
                </Button>
            </Card.Body>
            {showDetails && (
                <Modal hazardous={hazardous} onClose={detailsToggleHandler}>
                    {!image ? (
                        <Card.Img variant='top' src={backUpSrc} />
                    ) : (
                        <img className={classes.warehouseImg} src={image} alt={title} />
                    )}
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <br />
                            {!editMode ? (
                                <Card.Text className={classes.storage}>Storage: {storage} capacity</Card.Text>
                            ) : (
                                <CustomInput label={'Storage:'} type={'text'} />
                            )}
                            {!editMode ? (
                                <Card.Text className={classes.storage}>Location: {location} </Card.Text>
                            ) : (
                                <CustomInput label={'Location:'} type={'text'} />
                            )}
                            {children && !editMode && <Card.Text>{children}</Card.Text>}
                            {!children && !editMode && <p>There is no description for this item!</p>}
                            {editMode && <CustomTextarea label={'Description'} type={'text'} />}
                            {!editMode && (
                                <div className={classes.dateContainer}>
                                    <p>Create at: {displayDateHandler(createdAt)}</p>
                                    <p>Updated at: {displayDateHandler(updatedAt)}</p>
                                </div>
                            )}
                            <div>
                                <Button style={{ margin: '0.5rem' }} variant='warning' onClick={editToggleHandler}>
                                    {!editMode? 'Edit' : 'Cancel'}
                                </Button>
                                <Button
                                    style={{ margin: '0.5rem' }}
                                    variant='outline-primary'
                                    onClick={detailsToggleHandler}
                                >
                                    Close
                                </Button>
                                <Button style={{ margin: '0.5rem' }} variant='danger' onClick={deleteWarehouseHandler}>
                                    Delete
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
