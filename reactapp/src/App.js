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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
        <Route path="/admin/products" element={<ProductsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
