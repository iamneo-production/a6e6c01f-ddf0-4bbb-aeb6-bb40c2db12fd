import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TableData } from './DummyTableData';
import DefaultStars from './DefaultStars';
import UpdateReview from './UpdateReview';

const ViewReviewModal = ({ showModal, handleClose, id }) => {
    const item = TableData.find((item) => item.id === id);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    if (!item) {
        return null; // Return null or a fallback component if the item is not found
    }

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleUpdateClose = () => {
        setShowUpdateModal(false);
    };


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
                        <DefaultStars
                            value={item.rating}
                            exportStar={() => { return }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}
                        onClick={handleUpdateClick}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {showUpdateModal && (
                <UpdateReview showModal={showUpdateModal} handleClose={handleUpdateClose} id={id} />
            )}

        </div>
    );
};

export default ViewReviewModal;
