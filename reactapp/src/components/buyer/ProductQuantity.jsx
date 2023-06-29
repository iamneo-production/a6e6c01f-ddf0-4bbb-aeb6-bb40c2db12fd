import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

function ProductQuantity() {
    const [count, setCount] = useState(0);

    const increment = () => {
        if (count >= 0) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
        else if (count==0){
            setCount(0);
        }
    };

    return (
        <div className='row ms-1'>
            <div onClick={increment} className="col-md-3"><AiOutlinePlusCircle /></div>
            <div className='col-sm-4 border'>{count}</div>
            <div onClick={decrement} className="col-md-5"><AiOutlineMinusCircle /></div>
        </div>
    );
}

export default ProductQuantity;