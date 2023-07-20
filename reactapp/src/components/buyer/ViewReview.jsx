import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GET_REVIEWS_BY_PURCHASE } from '../../api/reviewService';
import Loader from '../common/Loader';
import DefaultStars from './DefaultStars';
import UpdateReview from './UpdateReview';
import { toast } from "react-toastify";


const ViewReviewModal = ({ showModal, handleClose, purchaseId }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const [rating, setRating] = useState(null); // Updated to null initially
    const getData = async () => {
        try {
            const res = await GET_REVIEWS_BY_PURCHASE(purchaseId);
            setData(res.data);
            setRating(res.data?.rating || null); // Set to null if no rating available
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false);
        }
    };


    useEffect(() => {
        if (!showModal) return;
        setLoad(true);
        getData();
    }, [showModal, purchaseId]);

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleUpdateClose = () => {
        setShowUpdateModal(false);
    };

    const displayToast = () => {
        toast.success('Updated Successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Review</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {
                        !load ?
                            <>
                                <div>
                                    <h6>Your Comment :</h6>
                                </div>
                                <div>{data?.comment}</div>
                                <br />
                                <div>
                                    <h6>Your Rating :</h6>
                                </div>
                                {rating !== null ? ( // Check if rating is not null
                                    <DefaultStars value={rating} exportStar={() => { return }} />
                                ) : (
                                    <div>No rating available</div>
                                )}
                            </>
                            :
                            <div>
                                <Loader />
                            </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        style={{ backgroundColor: '#F25151', borderColor: '#F25151' }}
                        onClick={handleUpdateClick} // Handle the click event to open UpdateReview modal
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {showUpdateModal && (
                <UpdateReview
                    data={data}
                    showModal={showUpdateModal}
                    handleClose={(flag) => {
                        handleUpdateClose()
                        handleClose()
                        if (!flag) return
                        // success snackbar 
                        displayToast()
                    }}
                    purchaseId={purchaseId} />
            )}
        </div>
    );
};

export default ViewReviewModal;
