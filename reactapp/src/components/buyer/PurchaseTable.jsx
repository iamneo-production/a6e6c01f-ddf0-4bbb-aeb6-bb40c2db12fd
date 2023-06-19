import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TableData } from './DummyTableData';
import { Pagination } from '@mui/material';
import { pageSetter } from './PageSetter';
import ViewReviewModal from './ViewReview';
import ReviewModal from './ReviewModal';

const PurchaseTable = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const [ViewReview,setViewReview] = useState(false);
    const [id, setId] = useState();
    const tableLines = 5;
    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(tableLines);
    const [page, setPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        const { start, stop } = pageSetter(pageNumber, tableLines)
        setStart(start)
        setStop(stop)
    };


    return (
        <div className='w-100 h5'>
        <Table>
            <thead>
            <tr>
                <th className='text-secondary'>Id</th>
                <th className='text-secondary'>Image</th>
                <th className='text-secondary'>Name</th>
                <th className='text-secondary'>Price</th>
                <th className='text-secondary'>Order Date</th>
                <th className='text-secondary text-end'>Write a review</th>
            </tr>
            </thead>
            <tbody>
            {TableData.slice(start, stop).map(({ id, image, name, price, orderdate,review }) => (
                <tr key={id} >
                <td>{id}</td>
                <td>
                    <img height={80} width={80} src={image} alt="" srcSet="" />
                </td>
                <td 
                style={{ width: '650px' }}
                >{name}</td>
                <td>{price}</td>
                <td>{orderdate}</td>
                <td>
                    <div className='d-flex flex-row justify-content-end'>
                    {review ? (
                    <Button
                        style={{ backgroundColor: 'white', borderColor: '#F25151' , color:'#F25151' }}
                        onClick={() => {
                        setId(id);
                        setViewReview(true);
                        }}
                    >
                        View Review
                    </Button>
                    ) : (
                    <Button
                        style={{ backgroundColor: '#F25151', borderColor: '#F25151'  }}
                        onClick={() => {
                        setId(id);
                        setReviewModal(true);
                        }}
                    >
                        Add Review
                    </Button>
                    )}
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        <ReviewModal id={id} showModal={reviewModal} handleClose={() => setReviewModal(false)} />
        <ViewReviewModal id={id} showModal={ViewReview} handleClose={() => setViewReview(false)} />
        <div className='d-flex flex-row justify-content-center'>
            <Pagination
            page={page}
            onChange={(event, value) => {
                setPage(value);
                handlePageChange(value);
            }}
            count={Math.ceil(TableData.length / tableLines)}
            variant='outlined'
            />
        </div>
        </div>
    );
};

export default PurchaseTable;
