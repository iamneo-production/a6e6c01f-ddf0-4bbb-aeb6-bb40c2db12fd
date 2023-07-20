import {useNavigate} from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import "././home.css";
import Card from '../../components/buyer/Card';
import cardData from '../../components/buyer/CardData';
import Footer from '../../components/common/Footer';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProduct, setSelectedCategory} from "../../features/productSlice";
import {Overlay, Spinner} from "react-bootstrap";






export default function HomePage(){
  const allProductList = useSelector(state => state.product.allProductList)
  const token = useSelector(state => state.user.token)
    const fetchProductInProcess = useSelector(state => state.product.fetchProductInProcess)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() =>{
      dispatch(fetchProduct({token:token}))
  },[])

  async function handleCategorySelect(category) {
    console.log("Clicked--handleCategorySelect");
    await dispatch(setSelectedCategory({category: category}))
    navigate("/category")
  }

    const loadingOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 9999,
    };

return(
        <div className='home'>
          
            <NavigationBar/>

          
        <div className='home1'>
          <div className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid justify-content-center">
              
           <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav justify-content-between w-100">
                <li className="nav-item ">
                
                <span className="nav-link" onClick={() => handleCategorySelect('Fashion')} style={{cursor:"pointer"}}>Fashion</span>
                </li>
                <li className="nav-item">
                <span  onClick={() => handleCategorySelect('Mobile')} style={{cursor:"pointer"}} className="nav-link">Mobile Phones</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" onClick={() => handleCategorySelect('Camera')} style={{cursor:"pointer"}}>Camera</span>
                </li>
                <li className="nav-item">
                  
                  <span className="nav-link" onClick={() => handleCategorySelect('Skincare')} style={{cursor:"pointer"}}>Skin Care</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" onClick={() => handleCategorySelect('Footware')} style={{cursor:"pointer"}}>Footware</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" onClick={() => handleCategorySelect('Backpack')} style={{cursor:"pointer"}}>Backpack</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" onClick={() => handleCategorySelect('Laptop')} style={{cursor:"pointer"}}>Laptop</span>
                </li>
        
              </ul>
           </div>
             </div>
          </div>
          </div>



          <section class="container-fluid text-sm-center p-5 bg-info text-white ">
    <h1>Welcome to Zest!</h1>
    <p>Discover amazing products and shop with confidence!</p>
    <a href="#" class="btn btn-danger">Shop Now</a>
  </section>


          <span>&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;</span> 








          <section class="container">
    <h2 class="text-center mb-4">Featured Products</h2>
    <div class="row">

        {fetchProductInProcess ?
            <div style={loadingOverlayStyle}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>:
            <Card ProductList={allProductList}/>
        }

    </div>
    
    
  </section><br/>

  <Footer/>

  
                
                
        </div>
        
        
        
        







    )

}