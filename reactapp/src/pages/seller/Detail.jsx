import React from 'react'
import {Col} from 'react-bootstrap';
import Mobile from "../assets/mobile1.jpg"

import Figure from "react-bootstrap/Figure";



const Try = () => {
  return (
    <div className="container">
        <strong style={{ fontSize: '34px' }}>BUYERS </strong>
        <br/>
        <br/>
  
    <Col className="d-flex justify-content-center">
    <div className="d-flex mt-3">

    
      <Figure.Image width={103} height={92} src={Mobile} style={{ marginRight: '40px'}} ></Figure.Image>
      <div style={{ width: '1196px', wordWrap: 'break-word' }}>
      <h3>  Samsung Galaxy M04 Cloud Navy, 4GB RAM, 64GB Storage |Upto 8GB RAM with RAM 
     Plus | MediaTek Helio P35 Octa-core Processor | 5000 mAh Battery | 13MP Dual Camera</h3></div> 
    </div>
    </Col>
    </div>
   
  );
};

export default Try;



    
         
        
    