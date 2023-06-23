import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import StarRating from './StarRating';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const UpdateReview = ({ showModal, handleClose, id }) => {
    const [textareaValue, setTextareaValue] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        handleClose();
        setOpenSnackbar(false);
    };

    return (
        <div >
            <Modal show={showModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title> <h3> Update Review and Rating</h3> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea">
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder='Max 100 words'
                            value={textareaValue}
                            onChange={handleTextareaChange}
                        />
                    </Form.Group>
                    {/* <div className='d-flex p-3 justify-content-start'> */}
                    <div className='text-center mt-3'>
                        <h5>Your rating </h5>
                        <StarRating />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: '#F25151', borderColor: '#F25151' }} onClick={handleOpenSnackbar}>
                        Post
                    </Button>
                </Modal.Footer>
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
                    Review Updated - Thank you!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default UpdateReview;
