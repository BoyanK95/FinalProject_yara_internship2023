import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { displayDateHandler } from '../../hooks/displayDateHandler';

function ProductCard({id, children, title, image, hazardous, unit, quantity, createdAt, updatedAt, backUpSrc }) {
    const [showDetails, setShowDetails] = useState(false);

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
    }

    function editHandler() {}

    function deleteProductHandler() {
        const confirmDelete = window.confirm(`Are you sure you want to delete the product with title: ${title}?`);
        if (confirmDelete) {
            return fetch(`http://localhost:3001/products/${id}`, {
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
        <Card className={classes.card}>
            {!image ? <Card.Img variant='top' src={backUpSrc} /> : <img src={image} alt={title} />}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {children && <Card.Text>{children}</Card.Text>}
                {!children && <p>There is no description for this item!</p>}
                <Card.Text></Card.Text>
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
                            <Card.Text className={classes.quantity}>
                                Quantity: {quantity} / {unit}
                            </Card.Text>
                            {children && <Card.Text>{children}</Card.Text>}
                            {!children && <p>There is no description for this item!</p>}
                            <div className={classes.dateContainer}>
                                <p>Create at: {displayDateHandler(createdAt)}</p>
                                <p>Updated at: {displayDateHandler(updatedAt)}</p>
                            </div>
                            <div className={classes.btnContainer}>
                                <Button style={{ margin: '0.5rem' }} variant='warning' onClick={editHandler}>
                                    Edit
                                </Button>
                                <Button
                                    style={{ margin: '0.5rem' }}
                                    variant='outline-primary'
                                    onClick={detailsToggleHandler}
                                >
                                    Close
                                </Button>
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
