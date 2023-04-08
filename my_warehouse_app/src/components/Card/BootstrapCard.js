import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BootsrapCard({children, title}) {
  return (
    <Card style={{ width: '18rem', }}>
      <Card.Img variant="top" src="https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {children}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BootsrapCard;