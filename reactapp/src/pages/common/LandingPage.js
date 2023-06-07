import { ReactComponent as Landingpageimg } from '../../assets/Ecommerce web page-pana 1.svg';
import HeaderBar from '../../components/common/HeaderBar';

export default function LandingPage() {
    return (
        <div>
            <HeaderBar/>
            <div className="container-fluid">
            <div className="row">
                <div style={{ marginLeft: 20, marginTop: 60 }} className="col">
                    <p className="h2 text-start"> We're happy you're here,</p>
                    <p style={{ textAlign: "justify", marginTop: 40 }} className="lead">
                        Welcome to Zest, the premier online destination for all your shopping needs! At Zest, we have a wide selection of quality products and services to choose from, ranging from fashion, beauty, home decor, electronics, and more. We offer competitive prices and unbeatable customer service, so you can shop with confidence. Plus, with our fast and reliable delivery options, you can enjoy your purchases right away. Shop with us today and experience the Zest difference.
                    </p>
                </div>
                <div className="col">
                    <Landingpageimg style={{ width: 500, height: 500 }} />
                </div>
            </div>
            </div>   
        </div>
    )
}