import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ReviewModal from './ReviewModal';
import ViewReviewModal from './ViewReview';
import { Pagination } from '@mui/material';
import { pageSetter } from './PageSetter';
import { ReactComponent as PurchaseEmpty } from '../../assets/PurchaseEmpty.svg';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchase } from "../../features/purchaseSlice";
import { formatIndianNumbering } from "./numberFormatter";

const PurchaseTable = ({ data, handleRefresh }) => {

    const [reviewModal, setReviewModal] = useState(false);
    const [viewReviewModal, setViewReviewModal] = useState(false);
    const [purchaseId, setPurchaseId] = useState(null);
    const tableLines = 4;
    const charges = 50;
    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(tableLines);
    const [page, setPage] = useState(1);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPurchase({ token: token }))
    }, [])

    const purchaseList = useSelector((state) => state.purchase.purchaseList);
    console.log(purchaseList)

    const handlePageChange = (pageNumber) => {
        const { start, stop } = pageSetter(pageNumber, tableLines);
        setStart(start);
        setStop(stop);
    };

    const handleAddReview = (purchaseId) => {
        setPurchaseId(purchaseId);
        setReviewModal(true);
    };

    return (
        <div className='w-100 h5'>
            {purchaseList.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: -15 }} >
                    <div style={{ width: 400, height: 400 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h5 style={{ color: "grey" }}><b>Didn't purchased yet !</b></h5>
                        </div>
                        <PurchaseEmpty />
                    </div>
                </div>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th className='text-secondary'>Id</th>
                            <th className='text-secondary'>Image</th>
                            <th className='text-secondary'>Name</th>
                            <th className='text-secondary'>Price (₹)</th>
                            <th className='text-secondary'>Quantity</th>
                            <th className='text-secondary'>Order Date & Time</th>
                            <th className='text-secondary text-end'>Write a review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseList.length !== 0 &&
                            purchaseList.slice(start, stop).map(
                                (value, index) => (
                                    <tr key={index}>
                                        <td>{value.id}</td>
                                        <td>
                                            <img
                                                height={80}
                                                width={80}
                                                src={`data:image/jpeg;base64,${value.productId.image}`}
                                                alt=''
                                                srcSet=''
                                                className='rounded'
                                                draggable="false"
                                            />
                                        </td>
                                        <td style={{ width: '400px' }}><h6>{value.productId.name}</h6></td>
                                        <td><h6 className='text-success'>{formatIndianNumbering((value.productId.price * value.quantity) + charges)}</h6></td>
                                        <td ><h6>{value.quantity}</h6></td>
                                        <td><h6>{moment(value.purchaseDate).format('LLL')}</h6></td>
                                        <td>
                                            {!value.reviewed ? (
                                                <div className='d-flex flex-row justify-content-end'>
                                                    <Button
                                                        style={{
                                                            backgroundColor: '#F25151',
                                                            borderColor: '#F25151',
                                                        }}
                                                        onClick={() => {
                                                            handleAddReview(value.id)
                                                        }}
                                                    >
                                                        Add review
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className='d-flex flex-row justify-content-end'>
                                                    <Button
                                                        style={{ backgroundColor: 'white', borderColor: '#F25151', color: '#F25151' }}
                                                        onClick={() => {
                                                            setPurchaseId(value.id);
                                                            setViewReviewModal(true)
                                                        }}
                                                    >
                                                        View Review
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </Table>
            )}
            <ReviewModal
                purchaseId={purchaseId}
                showModal={reviewModal}
                handleClose={(flag) => {
                    setReviewModal(false);
                    if (!flag) return;
                    // success snackbar
                    handleRefresh();
                }}
            />

            {viewReviewModal && <ViewReviewModal
                purchaseId={purchaseId}
                showModal={viewReviewModal}
                handleClose={() => setViewReviewModal(false)}
            />}
            <div className='d-flex flex-row justify-content-center'>
                {purchaseList.length > 0 ? (
                    <Pagination
                        page={page}
                        onChange={(event, value) => {
                            setPage(value);
                            handlePageChange(value);
                        }}
                        count={Math.ceil(purchaseList.length / tableLines)}
                        variant='outlined'
                    />
                ) : <div></div>}
            </div>
        </div>
    );
};

export default PurchaseTable;
