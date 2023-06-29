import React from 'react';
import { Col } from 'react-bootstrap';
import Phone from '../../assets/phone.jpg';

const ProductDetail = () => {
    return (
        <div>
            <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>BUYERS</b></h3>
            <br />
            <div className="container">
                <Col className="d-flex justify-content-center">
                    <div className="d-flex mt-3">
                        <img src={Phone} width={103} height={92} style={{ marginRight: '40px' }} className='figure-img img-fluid rounded shadow-3 mb-3' alt='...' />
                        <div>
                            <h6> <b>Samsung Galaxy M04 Cloud Navy, 4GB RAM, 64GB Storage |Upto 8GB RAM with RAM
                                Plus | MediaTek Helio P35 Octa-core Processor | 5000 mAh Battery | 13MP Dual Camera</b></h6></div>
                    </div>
                </Col>
            </div><br/>
        </div>
    );
};

export default ProductDetail;