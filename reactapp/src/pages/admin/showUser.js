import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { TableData } from '../../components/admin/dummyUserTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/common/Footer';
import AdminNavigationBar from '../../components/admin/AdminNavigationBar';
export default class showuser extends Component {

  handleActionClick = () => {
    window.location.href = "/action";
  };
  handleOrdersClick = () => {
    window.location.href = "/orderprompt";
  };
  handleProductsClick = () => {
    window.location.href = "/productprompt";
  };
  handledisable = () => {
    toast("Disabled Successfully");
  };
  handledelete = () => {
    toast("Deleted Successfully");
  };

  handleGotoClick = () => {
    window.location.href = "/gotoProductsPage";
  };

  render() {
    return (
      <div>
        <AdminNavigationBar />
        <div className="d-flex justify-content-between">
          <h3 style={{ marginLeft: 10, marginTop: 8 }}><b>USERS</b></h3>
          <button type="button" onClick={(e) => this.handleGotoClick(e)} class="btn btn-primary" style={{ margin: "8px 10px", backgroundColor: "#B6D3FF", color: "black" }}><b>Go to products</b></button>
        </div>

        <br></br>
        <div style={{ padding: "0px 50px 50px 50px" }}>
          <Table>
            <thead>
              <tr>
                <th className='text-secondary'>NAME</th>
                <th className='text-secondary'>EMAIL</th>
                <th className='text-secondary'>PHONE NUMBER</th>
                <th className='text-secondary'>DATE JOINED</th>
                <th className='text-secondary'>TYPE</th>
                <th className='text-secondary'> </th>
                <th className='text-secondary'> </th>
              </tr>
            </thead>
            <tbody>
              {TableData.map(({ Id, name, email, phoneNumber, dateJoined, type }) => (
                <tr key={Id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phoneNumber}</td>
                  <td>{dateJoined}</td>
                  <td>{type}</td>
                  <td>
                    <div>
                      {type === "seller" ?
                        <><button style={{ color: "black", width: '65%' }} className="btn btn-warning"
                          data-toggle="modal" data-target="#exampleModalorder">

                          <b>Orders</b></button>
                          <div class="modal fade" id="exampleModalorder" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div style={{ maxWidth: "580px" }} class="modal-dialog modal-dialog-centered" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLongTitle"><b>ORDERS</b></h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <div>
                                    <Table >
                                      <thead>
                                        <tr>
                                          <th style={{ borderTop: "0" }} className=' text-secondary'>NAME</th>
                                          <th style={{ borderTop: "0", textAlign: "center" }} className='text-secondary'>COUNT</th>
                                          <th style={{ borderTop: "0" }} className='text-secondary'>DATE OF PURCHASE</th>
                                          <th style={{ borderTop: "0" }} className='text-secondary'>MODE OF TRANSACTION</th>

                                        </tr>
                                      </thead>
                                      <tbody>
                                        {TableData.map(({ Id, name, count, dateOfPurchase, modeOfTransaction }) => (
                                          <tr key={Id}>
                                            <td style={{ textAlign: "center" }} className='text-secondary'>{name}</td>
                                            <td style={{ textAlign: "center" }} className='text-secondary'>{count}</td>
                                            <td style={{ textAlign: "center" }} className='text-secondary'>{dateOfPurchase}</td>
                                            <td style={{ textAlign: "center" }} className='text-secondary'>{modeOfTransaction}</td>

                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div></> :
                        <><button style={{ color: "black", }} className="btn btn-info"
                          data-toggle="modal" data-target="#exampleModalproduct"
                        ><b>Products</b></button> <div class="modal fade" id="exampleModalproduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div style={{ maxWidth: "904px" }} class="modal-dialog modal-dialog-centered" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLongTitle"><b>PRODUCTS</b></h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <div>
                                    <Table>
                                      <thead>
                                        <tr>
                                          <th style={{ borderTop: "0", width: '74%', textAlign: 'center' }} className='text-secondary'>NAME</th>
                                          <th style={{ borderTop: "0" }} className='text-secondary'>COUNT</th>
                                          <th style={{ borderTop: "0" }} className='text-secondary'>DATE ADDED</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {TableData.map(({ Id, proname, count, dateAdded }) => (
                                          <tr key={Id}>
                                            <td className='text-secondary'>{proname}</td>
                                            <td style={{ textAlign: "center" }} className='text-secondary'>{count}</td>
                                            <td style={{ textAlign: "center" }} className='text-secondary'>{dateAdded}</td>

                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>}
                    </div>
                  </td>

                  <td>
                    <button style={{ color: "black", }} className="btn btn-primary"
                      class="btn btn-danger" data-toggle="modal" data-target="#exampleModalactions">
                      <b>Actions</b></button>
                    <div class="modal fade" id="exampleModalactions" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Choose one of the options</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onClick={(e) => this.handledisable(e)} data-dismiss="modal">Disable</button>
                            <button type="button" onClick={(e) => this.handledelete(e)} data-dismiss="modal" class="btn btn-danger">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <div>
                    <ToastContainer />
                  </div>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Footer />
      </div >
    )
  }
}

