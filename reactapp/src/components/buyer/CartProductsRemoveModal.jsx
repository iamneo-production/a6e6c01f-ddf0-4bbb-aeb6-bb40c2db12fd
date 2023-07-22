import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from "react-redux";
import {fetchCart, removeCart} from "../../features/cartSlice";


export default function CartProductsRemoveModal(props) {
  const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    async function handleRemove() {
        await dispatch(removeCart({token: token, cartId: props.cartId}))
        await dispatch(fetchCart({token:token}))
        props.handleHideRemoveModal()
    }
  return (
    <Modal show={props.show} onHide={props.handleHideRemoveModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to remove?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleHideRemoveModal}>
          No, Cancel
        </Button>
        <Button variant="primary" style={{backgroundColor:"#F25151"}} onClick={() => handleRemove()}>
          Yes, Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}