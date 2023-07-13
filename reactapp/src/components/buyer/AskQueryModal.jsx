import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';


const AskQueryModal = (props) => {
    const [textareaValue, setTextareaValue] = useState('');

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
                    <Button variant="primary" style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AskQueryModal;
