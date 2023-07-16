import {useNavigate} from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import "././home.css";
import Card from '../../components/buyer/Card';
import cardData from '../../components/buyer/CardData';
import Footer from '../../components/common/Footer';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProduct, setSelectedCategory} from "../../features/productSlice";






export default function HomePage(){
  const allProductList = useSelector(state => state.product.allProductList)
  const token = useSelector(state => state.user.token)
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
return(
        <div className='home'>
          
            <NavigationBar/>

          
        <div className='home1'>
          <div className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid justify-content-center">
              
           <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav justify-content-between w-100">
                <li className="nav-item ">
                
                <span className="nav-link" style={{cursor:"pointer"}}>Fashion</span>
                </li>
                <li className="nav-item">
                <span  onClick={() => handleCategorySelect('Mobile')} style={{cursor:"pointer"}} className="nav-link">Mobile Phones</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" style={{cursor:"pointer"}}>Ornaments</span>
                </li>
                <li className="nav-item">
                  
                  <span className="nav-link" style={{cursor:"pointer"}}>Skin Care</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" style={{cursor:"pointer"}}>Footware</span>
                </li>
                <li className="nav-item">
                  
                <span className="nav-link" style={{cursor:"pointer"}}>Backpack</span>
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
      <Card ProductList={allProductList}/>
    
      
     
    </div>
    
    
  </section>

  <Footer/>

  
                
                
        </div>
        
        
        
        







    )

}