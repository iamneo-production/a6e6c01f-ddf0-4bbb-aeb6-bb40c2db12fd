import React, {useEffect} from "react";
import "../../pages/buyer/home.css"
import NavigationBar from "../../components/common/NavigationBar";
import { useNavigate } from "react-router-dom";
import {MdKeyboardBackspace} from 'react-icons/md';
import {fetchProductByCategory} from "../../features/productSlice";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../components/buyer/Card";

export default function ProductCategoryPage() {
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const selectedCategory = useSelector(state => state.product.selectedCategory)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchProductByCategory({token:token,category:selectedCategory}))
        console.log("Dispatched fetch product by category");
    },[])
    const categoryProductResult = useSelector(state => state.product.categoryProductResult)
    const handleGoBack = () => {
        navigate("/home")
    };
    return (
        <div>
            <NavigationBar/><br/><br/><br/>
            <div className='d-flex flex-row align-items-center'>
                <p className='ms-3' ><MdKeyboardBackspace style={{color:"grey"}} onClick={handleGoBack}/>{" "}<a href="#" style={{color:"grey"}} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{fontSize:30}}><b>{selectedCategory}</b></p>
            </div>
            <br />
            <section className="container-xl">
                <div className="row">
                    <Card ProductList={categoryProductResult}/>
                </div>
            </section>

        </div>

    )
}