import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SellerNavigationBar from '../../components/seller/SellerNavigationBar';
import Footer from '../../components/common/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchProductById, updateProduct, updateProductImage} from '../../features/productSlice';

import { MdKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProductPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const productDetails = useSelector((state) => state.product.productDetails);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    colour: '',
    quantity: '',
    image: null,
  });
  const [systemImage, setSystemImage] = useState(null);
  const inputStyle = { input: { paddingLeft: "30px" } };
  useEffect(() => {
    dispatch(fetchProductById({ token, productId }));
  }, [dispatch, token, productId]);

  useEffect(() => {
    if (productDetails) {
      setFormValue({
        ...formValue,
        name: productDetails.name || '',
        description: productDetails.description || '',
        price: productDetails.price || '',
        category: productDetails.category || '',
        brand: productDetails.brand || '',
        colour: productDetails.colour || '',
        quantity: productDetails.quantity || '',
      });
      const imageSrc = `data:image/jpeg;base64,${productDetails.image}`;
        setSystemImage(imageSrc);
      }
  }, [productDetails]);

  const handleGoBack = () => {
    navigate('/seller/home');
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      dispatch(updateProductImage({token:token,productId:productId,image:event.target.files[0]}))
    }
  };

 const handleSubmit = () => {
  const updatedProduct = {
    name: formValue.name,
    description: formValue.description,
    price: parseFloat(formValue.price),
    category: formValue.category,
    brand: formValue.brand,
    colour: formValue.colour,
    quantity: parseInt(formValue.quantity)
  };

  // Check if any field has been modified
  const hasFieldChanges = Object.keys(updatedProduct).some(
    (key) => updatedProduct[key] !== productDetails[key]
  );

  if (hasFieldChanges) {
    dispatch(updateProduct({ token, productId, updatedProduct }))
      .then(() => {
        toast.success('Product updated successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(() => {
        toast.error('Failed to update product', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  } else {
    toast.info('No changes detected', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

  const fileInputRef = useRef(null);

  const handleEditImageButtonClick = () => {
    fileInputRef.current.click();
  };
  

  return (
    <div>
      <SellerNavigationBar />
      <div className="d-flex flex-row align-items-center">
        <p className="ms-3">
          <MdKeyboardBackspace style={{ color: 'grey' }} onClick={handleGoBack} />
          {' '}
          <a href="#" style={{ color: 'grey' }} onClick={handleGoBack}>
            Back
          </a>
        </p>
        <p className="ms-3" style={{ fontSize: 30 }}>
          <b>EDIT PRODUCT</b>
        </p>
      </div>

      <br />
      <div style={{ padding: '0px 30px 30px 30px' }}>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Image</b>
        </label>
        <div style={inputStyle.input}>
          <div
            className="card"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="card-body">
              {systemImage ? (
                <img
                  style={{ paddingTop: '5px' }}
                  height={300}
                  width={300}
                  alt="preview image"
                  src={systemImage}
                />
              ) : (
                <p></p>
              )}
              <br />
            </div>
          </div>
          <div className="mt-3 mb-3">
            <div>
              <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={onImageChange}
              />
              <button style={{backgroundColor:"#F25151"}} type="button" className="btn btn-light" onClick={handleEditImageButtonClick}>Change Image</button>
            </div>
          </div>
        </div>
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Product Name</b>
        </label>
        <div style={inputStyle.input}>
          <input
            onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
            type="text"
            placeholder="Product name"
            className="form-control"
            id="exampleFormControlInput1"
            value={formValue.name}
          />
        </div>
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Product Description</b>
        </label>
        <div style={inputStyle.input}>
          <textarea
            onChange={(e) => setFormValue({ ...formValue, description: e.target.value })}
            className="form-control"
            placeholder="Product description"
            id="exampleFormControlTextarea1"
            rows="3"
            value={formValue.description}
          ></textarea>
        </div>
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Price</b>
        </label>
        <div style={inputStyle.input}>
          <input
            type="text"
            onChange={(e) => setFormValue({ ...formValue, price: e.target.value })}
            placeholder="Price"
            className="form-control"
            id="exampleFormControlInput1"
            value={formValue.price}
          />
        </div>
        <br />
        <label for="exampleFormControlInput1" class="form-label"><b>Product information</b></label>
        <br></br>
        <div className="d-flex justify-content-start" style={inputStyle.input}>
         <div>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Category</b>
        </label>
        
        <div>
          <input
            type="text"
            onChange={(e) => setFormValue({ ...formValue, category: e.target.value })}
            placeholder="Category"
            className="form-control"
            id="exampleFormControlInput1"
            value={formValue.category}
          />
        </div>
        </div> 
        
        <br />
        <div style={{ marginLeft: "40px" }}>

        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Brand</b>
        </label>
        <div >
          <input
            type="text"
            onChange={(e) => setFormValue({ ...formValue, brand: e.target.value })}
            placeholder="Brand"
            className="form-control"
            id="exampleFormControlInput1"
            value={formValue.brand}
          />
        </div>
        </div>
        <br />
        <div style={{ marginLeft: "40px" }}>

        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Colour</b>
        </label>
        <div>
          <input
            type="text"
            onChange={(e) => setFormValue({ ...formValue, colour: e.target.value })}
            placeholder="Colour"
            className="form-control"
            id="exampleFormControlInput1"
            value={formValue.colour}
          />
        </div>
        </div>
        </div>
        <br />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          <b>Quantity</b>
        </label>
        <div style={inputStyle.input}>
          <input
            type="text"
            onChange={(e) => setFormValue({ ...formValue, quantity: e.target.value })}
            placeholder="Quantity"
            className="form-control"
            id="exampleFormControlInput1"
            value={formValue.quantity}
          />
        </div>
        <br />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            type="button"
            
            className="btn btn-danger"
            style={{ backgroundColor: "#F25151", color: "black", width: 200 }}
            onClick={handleSubmit}
            disabled={!formValue.name || !formValue.price || !formValue.quantity}
          >
            Save Changes
          </button>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}
