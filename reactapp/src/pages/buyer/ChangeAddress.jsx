import { useState, useRef, useEffect } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import AddAddressModal from "../../components/buyer/AddAddressModal";
import {MdKeyboardBackspace} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAddress} from "../../features/addressSlice";
import { ReactComponent as Address } from '../../assets/Address.svg';

export default function ChangeAddress() {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const target = useRef(null);
    const handleCloseAddressModal = () => setShowAddressModal(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(() =>{
        dispatch(fetchAddress({token:token}))
    },[])
    const addressList = useSelector(state => state.address.addressList)
    const handleGoBack = () => {
        navigate("/home")
    };

    return (
        <div>
            <NavigationBar /><br /><br /><br/>
            <div className='d-flex flex-row align-items-center'>
                <p className='ms-3' ><MdKeyboardBackspace style={{color:"grey"}} onClick={handleGoBack}/>{" "}<a href="#" style={{color:"grey"}} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{fontSize:30}}><b>CHANGE ADDRESS</b></p>
                <a ref={target} onClick={() => setShowAddressModal(!showAddressModal)} className='ms-3  text-dark ' href='#addaddress' style={{ fontSize: 15 }}>Add address</a>
            </div>
            <br />
            {addressList.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                    <div style={{ width: 400, height: 400 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h5 style={{ color: "grey" }}><b>No address added yet</b></h5>
                        </div>
                        <Address />
                    </div>
                </div>
            ) : (            
            <div className='container mb-5'>
                    {addressList.map((value,index) => (
                        <div className="row">
                            <div className=" card border container-fluid mt-3 col-md-6 col-md-offset-3 " >
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Address {index+1}</h5>
                                    <span className="card-text   mt-3">{value.flatNo}</span><br/>
                                    <span className="card-text   ">{value.area}</span><br/>
                                    <span className="card-text  ">{value.city}</span><br/>
                                    <span className="card-text  ">{value.state}</span><br/>
                                    <div className=' mb-3  '>{value.pincode}</div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            )}
            <AddAddressModal show={showAddressModal} onHide={handleCloseAddressModal} />
        </div>
    )
}