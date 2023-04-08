import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './BootsrapCard.module.css';

function BootsrapCard({ children, title, image, backUpSrc }) {
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
                <Button variant='outline-primary'>Details</Button>
            </Card.Body>
        </Card>
    );
}

export default BootsrapCard;
