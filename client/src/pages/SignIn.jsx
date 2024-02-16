import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData ({
      ...formData, [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/auth/signin',  
         {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
         });
      const data = await response.json();
     //  as we defined in the server-api's (index.js) if error occurs then display the message
      if(data.success === false) {   
       setLoading(false);            
       setError(data.message);
       return;
      }
      setLoading(false);
      setError(null);
      navigate('/');
    }catch (error) {
      setLoading(false);
      setError(error.message);     
    }
 };
  // console.log(formData);
  
return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input 
        type="email" placeholder="email"
        className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input 
        type="password" placeholder="password"
        className='border p-3 rounded-lg ' id='password' onChange={handleChange}/>p
        <button disabled={loading} className='bg-slate-700 text-white     
        p-3 rounded-lg uppercase hover:opacity-95
        disabled:opacity-80'>{ loading ? 'Loading...' : 'Sign In' }</button>   
        {/* button name displayed as 'Loading' while it's processing or else 'SignUp'     */}
      </form>
      <div className='text-1xl font-semibold my-7'>
          <p> Dont have an account?</p>
          <Link to='/signup'>
              <span className='text-blue-700'>Sign Up</span>
          </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>

  )
}

export default SignIn