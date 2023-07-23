import { ReactComponent as Landingpageimg } from '../../assets/Ecommerce web page-pana 1.svg';
import './LandingPage.css';
import HeaderBar from '../../components/common/HeaderBar';
import Footer from '../../components/common/Footer';
import {useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";

export default function LandingPage() {

    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const signinSuccess = useSelector(state => state.user.signinSuccess)
    const currentUser = useSelector(state => state.user.currentUser)
    console.log("success--landing")
    useEffect(() =>{
        if (token !== null) {
            console.log(currentUser)
            if (currentUser.roles === 'ROLE_ADMIN') {
                navigate("/admin/products");
            } else if (currentUser.roles === 'ROLE_SELLER') {
                console.log("success-seller")
                navigate("/seller/home");
            } else if (currentUser.roles === 'ROLE_BUYER') {
                navigate("/home");
            }
        }
    },[])
    if (signinSuccess) {
        console.log("success-login")
        console.log(currentUser)
        if(currentUser && currentUser.roles){
        if (currentUser.roles === 'ROLE_ADMIN') {
            navigate("/admin/products");
        } else if (currentUser.roles === 'ROLE_SELLER') {
            console.log("success-seller")
            navigate("/seller/home");
        } else if (currentUser.roles === 'ROLE_BUYER') {
            navigate("/home");
        }
    }
    }

    return (
        <div>
            <HeaderBar/>
            <div className="container-fluid">
                <div className="row">
                    <div style={{ marginLeft: 40, marginTop: 60, marginRight: 40 }} className="col">
                        <p className="h2 text-start"><b>We're happy you're here,</b></p>
                        <p style={{ textAlign: "justify", marginTop: 40 }} className="lead">
                            Welcome to Zest, the premier online destination for all your shopping needs! At Zest, we have a wide selection of quality products and services to choose from, ranging from fashion, beauty, home decor, electronics, and more. We offer competitive prices and unbeatable customer service, so you can shop with confidence. Plus, with our fast and reliable delivery options, you can enjoy your purchases right away. Shop with us today and experience the Zest difference.
                        </p>
                    </div>
                    <div className="col-5">
                        <Landingpageimg style={{ width: 500, height: 500 }} />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div style={{ marginLeft: 40,marginTop:-50, marginRight: 40 }} className="col-6">
                        <p className="h2 text-start"><b>Ultimate Shopping Bliss</b></p>
                    </div>
                </div>
                <br/><br/>
            </div>
            <div className='container'>          
                <div class="row">
                    <div class="col-md-3">
                        <div class="card mb-4 landingPageCard">
                        <img src={require('../../assets/FashionBlogging.gif')} alt="loading..." style={{height:230,weight:230}}/>
                            <div class="card-body">
                                <h5 class="card-title"><b>Best Sellers</b></h5>
                                <h6 class="card-text fw-lighter">Discover the most sought-after products from us - handpicked for their unbeatable quality and trendsetting designs.</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card mb-4 landingPageCard">
                        <img src={require('../../assets/FreeShipping.gif')} alt="loading..." style={{height:230,weight:230}}/>
                            <div class="card-body">
                                <h5 class="card-title"><b>Free Shipping</b></h5>
                                <h6 class="card-text fw-lighter">Shop now and have your favorite products delivered to your doorstep without any extra cost.</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card mb-4 landingPageCard">
                        <img src={require('../../assets/FastDelivery.gif')} alt="loading..." style={{height:230,weight:230}}/>
                            <div class="card-body">
                                <h5 class="card-title"><b>Fast Delivery</b></h5>
                                <h6 class="card-text fw-lighter">Experience lightning-fast delivery on all orders, ensuring you receive your desired products in record time. </h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card mb-4 landingPageCard">
                        <img src={require('../../assets/HighFive.gif')} alt="loading..." style={{height:230,weight:230}}/>
                            <div class="card-body">
                                <h5 class="card-title"><b>Happy Customers</b></h5>
                                <h6 class="card-text fw-lighter">Shop with confidence and become part of our community of delighted customers, where your happiness is our priority.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <Footer />
        </div>
    )
}
