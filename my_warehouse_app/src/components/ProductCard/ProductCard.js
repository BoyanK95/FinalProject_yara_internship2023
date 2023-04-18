import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { displayDateHandler } from '../../hooks/displayDateHandler';
import CustomInput from '../CustomInput/CustomInput';
import CustomTextarea from '../CustomTextarea/CustomTextarea';
import SelectInput from '../HazardousSelectInput/SelectInput';
import { url } from '../../constants/url';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { translateStringToNumber } from '../../hooks/translateStringToNumber';
import { translateStringToBoolean } from '../../hooks/translateStringToBoolean';

function ProductCard({ id, children, title, image, hazardous, unit, quantity, createdAt, updatedAt, backUpSrc }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [titleValue, setTitleValue] = useState(title);
    const [unitValue, setUnitValue] = useState(unit);
    const [qtyValue, setQtyValue] = useState(quantity);
    const [imageValue, setImageValue] = useState(backUpSrc || image || '');
    const [descriptionValue, setDescriptionValue] = useState(children || '');
    const [hazardousInput, setHazardousInput] = useState(hazardous)
   
    const history = useHistory();

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
        setEditMode(false)
    }

    function editToggleHandler() {
        setEditMode(!editMode);
    }

    async function sendEditHandler() {
        if (!titleValue || !unitValue || !qtyValue) {
            return window.alert('You have to fill in all needed imputs!')
        }
        const updatedProduct = {
            name: titleValue,
            picture: imageValue,
            quantity: translateStringToNumber(qtyValue),
            unit: translateStringToNumber(unitValue),
            description: descriptionValue,
            hazardous: translateStringToBoolean(hazardousInput)
        }
        console.log(updatedProduct);
        try {
            await axios.put(`${url}/products/${id}`, updatedProduct);
                history.push('/products');
                setEditMode(false);
                setShowDetails(false);
        } catch (error) {
            console.log(error);
            window.alert(`There has been an error! ${error}`)
        }
    }

    function deleteProductHandler() {
        const confirmDelete = window.confirm(`Are you sure you want to delete the product with title: ${title}?`);
        if (confirmDelete) {
            return fetch(`${url}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setShowDetails(false);
                    return response.json();
                })
                .catch((error) => {
                    console.error('There was a problem with the DELETE request:', error);
                });
        }
    }

    return (
        <Card className={!hazardous ? classes.card : classes.hazardousCard}>
            {!image ? <Card.Img variant='top' src={backUpSrc} /> : <img src={image} alt={title} />}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {children && <Card.Text>{children}</Card.Text>}
                {!children && <p>There is no description for this item!</p>}
                <Button variant='outline-primary' style={{ fontWeight: '700' }} onClick={detailsToggleHandler}>
                    Details
                </Button>
            </Card.Body>
            {showDetails && (
                <Modal hazardous={hazardous} onClose={detailsToggleHandler}>
                    {!image ? <Card.Img variant='top' src={backUpSrc} /> : <img src={image} alt={title} />}
                    <Card>
                        <Card.Body className='centered'>
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
                                        // blurHandler={hazardousInputBlurHandler}
                                        inputHandler={(e) => setHazardousInput(e.target.value)}
                                        // hasError={hazardousInputHasError}
                                    />
                                    <CustomInput
                                        label={'Image:'}
                                        type={'url'}
                                        value={imageValue}
                                        onChange={(e) => setImageValue(e.target.value)}
                                    />
                                </>
                            )}
                            {!editMode ? (
                                <Card.Text className={classes.quantity}>
                                    Quantity: {quantity} / {unit}
                                </Card.Text>
                            ) : (
                                <div className={classes.sizeContainer}>
                                    <div className={classes.unitContainer}>
                                        <CustomInput
                                            label={'Unit:'}
                                            type={'text'}
                                            value={unitValue}
                                            onChange={(e) => setUnitValue(e.target.value)}
                                        />
                                    </div>
                                    <div className={classes.qtyContainer}>
                                        <CustomInput
                                            label={'Quantity:'}
                                            type={'number'}
                                            value={qtyValue}
                                            onChange={(e) => setQtyValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {children && !editMode && <Card.Text>{children}</Card.Text>}
                            {!children && !editMode && <p>There is no description for this item!</p>}
                            {!editMode ? (
                                <div className={classes.dateContainer}>
                                    <p>Create at: {displayDateHandler(createdAt)}</p>
                                    <p>Updated at: {displayDateHandler(updatedAt)}</p>
                                </div>
                            ) : (
                                <CustomTextarea
                                    label={'Description'}
                                    type={'text'}
                                    value={descriptionValue}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                />
                            )}
                            <div className={classes.btnContainer}>
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
                                <Button style={{ margin: '0.5rem' }} variant='danger' onClick={deleteProductHandler}>
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

export default ProductCard;
