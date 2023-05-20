import React,{Component} from 'react';
import './signup.css';
import "../loginComponent/login";
export default class SignupComponent extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          email: "",
          password: "",
          phone: "",
          type: "",
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
            <div className='signup container'>
                    <div className='zestlogo'>
                        <img alt="logo" style={{width:"14rem",marginLeft:"2rem"}} src={require("../assets/logo.png")}/>
                    </div>
                    <div style={{height:"150vh",background:"linear-gradient(to right, #f2709c, #ff9472)"}} classname="midcontainer">
                        <div className='formdiv'>
                        <h1>Sign Up</h1>
                        <div className='formindiv'>
                        <h4 className='formheading'>
                            Name:
                        </h4>
                        <input
                                    className='inputfield'
                                    type="text"
                                    name="text"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                        />
                        <br />
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
                            Password :
                        </h4>
                        <input
                                    className='inputfield'
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                        />
                        <br />
                        <h4 className='formheading'>
                            Address:</h4>
                        <input
                            className='inputfield'
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleInputChange}
                        />
                        
                        <br />
                        <h4 className='formheading'>
                            Phone:</h4>
                        <input
                            className='inputfield'
                            type="text"
                            name="phone"
                            value={this.state.phone}
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
                        <br />
                        <button className='submitbutton'
                        onClick={(e)=>this.handleSubmit(e)}
                        type="submit">Submit</button>
                        <p className='alreadyacc' >Already have an account? <a href="/login"> <u style={{color:"black",fontWeight:"400"}}>Signup</u></a></p>
                    </div>   
                    </div>
                </div>
             </div>
        )
    }
}