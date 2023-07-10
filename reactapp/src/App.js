import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LandingPage from "./pages/common/LandingPage";
import HomePage from "./pages/buyer/home";
import ProductPage from "./pages/buyer/product";
import PurchaseHistory from "./pages/buyer/PurchaseHistory";
import ProductsPage from "./pages/admin/ProductsPage";
import Profile from "./pages/common/profile";
import EditProductPage from "./pages/seller/EditProductPage";
import AddProductPage from "./pages/seller/AddProductPage";
import SellerHomePage from "./pages/seller/SellerHomepage";
import Showuser from "./pages/admin/showuser";
import CartPage from "./pages/buyer/CartPage";
import ChangeAddress from "./pages/buyer/ChangeAddress";
import BuyersAndReviewsPage from "./pages/seller/BuyersAndReviewsPage";
import OrderPlacedPage from "./pages/buyer/OrderPlacedPage";
import CheckoutPage from "./pages/buyer/CheckoutPage";
import {useSelector } from 'react-redux';
import SellerQA from "./pages/seller/SellerQA";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<RequireAuth role={'ROLE_BUYER'}><HomePage/></RequireAuth>} />
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
        <Route path="/admin/products" element={<ProductsPage/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/seller/editproduct" element={<EditProductPage/>}/>
        <Route path="/seller/addproduct" element={<RequireAuth role={'ROLE_SELLER'}><AddProductPage/></RequireAuth>}/>
        <Route path="/showuser" element={<Showuser/>} />
        <Route path="/seller/home" element={<RequireAuth role={'ROLE_SELLER'}><SellerHomePage/></RequireAuth>}/>
        <Route path="/gotoProductsPage" element={<ProductsPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/changeaddress" element={<ChangeAddress/>} />
        <Route path="/seller/buyersandreviews" element={<BuyersAndReviewsPage/>} />
        <Route path="/orderplaced" element={<OrderPlacedPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/qa" element={<SellerQA/>}/>
      </Routes>
    </Router>
  );
}

function RequireAuth(props){
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  if(token!==null){
      if(currentUser.roles === props.role){
          return props.children
      }
  }
  return <Navigate to="/"/>
}

export default App;
