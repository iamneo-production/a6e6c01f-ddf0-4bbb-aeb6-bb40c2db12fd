import React from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import ProductQuantity from '../../components/buyer/ProductQuantity';
import Footer from '../../components/common/Footer';

export default function CheckoutPage() {
    const products = [
        {
            name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM With RAM Plus | 5000 mAh Battery | 13MP Dual Camera",
            image: "https://m.media-amazon.com/images/I/61ODgTm9J6L._SX679_.jpg",
            cost: "INR 29,000.00",
            amount: "20 left"
        },
        {
            name: "Samsung Galaxy M04 Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM With RAM Plus | 5000 mAh Battery | 13MP Dual Camera",
            image: "https://m.media-amazon.com/images/I/61ODgTm9J6L._SX679_.jpg",
            cost: "INR 16,000.00",
            amount: "Out Of Stock"
        }

    ];
    return (
        <div>
            <NavigationBar /><br /><br />
            <h3 style={{ marginLeft: 10, marginTop: 20 }}><b>CHECKOUT</b></h3><br />
            <div class="container" style={{marginLeft:80}}>
                <div class="row" >
                    <div class="col-6" >
                        <h5><b>ADDRESS</b></h5><br />
                        <div class="card">
                            <div class="form-check">
                                <div className="card-body">
                                    <h5 className="fw-bold">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">Address 1</label></h5>
                                    <p className="card-text   ">13</p>
                                    <p className="card-text   ">Maharani Avenue, 5th Phase, Vadavalli</p>
                                    <p className="card-text  ">Coimbatore</p>
                                    <p className="card-text  ">641041</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h5><b>PRICE SUMMARY</b></h5><br />
                        <div class="card">
                            <div class="card-body">
                                This is some text within a card body.
                            </div>
                        </div>
                    </div>
                </div>
            </div><br /><br />
            <div class="container">
                <div class="col"><h5><b>YOUR ORDER</b></h5><br />
                    <div>
                        {
                            products.map((prod, index) =>
                            (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
                                        <div className="row ">
                                            <div className="col-md-2 ms-5  ">
                                                <img src={prod.image} alt="Card" className=" d-block  " width={155} height={135} />
                                            </div>
                                            <div className="col-md-9 border  ">
                                                <div className="card-body">
                                                    <h6 className="card-title fw-bold">{prod.name}</h6>
                                                    <p className="card-text text-muted fw-bold">{prod.cost}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div><br />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='container'>
                <div class="col"><h5><b>PAYMENT METHOD</b></h5><br />
                    <div class="card">
                        <div class="card-body">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <b>Pay with Debit/Credit/ATM Cards</b>
                                </label><br /><br />
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <b>Net Banking</b><br /><br />
                                    <div class="dropdown pl-4">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="netBankingDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown button
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="netBankingDropdown">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </label><br /><br />
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <b>Other UPI Apps</b><br /><br />
                                    <h6 className='fw-light pl-4'>Please enter your UPI ID</h6>
                                    <div className='pl-5'>
                                        <input class="form-control form-control-sm" type="text" placeholder="EX: Mobile number@upi" aria-label=".form-control-sm example"></input>
                                    </div>
                                </label><br /><br />
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <b>EMI</b>
                                </label><br /><br />
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    <b>Cash on Delivery/Pay on Delivery</b>
                                </label><br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div><br /><br />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button type="submit" class="btn btn-danger" style={{ backgroundColor: "#F25151", color: "black", width: 200 }}><b>Proceed</b></button>
            </div><br /><br />
            <Footer />
        </div>
    )
}