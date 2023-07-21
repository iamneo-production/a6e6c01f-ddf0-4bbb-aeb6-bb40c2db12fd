import DashBoard from "../../components/seller/Dashboard";
import ProductHeader from "../../components/seller/ProductHeader";
import SellerNavigationBar from "../../components/seller/SellerNavigationBar";
import Footer from "../../components/common/Footer";
import AllProducts from "../../components/seller/AllProducts";


export default function SellerHomePage() {
    return (
        <div>

            <SellerNavigationBar/>
            <DashBoard />
            <br/>
            <ProductHeader />
            <AllProducts/><br/>
            <Footer/>
            
        </div>
    );
}
