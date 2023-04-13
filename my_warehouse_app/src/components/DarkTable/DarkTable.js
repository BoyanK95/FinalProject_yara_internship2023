import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { url } from '../../constants/url';

function DarkExample({ data }) {
    return (
        <Table striped bordered hover variant='dark'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Count</th>
                    <th>Created at</th>
                    <th>Last updated</th>
                </tr>
            </thead>
            <tbody>
                {data.map((movement) => {
                    const { productData: product } = axios.get(`${url}/products/${movement.product.id}`);
                    return (
                        <tr key={movement.id}>
                            <td>{product?.name}</td>
                            <td>{movement.count}</td>
                            <td>{movement.createdAt}</td>
                            <td>{movement.updatedAt}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default DarkExample;
