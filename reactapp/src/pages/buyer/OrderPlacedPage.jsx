import React from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import { ReactComponent as OrderPlacedImage } from '../../assets/OrderPlacedImage.svg';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function OrderPlacedPage() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/home');
    };

    return (
        <div>
            <NavigationBar /><br /><br /><br />
            <div className="d-flex flex-row align-items-center">
                <p className="ms-3">
                    <MdKeyboardBackspace
                        style={{ color: 'grey' }}
                        onClick={handleGoBack}
                    />
                    {' '}
                    <a href="#" style={{ color: 'grey' }} onClick={handleGoBack}>
                        Back to shop
                    </a>
                </p>
            </div>
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