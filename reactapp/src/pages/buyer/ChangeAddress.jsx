import { useState, useRef } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import AddAddressModal from "../../components/buyer/AddAddressModal";

export default function ChangeAddress() {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const target = useRef(null);
    const handleCloseAddressModal = () => setShowAddressModal(false);

    return (
        <div>
            <NavigationBar /><br /><br />
            <div className='fw-bold fs-3 front-monospace mt-3 ms-3'>CHANGE ADDRESS<a ref={target} onClick={() => setShowAddressModal(!showAddressModal)} className='ms-3  text-dark ' href='#addaddress' style={{ fontSize: 15 }}>Add address</a></div><br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className=" border container-fluid mt-3 col-md-6 col-md-offset-3 " >
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Address 1</h5>
                            <p className="card-text   mt-3">13</p>
                            <p className="card-text   ">Maharani Avenue, 5th Phase, Vadavalli</p>
                            <p className="card-text  ">Coimbatore</p>
                            <div className=' mb-3  '>641041</div>
                        </div>
                    </div>
                </div>
            </div>
            <AddAddressModal show={showAddressModal} onHide={handleCloseAddressModal} />
        </div>
    )
}