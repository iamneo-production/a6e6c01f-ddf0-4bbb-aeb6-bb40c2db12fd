import { FaStar } from "react-icons/fa";

function ProductReviews() {
    return (
        <>
            <br />
            <br />
            <h3 style={{ marginLeft: 10 }}><b>CUSTOMER REVIEWS</b></h3>

            <br />
            <div className="container p-2 my-2" style={{ border: "2px solid grey" }}>
                <h6 className="container">
                    <strong>Vaishnavi</strong>
                </h6>
                <div className="container">
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <div>
                        <p>
                            <light>Nice product </light>
                        </p>
                    </div>
                </div>
            </div>
            <br />
            <div className="container p-2 my-2" style={{ border: "2px solid grey" }}>
                <h6 className="container">
                    <strong>Niveda</strong>
                </h6>
                <div className="container ps-3 my-1">
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <FaStar size={25} style={{ color: "yellow" }} />
                    <div>
                        <p>
                            <light>Nice product</light>
                        </p>
                    </div>
                </div>
            </div>
            <br/>
        </>
    );
}
export default ProductReviews;