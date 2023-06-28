import {
  BrowserRouter as Router,
  Routes,
  Route,
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
        <Route path="/admin/products" element={<ProductsPage/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/seller/editproduct" element={<EditProductPage/>}/>
        <Route path="/seller/addproduct" element={<AddProductPage/>}/>
        <Route path="/showuser" element={<Showuser/>} />
        <Route path="/seller/home" element={<SellerHomePage/>}/>
        <Route path="/gotoProductsPage" element={<ProductsPage/>} />
        <Route path="/cart" element={<CartPage/>} />
          
      </Routes>
    </Router>
  );
}

export default App;
