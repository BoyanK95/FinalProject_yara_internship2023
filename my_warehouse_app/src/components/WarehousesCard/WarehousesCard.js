import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { displayDateHandler } from '../../hooks/displayDateHandler';
import classes from './Warehouses.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomTextarea from '../CustomTextarea/CustomTextarea';
import { useHistory } from 'react-router-dom';
import SelectInput from '../HazardousSelectInput/SelectInput';
import useInput from '../../hooks/use-input';
import isNotEmpty from '../../hooks/isNotEmpty';
import { url } from '../../constants/url';

function WarehousesCard({ id, children, title, image, backUpSrc, hazardous, location, storage, createdAt, updatedAt }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [titleValue, setTitleValue] = useState(title);
    const [locationValue, setLocationValue] = useState(location);
    const [storageValue, setStorageValue] = useState(storage);
    const [descriptionValue, setDescriptionValue] = useState(children || '');
    const {
        value: hazardousInput,
        // isValid: hazardousInputIsValid,
        hasError: hazardousInputHasError,
        valueChangeHandler: hazardousInputHandler,
        inputBlurHandler: hazardousInputBlurHandler
        // reset: resetHazardousInput
    } = useInput(isNotEmpty);

    const history = useHistory();

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
    }

    function editToggleHandler() {
        setEditMode(!editMode);
    }

    function sendEditHandler() {
        if (!locationValue || !storageValue) {
            return window.alert('You have to fill in Location and Storage!');
        }
        if (
            locationValue !== location ||
            storageValue !== storage ||
            titleValue !== title ||
            hazardousInput !== hazardous
        ) {
            console.log('Storage edited');
            console.log(titleValue, locationValue, storageValue, descriptionValue, hazardousInput);
            history.push('/warehouses');
            setEditMode(false);
            setShowDetails(false);
        }
    }

    function deleteWarehouseHandler() {
        const confirmDelete = window.confirm(`Are you sure you want to delete the warehouse with title: ${title}?`);
        if (confirmDelete) {
            return fetch(`${url}/warehouses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setShowDetails(false)
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
                            {!editMode ? (
                                <Card.Title>{title}</Card.Title>
                            ) : (
                                <CustomInput
                                    label={'Title:'}
                                    type={'text'}
                                    value={titleValue}
                                    onChange={(e) => setTitleValue(e.target.value)}
                                />
                            )}
                            {!editMode ? (
                                <br />
                            ) : (
                                <>
                                    <SelectInput
                                        label={'Hazardous:'}
                                        name={'hazardous'}
                                        value={hazardousInput}
                                        blurHandler={hazardousInputBlurHandler}
                                        inputHandler={hazardousInputHandler}
                                        hasError={hazardousInputHasError}
                                    />
                                    <CustomInput
                                        label={'Image:'}
                                        type={'text'}
                                        value={storageValue}
                                        onChange={(e) => setStorageValue(e.target.value)}
                                    />
                                </>
                            )}
                            {!editMode ? (
                                <Card.Text className={classes.storage}>Storage: {storage} capacity</Card.Text>
                            ) : (
                                <CustomInput
                                    label={'Storage:'}
                                    type={'number'}
                                    value={storageValue}
                                    onChange={(e) => setStorageValue(e.target.value)}
                                />
                            )}
                            {!editMode ? (
                                <Card.Text className={classes.storage}>Location: {location} </Card.Text>
                            ) : (
                                <CustomInput
                                    label={'Location:'}
                                    type={'text'}
                                    value={locationValue}
                                    onChange={(e) => setLocationValue(e.target.value)}
                                />
                            )}
                            {children && !editMode && <Card.Text>{children}</Card.Text>}
                            {!children && !editMode && <p>There is no description for this item!</p>}
                            {editMode && (
                                <CustomTextarea
                                    label={'Description'}
                                    type={'text'}
                                    value={descriptionValue}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                />
                            )}
                            {!editMode && (
                                <div className={classes.dateContainer}>
                                    <p>Create at: {displayDateHandler(createdAt)}</p>
                                    <p>Updated at: {displayDateHandler(updatedAt)}</p>
                                </div>
                            )}
                            <div>
                                <Button style={{ margin: '0.5rem' }} variant='warning' onClick={editToggleHandler}>
                                    {!editMode ? 'Edit' : 'Cancel'}
                                </Button>
                                {!editMode ? (
                                    <Button
                                        style={{ margin: '0.5rem' }}
                                        variant='outline-primary'
                                        onClick={detailsToggleHandler}
                                    >
                                        Close
                                    </Button>
                                ) : (
                                    <Button
                                        style={{ margin: '0.5rem', fontWeight: 700 }}
                                        variant='outline-success'
                                        onClick={sendEditHandler}
                                    >
                                        Save Edit
                                    </Button>
                                )}
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
