import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ReviewModal from './ReviewModal';
import ViewReviewModal from './ViewReview';
import { Pagination } from '@mui/material';
import { pageSetter } from './PageSetter';
import { ReactComponent as PurchaseEmpty } from '../../assets/PurchaseEmpty.svg';
import moment from 'moment';

const PurchaseTable = ({ data, handleRefresh }) => {
    const [reviewModal, setReviewModal] = useState(false);
    const [viewReviewModal, setViewReviewModal] = useState(false);
    const [purchaseId, setPurchaseId] = useState(null);
    const tableLines = 5;
    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(tableLines);
    const [page, setPage] = useState(1);

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
            {data.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" ,marginTop:-15}} >
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
                        <th className='text-secondary'>Order Date & Time</th>
                        <th className='text-secondary text-end'>Write a review</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 &&
                        data.slice(start, stop).map(
                            ({
                                purchaseId,
                                productImageUrl,
                                comment,
                                productName,
                                productPrice,
                                purchaseDate,
                            }) => (
                                <tr key={purchaseId}>
                                    <td>{purchaseId}</td>
                                    <td>
                                        <img
                                            height={80}
                                            width={80}
                                            src={productImageUrl}
                                            alt=''
                                            srcSet=''
                                        />
                                    </td>
                                    <td style={{ width: '650px' }}>{productName}</td>
                                    <td>{productPrice}</td>
                                    <td>{moment(purchaseDate).format('LLL')}</td>
                                    <td>
                                        {comment === null ? (
                                            <div className='d-flex flex-row justify-content-end'>
                                                <Button
                                                    style={{
                                                        backgroundColor: '#F25151',
                                                        borderColor: '#F25151',
                                                    }}
                                                    onClick={() => {
                                                        handleAddReview(purchaseId)
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
                                                        setPurchaseId(purchaseId);
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

            <ViewReviewModal
                purchaseId={purchaseId}
                showModal={viewReviewModal}
                handleClose={() => setViewReviewModal(false)}
            />

            <div className='d-flex flex-row justify-content-center'>
            {data.length > 0 ? (
                <Pagination
                    page={page}
                    onChange={(event, value) => {
                        setPage(value);
                        handlePageChange(value);
                    }}
                    count={Math.ceil(data.length / tableLines)}
                    variant='outlined'
                />
            ):<div></div>}
            </div>
        </div>
    );
};

export default PurchaseTable;
