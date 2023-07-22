import React from 'react';
import SellerNavigationBar from "../../components/seller/SellerNavigationBar";
import ProductDetail from "../../components/seller/ProductDetail";
import ProductBuyersTable from "../../components/seller/ProductBuyersTable";
import Footer from "../../components/common/Footer";
import ProductReviews from '../../components/seller/ProductReviews';
import {useParams} from "react-router-dom";

const BuyersAndReviewsPage = () => {
    const { productId } = useParams();
    return (
        <div>
            <SellerNavigationBar />
            <ProductDetail productId={productId}/>
            <ProductBuyersTable productId={productId}/>
            <div className={"container mt-5"}>
                <h6 className={"mb-5 fw-bold"}>CUSTOMER REVIEWS</h6>
                <ProductReviews productId={productId}/>
            </div>
            <Footer />
        </div>
    )
}

export default BuyersAndReviewsPage;