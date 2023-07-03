import { ReactComponent as Landingpageimg } from '../../assets/Ecommerce web page-pana 1.svg';
import HeaderBar from '../../components/common/HeaderBar';
import Footer from '../../components/common/Footer';
import {useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();
    const signinSuccess = useSelector(state => state.user.signinSuccess)
    const currentUser = useSelector(state => state.user.currentUser)
    console.log("success--landing")
    
    if (signinSuccess) {
        console.log("success-login")
        console.log(currentUser)
        if (currentUser.roles === 'ADMIN') {
            navigate("/admin/products");
        } else if (currentUser.roles === 'SELLER') {
            console.log("success-seller")
            navigate("/seller/home");
        } else if (currentUser.roles === 'BUYER') {
            navigate("/home");
        }
    }

    return (
        <div>
            <HeaderBar/>
            <div className="container-fluid">
            <div className="row">
                <div style={{ marginLeft: 40, marginTop: 60, marginRight:40}} className="col">
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
            <Footer/> 
        </div>
    )
}