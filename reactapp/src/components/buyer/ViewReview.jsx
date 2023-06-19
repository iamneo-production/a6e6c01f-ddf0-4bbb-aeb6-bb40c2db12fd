import React from 'react';
import { Modal } from 'react-bootstrap';
import { TableData } from './DummyTableData';

const ViewReviewModal = ({ showModal, handleClose, id }) => {
    const item = TableData.find((item) => item.id === id);

    if (!item) {
        return null; // Return null or a fallback component if the item is not found
    }

    return (
        <div>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                <h3>Your reviews</h3>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <h5>Your comments:</h5>
                <p>{item.review}</p>
                <h5>Your rating:</h5>
            </div>
            </Modal.Body>
        </Modal>
        </div>
    );
    };

export default ViewReviewModal;
