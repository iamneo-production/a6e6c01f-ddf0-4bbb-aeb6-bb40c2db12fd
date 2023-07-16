import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export default function OrderPlaceModal(props) {
    const navigate = useNavigate();
    function handleProceed() {
        navigate("/orderplaced")
    }

    return (
        <Modal show={props.show} onHide={props.handleHideRemoveModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure to place the order?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleHideRemoveModal}>
                    No, Cancel
                </Button>
                <Button variant="primary" style={{ backgroundColor: '#F25151' }} onClick={handleProceed}>
                    Yes, Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
