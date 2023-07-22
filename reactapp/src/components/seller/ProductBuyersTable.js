import React, {useEffect} from 'react';
import { ProductBuyersData } from './ProductBuyersData';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../../features/productSlice";
import moment from "moment";
import {fetchPurchaseByProduct} from "../../features/purchaseSlice";

function ProductBuyersTable(props) {
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchPurchaseByProduct({token: token, productId: props.productId}))
    },[])
    const purchaseListByProduct = useSelector(state => state.purchase.purchaseListByProduct)
    return (

        <Container className="justify-content-center" itemName="m-5" >
            <div>
                <Table className="table" responsive>

                    <thead>
                        <tr style={{ width: '500px' }}>
                            <th className="text-secondary">NAME</th>
                            <th className="text-secondary">QUANTITY</th>
                            <th className="text-secondary">DATE OF PURCHASE</th>
                            <th className="text-secondary">MODE OF TRANSACTION</th>
                            <th className="text-secondary">ORDER ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchaseListByProduct.map(({ id,buyer,quantity,purchaseDate,paymentMethod }) => (
                            <tr key={id}>
                                <td>{buyer.firstName} {buyer.lastName}</td>
                                <td>{quantity}</td>
                                <td>{moment(purchaseDate).format('LLL')}</td>
                                <td>{paymentMethod}</td>
                                <td>{id}</td>
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
