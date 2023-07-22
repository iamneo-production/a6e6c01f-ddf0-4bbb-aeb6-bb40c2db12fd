import React, {useEffect,useState} from "react";
import "../../pages/buyer/home.css"
import NavigationBar from "../../components/common/NavigationBar";
import { ReactComponent as NoResult } from '../../../src/assets/NoResult.svg';
import { useNavigate } from "react-router-dom";
import {MdKeyboardBackspace, MdOutlineFilterAlt} from 'react-icons/md';
import {fetchProductByCategory} from "../../features/productSlice";
import {useDispatch, useSelector} from "react-redux";
import Card from "../../components/buyer/Card";
import FilterModal from "../../components/buyer/FilterModal";

export default function ProductCategoryPage() {
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = useState(false);
    const handleCloseDropDown = () => setShowDropDown(false);
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
    const [selectedBrandFilters, setSelectedBrandFilters] = useState([]);
    const [selectedColorFilters, setSelectedColorFilters] = useState([]);

    
    const handleBrandFilterChange = (brand) => {
        setSelectedBrandFilters(prevFilters => {
            if (prevFilters.includes(brand)) {
                return prevFilters.filter(item => item !== brand);
            } else {
                return [...prevFilters, brand];
            }
        });
    };

    
    const handleColorFilterChange = (color) => {
        setSelectedColorFilters(prevFilters => {
            if (prevFilters.includes(color)) {
                return prevFilters.filter(item => item !== color);
            } else {
                return [...prevFilters, color];
            }
        });
    };

    
    const filteredResults = categoryProductResult.filter(item => {
        const brandFilterPassed = selectedBrandFilters.length === 0 || selectedBrandFilters.includes(item.brand);
        const colorFilterPassed = selectedColorFilters.length === 0 || selectedColorFilters.includes(item.colour);
        return brandFilterPassed && colorFilterPassed;
    });
    return (
        <div>
            <NavigationBar/><br/><br/><br/>
            <div className='d-flex flex-row align-items-center justify-content-between'>
                <div className='d-flex flex-row align-items-center'>
                    <p className='ms-3'>
                        <MdKeyboardBackspace style={{ color: 'grey' }} onClick={handleGoBack} />
                        {' '}
                        <a href="#" style={{ color: 'grey' }} onClick={handleGoBack}>Back</a>
                    </p>
                    <p className='ms-3' style={{ fontSize: 20 }}>
                        <b>Search results for{' '}
                            <span style={{ fontSize: 20, color: 'dodgerblue' }}>
                                {`"${selectedCategory}"`}
                            </span>
                        </b>
                    </p>
                </div>
                <button onClick={() => setShowDropDown(!showDropDown)} type="button" className="btn btn-secondary me-3" style={{backgroundColor:"#F25151"}}>
                    <MdOutlineFilterAlt style={{ marginRight: 5 }} /> Filter
                </button>
            </div>

            <br />
            <section className="container-xl">
                <div className="row">
                    {categoryProductResult.length === 0 ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <div style={{ width: 300, height: 300 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <h4 style={{ color: "grey" }}><b>Oops!... no results found</b></h4>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <h6>Please try another search</h6>
                                </div>
                                <NoResult />
                            </div>
                        </div>
                    ) : (
                    <Card ProductList={filteredResults}/>
                    )}
                </div>
            </section>
            <FilterModal show={showDropDown}
                         onHide={handleCloseDropDown}
                         categoryProductResult={categoryProductResult}
                         onBrandFilterChange={handleBrandFilterChange}
                         onColorFilterChange={handleColorFilterChange}/>
        </div>

    )
}