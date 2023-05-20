import React,{Component} from 'react';
import './login.css';
import "../signupComponent/signup";
export default class LoginComponent extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
          email: "",
          password: "",
          type:""
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleSubmit(event) {
        console.log("this is submit funtion");
        console.log(this.state);                
      }
    
      handleInputChange(event) {       
        const target = event.target;
        const value = target.value;
        const name = target.name;           
        this.setState({
          [name]: value,
        });
      }

    render(){
        return(
            <div className='signin container'>
                <div className='zestlogo'>
                    <img alt="logo" style={{width:"14rem",marginLeft:"2rem"}} src={require("../assets/logo.png")}/>
                </div>
                <div style={{background:"linear-gradient(to right, #f2709c, #ff9472)",height:"100vh"}}>
                <div className='formdiv'>
                    <h1>Sign In</h1>
                    <div className='formindiv'>
                    <h4 className='formheading'>
                        Email:
                    </h4>
                    <input
                        className='inputfield'
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />                            
                    <br />
                    <h4 className='formheading'>
                        Password:</h4>
                    <input
                        className='inputfield'
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    
                    <br />
                    <h4 className='formheading'>UserType</h4>
                    <select className='inputfield'
                                name="type"
                                value={this.state.type}
                                onChange={this.handleInputChange}
                            >
                            <option value="">Please select a type</option>
                            <option value="Seller">Seller</option>
                            <option value="Buyer">Buyer</option>
                    </select>
                    <br/>
                    <button className='submitbutton' 
                    onClick={(e)=>this.handleSubmit(e)}
                    type="submit">Submit</button>
                    <p className='createacc' >Create a <a href="/signup"> <u style={{color:"black",fontWeight:"400"}}>Zest Account</u></a></p>
                </div>
               </div>
                </div>                     
            </div>
        )
    }
}