import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import { UPDATE_REVIEW } from '../../api/reviewService';

const UpdateReview = ({ showModal, handleClose, purchaseId, data }) => {
    const [textareaValue, setTextareaValue] = useState(data.comment);
    const [rating, setRating] = useState(data.rating);

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };


    const updateData = async () => {
        try {
            const dataToBeUpdated = {
                rating: rating,
                comment: textareaValue
            }
            const res = await UPDATE_REVIEW(purchaseId, dataToBeUpdated)
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        updateData()
        handleClose(true)
    };

    return (
        <div>
            <Modal show={showModal} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>Update Review and Rating</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea">
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="Max 100 words"
                                value={textareaValue}
                                onChange={handleTextareaChange}
                            />
                        </Form.Group>
                        <div className="text-center mt-3">
                            <h5>Your rating</h5>
                            <StarRating value={rating} exportStar={(star) => setRating(star)} />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}
                            >
                                Post
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateReview;
