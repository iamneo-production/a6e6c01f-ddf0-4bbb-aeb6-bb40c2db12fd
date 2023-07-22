import React, { useEffect, useState } from 'react';
import { getPurchaseByBuyerId } from '../../api/purchaseService';
import Loader from '../../components/common/Loader';
import PurchaseTable from '../../components/buyer/PurchaseTable';
import NavigationBar from '../../components/common/NavigationBar';
import { useSelector } from "react-redux";
import Footer from '../../components/common/Footer';
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from 'react-icons/md';
import { toast } from "react-toastify";

const PurchaseHistory = () => {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    // const buyerId = 2;
    const buyerId = useSelector((state) => state.user.currentUser.id);
    console.log(buyerId)

    const handleGoBack = () => {
        navigate("/home")
    };

    const getBuyerData = async () => {
        try {
            const res = await getPurchaseByBuyerId(buyerId);
            setData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    };

    const displayToast = () => {
        toast.success('Review Added Successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    useEffect(() => {
        setLoad(true);
        getBuyerData();

    }, []);

    return (
        <div>
            <NavigationBar />
            <br />
            <br />
            <br />
            <div className="d-flex flex-row align-items-center">
                <p className='ms-3' ><MdKeyboardBackspace style={{ color: "grey" }} onClick={handleGoBack} />{" "}<a href="#" style={{ color: "grey" }} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{ fontSize: 30 }}><b>PURCHASE HISTORY</b></p>
            </div>

            <div className='d-flex justify-content-center p-5 '>
                {!load ? (
                    <PurchaseTable
                        handleRefresh={() => {
                            setLoad(true);
                            getBuyerData();
                            displayToast()
                        }}
                        data={data}
                    />
                ) : (
                    <Loader />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PurchaseHistory;



