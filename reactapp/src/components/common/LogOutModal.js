import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/logoutSlice";

export default function LogoutModal(props) {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        navigate("/")
    }

    return (
        <Modal show={props.show} onHide={props.handleHideRemoveModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure to logout?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleHideRemoveModal}>
                    No, Cancel
                </Button>
                <Button variant="primary" style={{ backgroundColor: '#F25151' }} onClick={handleLogout}>
                    Yes, Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
