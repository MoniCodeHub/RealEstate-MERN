import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { 
   getStorage,
   ref,
   uploadBytesResumable, 
   getDownloadURL } from "firebase/storage";
import { app } from '../firebase';



const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser} = useSelector( (state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(file);
  console.log(formData);
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
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 p-5'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input 
        onChange = {(e) => setFile(e.target.files[0])}
        type="file" ref={fileRef} hidden accept='image/*'/>

        <img onClick={()=> fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} alt="profile" 
        className='rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2'/>
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
        <input type="text" placeholder='username' id='text' className='border p-3  rounded-lg' />
        <input type="email" placeholder='email' id='email' className='border p-3  rounded-lg' />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 
        uppercase font-serif hover:opacity-95'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-600 font-semibold cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile