import React from 'react';
import { ProductBuyersData } from './ProductBuyersData';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';

function ProductBuyersTable() {
    return (

        <Container className="justify-content-center" itemName="m-5" >
            <div>
                <Table className="table" responsive>

                    <thead>
                        <tr style={{ width: '500px' }}>
                            <th className="text-secondary">NAME</th>
                            <th className="text-secondary">COUNT</th>
                            <th className="text-secondary">DATE OF PURCHASE</th>
                            <th className="text-secondary">MODE OF TRANSACTION</th>
                            <th className="text-secondary">ORDER ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ProductBuyersData.map(({ id, name, count, dateOfPurchase, modeOfTransaction, orderNumber }) => (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{count}</td>
                                <td>{dateOfPurchase}</td>
                                <td>{modeOfTransaction}</td>
                                <td>{orderNumber}</td>
                            </tr>
                        )
                        )}
                    </tbody>

                </Table>
            </div>
        </Container>
    );
}

export default ProductBuyersTable;
