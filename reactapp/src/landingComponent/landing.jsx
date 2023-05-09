import React,{Component} from 'react';
import "./landing.css";
export default class LandingComponent extends Component{
    handleSignInClick = () => {
        window.location.href="/login";
    };

    render(){
        return(
            <div className='landing'>
                    <div className='outergrid'>
                        <div className='inheadgrid'>
                            <div className='zestlogo'>
                                <img style={{width:"14rem",marginLeft:"2rem"}} src={require("../assets/logo.png")}/>
                            </div>
                            <div className='siginbtndiv'>
                                <div onClick={this.handleSignInClick} className='siginbtn'>SIGN IN</div>
                            </div>
                            <div>
                                <div style={{marginLeft:"0px"}} className='siginbtn'>SIGN UP</div>
                            </div>            
                        </div> 
                        <div className='midgrid'>
                            <div>
                                <p className='decripL'>
                                Welcome to Zest, the premier online destination for all your shopping needs! At Zest, we have a wide selection of quality products and services to choose from, ranging from fashion, beauty, home decor, electronics, and more. We offer competitive prices and unbeatable customer service, so you can shop with confidence. Plus, with our fast and reliable delivery options, you can enjoy your purchases right away. Shop with us today and experience the Zest difference.
                                </p>
                            </div>
                            <div>
                                <img src={require("../assets/landingShop.png")} 
                                  style={{width:"80%"}}>
                                </img>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}