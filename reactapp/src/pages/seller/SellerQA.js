import { useState } from 'react';
import QAModal from '../../components/seller/QAModal';
import Footer from '../../components/common/Footer';
import SellerNavigationBar from '../../components/seller/SellerNavigationBar';

export default function SellerQA() {
    const [qamodal, setQamodal] = useState(false);
    const handleCloseQAModal = () => setQamodal(false);

    return (
        <div>
            <SellerNavigationBar />
            <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>Q and A</b></h3>
            <br />
            <div>
                
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title"><b>Samsung Galaxy M04 Light Green4GB RAM, 64GB Storage | Upto 8GB RAM with RAM Plus 5000 mAh Battery | 13MP Dual Camera</b></h6>
                            <p className="card-text">Q: What is the weight?</p>

                            <div className="d-flex justify-content-start">
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    style={{ backgroundColor: '#B1DFB8', color: 'black', width: 100, border: "1px solid #000" }}
                                    onClick={() => setQamodal(true)}
                                >
                                    <b>Answer</b>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div><br /><br />
            <QAModal show={qamodal} onHide={handleCloseQAModal} />
            <Footer />
        </div>
    );
}
