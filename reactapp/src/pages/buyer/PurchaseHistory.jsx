import React from 'react'
import { Card } from 'react-bootstrap'
import PurchaseTable from '../../components/buyer/PurchaseTable'
import NavigationBar from '../../components/common/NavigationBar'
import Footer from '../../components/common/Footer'


const PurchaseHistory = () => {
    return (
        <>
        <NavigationBar/>
        <br/>
            <br/>
            <Card>
                <Card.Body>
                    <Card.Title >
                        <h2>
                            Purchase History
                        </h2>
                    </Card.Title>
                </Card.Body>
            </Card>
            <div className='d-flex justify-content-center p-5 ' >
                <PurchaseTable/>
            </div>
            <Footer/>
        </>
    )
}

export default PurchaseHistory