import React from "react";



const Review = () =>{
    return (

    <>

<div class="mb-4 pb-4 border-bottom">
        <div class="d-flex mb-3 align-items-center">
           <img src={require('../../assets/profile.jpg')} alt="" class="rounded-circle avatar-lg" style={{width:50,height:50}}/>
                <div class="ml-2 px-3">
                   <h5 class="mb-1">
                      Vishal D
                   </h5>
                 <p class="font-12 mb-0">
                     <span>June 13,2023</span>
                 </p>
                </div>
        </div>
                                                                  
        <p>
        Overall the phone is good. I am facing hard time with its sound volume. Whether it's the ring tone, multimedia or calls. It's lower than average.

        </p>
        <a href="#!" class="btn btn-light btn-sm mr-2">Helpful</a>
        <a href="#!" class="text-danger font-14">Report abuse</a>
    </div>




    </>
    )

};

export default Review;