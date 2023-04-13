import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { displayDateHandler } from '../../hooks/displayDateHandler';
import CustomInput from '../CustomInput/CustomInput';
import SelectInput from '../HazardousSelectInput/SelectInput';
import useInput from '../../hooks/use-input';
import isNotEmpty from '../../hooks/isNotEmpty';
import { url } from '../../constants/url';

function ProductCard({ id, children, title, image, hazardous, unit, quantity, createdAt, updatedAt, backUpSrc }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [titleValue, setTitleValue] = useState(title);
    const [unitValue, setUnitValue] = useState(unit);
    const [qtyValue, setQtyValue] = useState(unit);
    const [imageValue, setImageValue] = useState(backUpSrc || image || '');
    const {
        value: hazardousInput,
        // isValid: hazardousInputIsValid,
        hasError: hazardousInputHasError,
        valueChangeHandler: hazardousInputHandler,
        inputBlurHandler: hazardousInputBlurHandler
        // reset: resetHazardousInput
    } = useInput(isNotEmpty);

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
    }

    function editToggleHandler() {
        setEditMode(!editMode);
    }

    function sendEditHandler() {
        console.log();
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
                <Card.Text></Card.Text>
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
                                        blurHandler={hazardousInputBlurHandler}
                                        inputHandler={hazardousInputHandler}
                                        hasError={hazardousInputHasError}
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
                            {children && <Card.Text>{children}</Card.Text>}
                            {!children && <p>There is no description for this item!</p>}
                            <div className={classes.dateContainer}>
                                <p>Create at: {displayDateHandler(createdAt)}</p>
                                <p>Updated at: {displayDateHandler(updatedAt)}</p>
                            </div>
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
