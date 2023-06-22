import React,{Component} from 'react';
import './profile.css';
import NavigationBar from '../../components/common/NavigationBar';
export default class Profile extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
          firstname:"Tom",
          lastname:"R",
          email: "abc@gmail.com",
          password: "",
          phonenumber:"",
          address:"",
          editable:false,
          disable:true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleSubmit(e ){
        console.log(this.state,"before");

        this.setState({editable:!this.state.editable,disable:!this.state.disable},()=>{
            console.log(this.state ,"after");
        })
        console.log("this is submit funtion");
        
      }

      handleEdit(e ) {
        console.log(this.state ,"before");
        this.setState({editable:!this.state.editable,disable:!this.state.disable},()=>{
            console.log(this.state ,"after");
        })
        console.log("this is edit funtion");
        
      }
    
      handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });

        
      
    }
    render(){
        return(
        
                <div >
                   <NavigationBar></NavigationBar>
                   <br />
                   <br />
                   <br />
                    <div className='mid'>
                        
                                   <h4> MY PROFILE </h4>
                                   <h4> Personal Information</h4>  
                                        
                            <br />
                            
                            
                            <h6 > First Name </h6> 
                            <input
                                className='form-control input'
                                type="text"
                                name="firstname"
                                value={this.state.firstname}
                                disabled={this.state.disable }
                                onChange={this.handleInputChange}
                            />
                            <br />
                            
                            <h6 >Last Name</h6>
                            <input 
                                className='form-control input'
                                type="text"
                                name="lastname"
                                value={this.state.lastname}
                                disabled={this.state.disable }
                                onChange={this.handleInputChange}
                            />
                            <br />
                            <h6 > Gender </h6>
                            <select className='form-check form-check-inline input'
                                name="type"
                                value={this.state.type}
                                
                                onChange={this.handleInputChange}
                            >
                                <option value="">Please select a type</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                
                            </select>
                            
                            <br />
                            <h6  > Email</h6>
                            <input 
                                className='form-control input'
                                type="email"
                                name="email"
                                disabled={this.state.disable }
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                            <br />
                            
                            <h6 > Password</h6>
                            <input 
                                className='form-control input'
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange} 
        
                            />
                            
                            <br />
                            

                            <h6> Phone Number </h6>
                            <input 
                                className='form-control input'
                                type="phone"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleInputChange}
                            />
                            <br />

                            
                            <h6>
                                { !this.state.editable ?
                                <button className="btn btn-primary" 
                                onClick={(e)=>this.handleEdit(e)}>
                                
                                Edit</button>:
                                <div style={{display:"grid",gridTemplateColumns:"100px 100px",columnGap:"20px"}}> <button className="btn btn-primary"
                            onClick={(e)=>this.handleSubmit(e)}
                            >Update</button>
                            <button className="btn btn-primary"
                            onClick={(e)=>this.handleSubmit(e)}
                            >Cancel</button></div> }</h6>
                            <br />
                        </div>
                    </div>
            
                                
            
        
        
        )

    }
}