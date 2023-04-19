import Table from 'react-bootstrap/Table';
import { readableDate } from '../../hooks/displayHumanReadableDate';
import classes from './DarkTable.module.css'

function DarkExample({ data }) {
    console.log(data);

    return (
        <Table className={classes.table} striped bordered hover variant='dark'>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Count</th>
                    <th>Created at</th>
                    <th>Last updated</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.count}</td>
                        <td>{readableDate(item.createdAt)}</td>
                        <td>{readableDate(item.updatedAt)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DarkExample;
