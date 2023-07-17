import React from 'react';
import Footer from '../../components/common/Footer';
import CartProducts from '../../components/buyer/CartProducts';

const CartPage = () => {
    return (
        <div>
            <CartProducts />
            <Footer/>
        </div>
    );
};

export default CartPage;