import React from 'react';
import SellerNavigationBar from "../../components/seller/SellerNavigationBar";
import ProductDetail from "../../components/seller/ProductDetail";
import ProductBuyersTable from "../../components/seller/ProductBuyersTable";
import Footer from "../../components/common/Footer";
import ProductReviews from '../../components/seller/ProductReviews';

const BuyersAndReviewsPage = () => {
    return (
        <div>
            <SellerNavigationBar />
            <ProductDetail />
            <ProductBuyersTable />
            <ProductReviews />
            <Footer />
        </div>
    )
}

export default BuyersAndReviewsPage;