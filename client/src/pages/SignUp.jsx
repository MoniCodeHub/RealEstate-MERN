import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div class='p-3 max-w-lg mx-auto'>
      <h1 class="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form class='flex flex-col gap-4' >
        <input 
        type="text" placeholder="username"
        class='border p-3 rounded-lg' id='username' />
        <input 
        type="text" placeholder="email"
        class='border p-3 rounded-lg' id='email' />
        <input 
        type="text" placeholder="password"
        class='border p-3 rounded-lg' id='password' />
        <button class='bg-slate-700 text-white 
        p-3 rounded-lg uppercase hover:opacity-95
        disabled:opacity-80'>Sign Up</button>
      </form>
      <div class='text-1xl text-center font-semibold my-7'>
          <p>have an account already?</p>
          <Link to='/sign-in'>
              <span class='text-blue-700'>Sign In</span>
          </Link>
      </div>
    </div>

  )
}

export default SignUp