import React, { useState, useEffect } from 'react';
import './profile.css';
import NavigationBar from '../../components/common/NavigationBar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Profile() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [editable, setEditable] = useState(false);
  const [type, setType] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
   if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setEmail(currentUser.email || '');
      setPassword(currentUser.password || '');
      setPhoneNumber(currentUser.phone || '');
      setAddress(currentUser.address || '');
      setType(currentUser.type || '');
    }
  }, [currentUser]);

  const handleSubmit = () => {
     const updatedUser = {
      firstName: firstname,
      lastName: lastname,
      password: password,
      phone: phonenumber,
      
    };
    
    if (Object.keys(updatedUser).some((key) => updatedUser[key] !== currentUser[key])) {
      dispatch(updateUser({ token, id: currentUser.id, updatedUser }))
        .then(() => {
          toast.success('User updated successfully', {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(() => {
          toast.error('Failed to update user', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else {
      toast.info('No changes detected', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };

       return (
    <div>
      <NavigationBar />
      <br />
      <br />
      <br />

      <h3 style={{ paddingLeft: '1rem' }}>
        <b>MY PROFILE</b>
      </h3>
      <br />
      <h4 style={{ paddingLeft: 100 }}>
        <b> Personal Information</b>
      </h4>
      <div className='mid'>
        <br />

        <h6> First Name </h6>
        <input
          className='form-control input'
          type='text'
          name='firstname'
          value={firstname}
          disabled={!editable}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />

        <h6>Last Name</h6>
        <input
          className='form-control input'
          type='text'
          name='lastname'
          value={lastname}
          disabled={!editable}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        
        <h6> Password</h6>
        <input
          className='form-control input'
          type='password'
          name='password'
          value={password}
          disabled={!editable}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <h6> Phone Number </h6>
        <input
          className='form-control input'
          type='phone'
          name='phone'
          value={phonenumber}
          disabled={!editable}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />

        <h6>
          {!editable ? (
            <button
              style={{ backgroundColor: '#F25151', color: 'black', width: '10%' }}
              className='btn btn-primary'
              onClick={handleEdit}
            >
              <b>Edit </b>
            </button>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 100px',
                columnGap: '20px',
              }}
            >
              <button
                style={{ backgroundColor: '#F25151', color: 'black' }}
                className='btn btn-primary'
                onClick={handleSubmit}
              >
                <b>Update</b>
              </button>
              <button
                className='btn btn-primary'
                style={{ backgroundColor: '#F25151', color: 'black' }}
                onClick={() => setEditable(false)}
              >
                <b>Cancel</b>
              </button>
            </div>
          )}
        </h6>
        <br />
      </div>
    </div>
  );
}
