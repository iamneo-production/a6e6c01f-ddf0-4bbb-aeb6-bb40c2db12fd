import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import {useDispatch, useSelector} from "react-redux";
import {fetchCart, updateCart} from "../../features/cartSlice";

function ProductQuantity(props) {
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    const increment = () => {
        if (props.quantity >= 1) {
            handleUpdateCart(props.quantity+1)
        }
    };

    const decrement = () => {
        if (props.quantity > 1) {
            handleUpdateCart(props.quantity-1)
        }
    };

    async function handleUpdateCart(quantity) {
        await dispatch(updateCart({token: token, cartId: props.cartId, quantity: quantity}))
        await dispatch(fetchCart({token:token}))
    }

    return (
        <div className='row ms-1'style={{paddingTop:10}} >
           <div onClick={increment} className="col-md-3"><AiOutlinePlusCircle style={{width:22,height:22}}/></div>
            <div className='col-sm-4 border'>{props.quantity}</div>
            <div onClick={decrement} className="col-md-5"><AiOutlineMinusCircle style={{width:22,height:22}}/></div>
        </div>
    );
}

export default ProductQuantity;