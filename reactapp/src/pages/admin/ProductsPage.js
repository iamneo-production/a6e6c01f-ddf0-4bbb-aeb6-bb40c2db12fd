import React, { useEffect,useState } from 'react';
import { Table } from 'react-bootstrap';
import { TableData } from '../../components/buyer/DummyTableData';
import AdminNavigationBar from "../../components/admin/AdminNavigationBar";
import ProductsRemoveModal from '../../components/admin/ProductsRemoveModal';
import Footer from '../../components/common/Footer';
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../../features/productSlice";

export default function ProductsPage() {
    const [showRemove, setShowRemove] = useState(false);
    const handleShowRemoveModal = () => setShowRemove(true);
    const handleHideRemoveModal = () => setShowRemove(false);
    console.log(showRemove);
    const start = 0;
    const stop = 2;
    const allProductList = useSelector(state => state.product.allProductList)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchProduct({token:token}))
    },[])

    function handleDate(value){
        const date = new Date(value);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }

    return (
        <div>
            <AdminNavigationBar />
            <div className="d-flex justify-content-between">
                <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>PRODUCTS</b></h3>
                <button type="button" class="btn btn-primary" style={{ margin: "8px 10px", backgroundColor: "#B6D3FF", color: "black" }}><b>Go to users</b></button>
            </div>
            <br></br>
            <div style={{ padding: "0px 50px 50px 50px" }}>
                <Table>
                    <thead>
                        <tr>
                            <th className='text-secondary'>IMAGE</th>
                            <th className='text-secondary'>NAME</th>
                            <th className='text-secondary'>PRICE</th>
                            <th className='text-secondary'>QUANTITY</th>
                            <th className='text-secondary'>DATE ADDED</th>
                            <th className='text-secondary text-end'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProductList.map(({ id, image, name, price, quantity, createdAt }) => (
                            <tr key={id} >
                                <td>
                                    <img height={80} width={80} src={`data:image/jpeg;base64,${image}`} alt="" srcSet="" />
                                </td>
                                <td
                                    style={{ width: '500px' }}
                                >{name}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                                <td>{handleDate(createdAt)}</td>
                                <td>
                                    <div className='d-flex flex-row justify-content-end'>
                                        <button type="button" className="btn btn-danger" style={{ color: "black" }} onClick={() => { handleShowRemoveModal() }}><b>Remove</b></button>
                                        <ProductsRemoveModal productId={id} show={showRemove} handleHideRemoveModal={handleHideRemoveModal}></ProductsRemoveModal>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Footer/>
        </div>
    )
}