import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import { ADD_REVIEW } from '../../api/reviewService';

const ReviewModal = ({ showModal, handleClose, purchaseId }) => {
    const [textareaValue, setTextareaValue] = useState('');
    const [rating, setRating] = useState(0);

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        handleUpdate();
    };

    const cleanUp = async () => {
        setTextareaValue('');
        setRating(0);
    };

    const handleUpdate = async () => {
        try {
            const res = await ADD_REVIEW(purchaseId, textareaValue, rating);
            console.log(res?.data);
            cleanUp();
            handleClose(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal show={showModal} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>Review and Rating</h3>
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlTextarea">
                            <Form.Control
                                as="textarea"
                                rows={6}
                                required
                                placeholder="Max 100 words"
                                value={textareaValue}
                                onChange={handleTextareaChange}
                            />
                        </Form.Group>
                        <div className="text-center mt-3">
                            <h5>Your rating</h5>
                            <StarRating exportStar={(val) => setRating(val)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleClose(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}
                        >
                            Post
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default ReviewModal;
