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
import {useSelector } from 'react-redux';
import SellerQA from '../../reactapp/src/pages/seller/SellerQA';
import CheckoutPage from "./pages/buyer/CheckoutPage";
import ProductCategoryPage from "./pages/buyer/ProductCategoryPage";
import ProductSearchPage from "./pages/buyer/ProductSearchPage";
import BuyerQA from "./pages/buyer/BuyerQA";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<RequireAuth role={'ROLE_BUYER'}><HomePage/></RequireAuth>} />
        <Route path="/product" element={<RequireAuth role={'ROLE_BUYER'}><ProductPage/></RequireAuth>}/>
        <Route path="/purchasehistory" element={<RequireAuth role={'ROLE_BUYER'}><PurchaseHistory/></RequireAuth>}/>
        <Route path="/admin/products" element={<RequireAuth role={'ROLE_ADMIN'}><ProductsPage/></RequireAuth>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/seller/editproduct/:productId" element={<RequireAuth role={'ROLE_SELLER'}><EditProductPage/></RequireAuth>} />
        <Route path="/seller/addproduct" element={<RequireAuth role={'ROLE_SELLER'}><AddProductPage/></RequireAuth>}/>
        <Route path="/showuser" element={<RequireAuth role={'ROLE_ADMIN'}><Showuser/></RequireAuth>} />
        <Route path="/seller/home" element={<RequireAuth role={'ROLE_SELLER'}><SellerHomePage/></RequireAuth>}/>
        <Route path="/gotoProductsPage" element={<ProductsPage/>} />
        <Route path="/cart" element={<RequireAuth role={'ROLE_BUYER'}><CartPage/></RequireAuth>} />
        <Route path="/changeaddress" element={<RequireAuth role={'ROLE_BUYER'}><ChangeAddress/></RequireAuth>} />
        <Route path="/seller/buyersandreviews/:productId" element={<RequireAuth role={'ROLE_SELLER'}><BuyersAndReviewsPage/></RequireAuth>} />
        <Route path="/orderplaced" element={<RequireAuth role={'ROLE_BUYER'}><OrderPlacedPage/></RequireAuth>} />
        <Route path="/seller/qa" element={<RequireAuth role={'ROLE_SELLER'}><SellerQA/></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth role={'ROLE_BUYER'}><CheckoutPage/></RequireAuth>} />
        <Route path="/category" element={<RequireAuth role={'ROLE_BUYER'}><ProductCategoryPage/></RequireAuth>} />
        <Route path="/search" element={<RequireAuth role={'ROLE_BUYER'}><ProductSearchPage/></RequireAuth>} />
        <Route path="/qa" element={<RequireAuth role={'ROLE_BUYER'}><BuyerQA/></RequireAuth>} />
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
