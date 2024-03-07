import React, {useRef, useState, useEffect} from 'react';
import { useSelector,  useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { 
   getStorage,
   ref,
   uploadBytesResumable, 
   getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,         
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure,
  signOutUserStart, 
  signOutUserSuccess, 
  signOutUserFailure } from '../redux/user/userSlice.js';

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector( (state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  // console.log(file);
  // console.log(formData);
  // console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }  
  }, [file]);

  const handleFileUpload = (file) => {
  // Upload file and metadata to the object  
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
(snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  setFilePercent(Math.round(progress));

}, 
(error) => {
  setFileUploadError(true);
}, 
() => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    setFormData({ ...formData, avatar: downloadURL })
  });
 }
);

};

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

//function For 'Update' user button
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const response = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if(data.success === false){
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);   
    
  } catch (error) {
    dispatch(updateUserFailure(error.messsage));
  }
};

//Function for 'Delete Account' button
const handleDelete = async (e) => {
  try {
    dispatch(deleteUserStart());
    const response = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    setDeleteSuccess(true);
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }

};

const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart());
    const response = await fetch('/api/auth/signout');
    const data = await response.json();
    if(data.success === false) {
      dispatch(signOutUserFailure(data.message));
      return;
    }
    dispatch(signOutUserSuccess(data))
  } catch (error) {
    dispatch(signOutUserFailure(data.message));
  }
}

const handleShowListings = async () => {
  try {
    setShowListingsError(false);
    const response = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await response.json();
    if(data.success === false){
      setShowListingsError(true)
      return;
    }
    setUserListings(data);
    
  } catch (error) {
    setShowListingsError(true);
  }
};

const handleListingDelete = async (listingId) =>{
  try {
    const response = await fetch(`/api/listing/delete/${listingId}`, {
     method: 'DELETE', 
    });
    const data = await response.json();
    if(data.success === false){
      console.log(data.message);
      return;
    }
    setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
  } catch (error) {
    console.log(error.message)
    
  }
};
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 p-5'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        onChange = {(e) => setFile(e.target.files[0])}
        type="file" 
        ref={fileRef} 
        hidden accept='image/*'
        />
        <img 
        onClick={()=> fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} 
        alt="profile" 
        className='rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2'
        />
        <p className='text-sm self-center'>
          { fileUploadError ? (
          <span className='text-red-700'>Error Image Upload(Upload image less than 2MB in size)</span>
          ) :
          filePercent > 0 && filePercent < 100 ? (
            <span>{`Uploading ${filePercent}%`}</span>
          )
          : filePercent === 100 ? (
            <span className='text-green-700'>successfully Uploaded!</span>
          )
          : (
            ''
          )}
        </p>
        <input 
        type="text" 
        placeholder='username' 
        defaultValue={currentUser.username}
        id='username' 
        className='border p-3 rounded-lg' 
        onChange = {handleChange}
        />
        <input type="email" 
        placeholder='email' 
        defaultValue={currentUser.email} 
        id='email' className='border p-3 rounded-lg' 
        onChange={handleChange}
        />
        <input 
        type="password" 
        placeholder='password' 
        id='password' 
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />
        <button 
        disabled = {loading} 
        className='bg-slate-700 text-white rounded-lg p-3 
        uppercase font-serif hover:opacity-95'
        >{loading ? 'Loading' : 'Update'}</button>
        <Link to='/create-listing' className='bg-pink-400 text-white font-serif font-semibold text-center 
        p-3 rounded-lg hover:opacity-95'>
            CREATE LISTING
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} 
        className='text-red-600 font-semibold cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} 
        className='text-red-600 font-semibold cursor-pointer'
        >
          Sign Out
        </span>
      </div><br/>
      <p className='text-red-600 font-semibold' >{error ? error: ''}</p>
      <p className='text-green-600 font-semibold' >{updateSuccess ? 'User Updated Sccessfully!' : ''}</p>

      <button 
          onClick={handleShowListings} 
          className='text-green-700 font-serif font-bold w-full shadow-xl'
          >Show Listings
      </button>
      <p className='text-red-700'>{showListingsError ? 'Error showing Listings' : '' }</p>

      {userListings &&
       userListings.length > 0 && 
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 font-semibold text-2xl' >Your Listings</h1>
           {userListings.map((listing) => (
        
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center'>
                <Link to={`/listing/${listing._id}`}>
                  <img 
                  src={listing.imageUrls[0]}
                  alt='listed image'
                  className='h-16 w-16 object-cover rounded-md '
                  />
                </Link >
                <Link className='flex-1 text-slate-700 font-semibold mx-2
                    hover:underline truncate' to={`/listing/${listing._id}`}>
                    <p>{listing.name}</p>
                </Link>
                <div className='flex flex-col item-center'>
                    <button onClick={ ()=> handleListingDelete(listing._id)} className='text-red-700 uppercase font-semibold'>Delete</button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className='text-green-700 uppercase font-semibold'>Edit</button>
                    </Link>
                </div>
            </div>
        ))}           
        </div>}
      
    </div>
  );
}

export default Profile