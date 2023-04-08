import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './Warehouses.module.css'
import { useState } from 'react';

function WarehousesCard({ children, title, image, backUpSrc }) {
    const [showDetails, setShowDetails] = useState(false)

    function detailsToggler() {
        setShowDetails(!showDetails)
    }

    return (
        <Card className={classes.card}>
            {!image ? (
                <Card.Img variant='top' src={backUpSrc} />
            ) : (
                <img src={image} alt={title} />
            )}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {children && <Card.Text>{children}</Card.Text>}
                {!children && <p>There is no description for this item!</p>}
                <Card.Text></Card.Text>
                <Button variant='outline-primary' onClick={detailsToggler}>Details</Button>
            </Card.Body>
        </Card>
    );
}

export default WarehousesCard;
