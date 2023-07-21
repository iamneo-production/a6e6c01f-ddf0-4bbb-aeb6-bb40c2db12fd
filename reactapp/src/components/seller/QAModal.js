import React, {useEffect, useState} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {answerQA, fetchQABySeller, updateQA} from "../../features/qaSlice";


const QAModal = (props) => {
    const [textareaValue, setTextareaValue] = useState('');
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const sellerId = useSelector(state => state.user.currentUser.id)
    async function handleSubmit() {
        await dispatch(answerQA({token: token, qaId: props.element.id, answer: textareaValue}))
        dispatch(fetchQABySeller({token: token, sellerId:sellerId }))
        setTextareaValue('')
        props.onHide()
    }
    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

    return (
        <div>
            <Modal show={props.show} onHide={() => props.onHide()} >
                <Modal.Header closeButton>
                    <Modal.Title> <h3>Enter the answer</h3> </Modal.Title>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()} style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default QAModal;
