import React from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import { ReactComponent as OrderPlacedImage } from '../../assets/OrderPlacedImage.svg';

export default function OrderPlacedPage() {
    return (
        <div>
            <NavigationBar /><br /><br /><br />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h2 style={{ color: "#27CA40" }}><b>Order Placed Successfully...</b></h2>
                <br /><br /><br />

            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <OrderPlacedImage />
            </div>
        </div>
    )
}