import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addPurchase} from "../../features/purchaseSlice";

export default function OrderPlaceModal(props) {
    const navigate = useNavigate();

    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    function getCartIds() {
        let cartIds = []
        for (let i = 0; i < props.cartList.length; i++) {
            cartIds.push(props.cartList[i].id)
        }
        return cartIds
    }
    async function handlePurchase() {
        await dispatch(addPurchase({token: token, cartIds: getCartIds(),paymentMethod:props.payment}))
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
                <Button variant="primary" style={{ backgroundColor: '#F25151' }} onClick={handlePurchase}>
                    Yes, Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
