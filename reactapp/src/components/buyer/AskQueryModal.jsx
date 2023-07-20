import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {addQA} from "../../features/qaSlice";


const AskQueryModal = (props) => {
    const dispatch = useDispatch()
    const [textareaValue, setTextareaValue] = useState('');
    const token = useSelector(state => state.user.token)
    async function handleSubmit() {
        await dispatch(addQA({token: token, productId: props.productId, question: textareaValue}))
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
                    <Modal.Title> <h3><b>ASK IT</b></h3> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea">
                        <Form.Control
                            as="textarea"
                            rows={6}
                            placeholder='Type here....'
                            value={textareaValue}
                            onChange={handleTextareaChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit()} variant="primary" style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AskQueryModal;
