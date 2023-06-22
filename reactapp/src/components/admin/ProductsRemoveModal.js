import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ProductsRemoveModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleHideRemoveModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to remove?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleHideRemoveModal}>
          No, Cancel
        </Button>
        <Button variant="primary" style={{backgroundColor:"#F25151"}} onClick={props.handleHideRemoveModal}>
          Yes, Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}