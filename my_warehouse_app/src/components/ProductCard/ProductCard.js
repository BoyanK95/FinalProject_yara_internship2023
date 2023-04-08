import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';

function ProductCard({ children, title, image, hazardous, unit, quantity, backUpSrc }) {
    const [showDetails, setShowDetails] = useState(false);

    function detailsToggleHandler() {
        setShowDetails(!showDetails);
    }
    console.log(hazardous);
    const divContainerClass = hazardous ? classes.hazardous : classes.normal

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
                <div >
                    <Modal className={divContainerClass} onClose={detailsToggleHandler}>
                        {!image ? <Card.Img variant='top' src={backUpSrc} /> : <img src={image} alt={title} />}
                        <Card>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>
                                    Quantity: {quantity} / {unit}
                                </Card.Text>
                                {children && <Card.Text>{children}</Card.Text>}
                                {!children && <p>There is no description for this item!</p>}
                                <Button variant='outline-danger' onClick={detailsToggleHandler}>
                                    Close
                                </Button>
                            </Card.Body>
                        </Card>
                    </Modal>
                </div>
            )}
        </Card>
    );
}

export default ProductCard;
