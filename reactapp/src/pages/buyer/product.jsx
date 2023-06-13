
import NavigationBar from '../../components/common/NavigationBar';
import Footer from '../../components/common/Footer';
import SingleProduct from '../../components/common/SingleProduct';
import Review from '../../components/common/Review';
import QA from '../../components/common/QA';
import "././product.css";






export default function ProductPage(){

    
        return(
            <div className='product'>
              <NavigationBar/>

<div className='product1'>

  <SingleProduct/>

  </div>



  <div class="container mt-5">
    <h3>Customer Reviews</h3>

    <span>&nbsp;&nbsp;</span> 

   <Review/>

    
    <span>&nbsp;&nbsp;</span>
    <h4>Q & A</h4>
    <span>&nbsp;&nbsp;</span>



    <QA/>

    






  </div>
                    
                    


                    

  
    
  










  <span>&nbsp;&nbsp;</span>
  <span>&nbsp;&nbsp;</span>
  
  <Footer/>

    </div>
    
    )

}