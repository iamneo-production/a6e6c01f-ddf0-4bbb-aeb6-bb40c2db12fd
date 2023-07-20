import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchQAByProduct} from "../../features/qaSlice";


const QA = () => {
    const selectedProduct = useSelector(state => state.product.selectedProduct)
    const qaList = useSelector(state => state.qa.qaList)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    useEffect( () => {
        console.log("selectedProduct",selectedProduct)
        dispatch(fetchQAByProduct({token: token, productId: selectedProduct}))
    },[])

    function handleNoQA(){
        let nodata = true
        for (let i=0;i<qaList.length;i++){
            if(qaList[i].status === 'Answered'){
                nodata =false
            }
        }
        return nodata
    }
    return (
        <>
        <div class="mb-4 pb-4 border-bottom">
            {handleNoQA() ? (<p style={{color:"grey"}}>Be the first to ask queries</p>) :
            qaList.map((value,index) =>(
                <div>
                    {value.status === 'Answered' &&
                        <div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className=" fw-bold">
                                        <span className="badge bg-light text-dark">Q :</span>
                                        {`  ${value.question}`}
                                    </p>
                                </div>
                            </div>
                            <p>
                                <span className="badge bg-light text-dark">A :  </span>
                                {`  ${value.answer}`}
                            </p>
                        </div>
                    }
                </div>
            ))}
    </div>




        </>
    )
};
export default QA;