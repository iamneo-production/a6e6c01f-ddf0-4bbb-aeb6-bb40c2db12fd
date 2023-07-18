import React, {useEffect} from "react";
import "../../pages/buyer/home.css"
import NavigationBar from "../../components/common/NavigationBar";
import { useNavigate } from "react-router-dom";
import {MdKeyboardBackspace} from 'react-icons/md';
import {fetchProductByCategory, fetchProductByQuery} from "../../features/productSlice";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../components/buyer/Card";

export default function ProductSearchPage() {
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token)
    const searchQuery = useSelector(state => state.product.searchQuery)
    console.log("query---------",searchQuery);
    const searchProductResult = useSelector(state => state.product.searchProductResult)
    console.log("searchProducts---",searchProductResult);
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log("----yesss");
        dispatch(fetchProductByQuery({token:token,query:searchQuery}))
    },[])

    console.log(searchProductResult)
    const handleGoBack = () => {
        navigate("/home")
    };

    return (
        <div>
            <NavigationBar/><br/><br/><br/>
            <div className='d-flex flex-row align-items-center'>
                <p className='ms-3' ><MdKeyboardBackspace style={{color:"grey"}} onClick={handleGoBack}/>{" "}<a href="#" style={{color:"grey"}} onClick={handleGoBack}>Back</a></p>
                <p className='ms-3' style={{fontSize:30}}><b>{searchQuery}</b></p>
            </div>
            <br />
            <section className="container-xl">
                <div className="row">
                    <Card ProductList={searchProductResult}/>
                </div>
            </section>

        </div>

    )
}