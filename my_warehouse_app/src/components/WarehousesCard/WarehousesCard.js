import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { displayDateHandler } from '../../hooks/displayDateHandler';
import { translateStringToNumber } from '../../hooks/translateStringToNumber';
import { translateStringToBoolean } from '../../hooks/translateStringToBoolean';
import classes from './Warehouses.module.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomTextarea from '../CustomTextarea/CustomTextarea';
import SelectInput from '../HazardousSelectInput/SelectInput';
import { url } from '../../constants/url';
import axios from 'axios';

function WarehousesCard({ id, children, title, image, backUpSrc, hazardous, location, storage, createdAt, updatedAt }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [titleValue, setTitleValue] = useState(title);
    const [locationValue, setLocationValue] = useState(location);
    const [storageValue, setStorageValue] = useState(storage);
    const [imageValue, setImageValue] = useState(image || backUpSrc || '');
    const [descriptionValue, setDescriptionValue] = useState(children || '');
    const [hazardousInput, setHazardousInput] = useState(hazardous);

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
        setEditMode(false);
    }

    function editToggleHandler() {
        setEditMode(!editMode);
    }

    async function sendEditHandler() {
        if (!locationValue || !storageValue || !titleValue) {
            return window.alert('You have to fill in all needed imputs!');
        }
        if (
            locationValue !== location ||
            storageValue !== storage ||
            titleValue !== title ||
            hazardousInput !== hazardous ||
            descriptionValue !== children
        ) {
            const updatedWarehouseData = {
                name: titleValue,
                picture: imageValue,
                location: locationValue,
                storage: translateStringToNumber(storageValue),
                hazardous: translateStringToBoolean(hazardousInput),
                description: descriptionValue
            };
            console.log(updatedWarehouseData);
            try {
                await axios.put(`${url}/warehouses/${id}`, updatedWarehouseData);
                setEditMode(false);
                window.location.reload();
                setShowDetails(false);
            } catch (error) {
                console.log(error);
                window.alert('There has been an error!' + error);
            }
        }
    }

    async function deleteWarehouseHandler() {
        const confirmDelete = window.confirm(`Are you sure you want to delete the warehouse with title: ${title}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`${url}/warehouses/${id}`);
                setShowDetails(false);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
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
                                        inputHandler={(e) => setHazardousInput(e.target.value)}
                                        // hasError={hazardousInputHasError}
                                    />
                                    <CustomInput
                                        label={'Image:'}
                                        type={'text'}
                                        value={imageValue}
                                        onChange={(e) => setImageValue(e.target.value)}
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
