import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getPurchaseByBuyerId } from '../../api/purchaseService';
import Loader from '../../components/common/Loader';
import PurchaseTable from '../../components/buyer/PurchaseTable';
import NavigationBar from '../../components/common/NavigationBar';
import { useSelector } from "react-redux";
import Footer from '../../components/common/Footer';



const PurchaseHistory = () => {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    // const buyerId = 2;
    const buyerId = useSelector((state) => state.user.currentUser.id);
    console.log(buyerId)

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

    useEffect(() => {
        setLoad(true);
        getBuyerData();

    }, []);

    return (
        <div>
            <NavigationBar />
            <br />
            <br />
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h3>Purchase History</h3>
                    </Card.Title>
                </Card.Body>
            </Card>

            <div className='d-flex justify-content-center p-5 '>
                {!load ? (
                    <PurchaseTable
                        handleRefresh={() => {
                            setLoad(true);
                            getBuyerData();
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



