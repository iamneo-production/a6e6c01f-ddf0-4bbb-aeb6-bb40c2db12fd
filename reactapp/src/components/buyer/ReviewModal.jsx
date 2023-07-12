import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ADD_REVIEW } from '../../api/reviewService';

const ReviewModal = ({ showModal, handleClose, purchaseId }) => {
    const [textareaValue, setTextareaValue] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [rating, setRating] = useState(0);

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        handleClose(false);
        setOpenSnackbar(false);
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
            handleOpenSnackbar();
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Review Submitted - Thank you!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ReviewModal;
