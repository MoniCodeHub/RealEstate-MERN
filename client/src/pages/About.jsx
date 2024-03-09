import React from 'react'
import Image1 from '../assets/agent1.jpg'
import Image2 from '../assets/agent2.jpg'
import Image3 from '../assets/agent3.jpg'

export default function About() {
  return (
    <div>
      <h1 className='text-slate-800 text-3xl font-serif font-bold text-center mt-4'
      >About Us</h1>
      <p className='text-emerald-950 text-center font-semibold mt-4'>Here comes our lovely, friendly and smart gents who can help you find your dream home 
        with no stress! Feel free to contact them @ 
      </p>
      <div className="flex justify-around ml-4 mt-4 ">
            

            <div>
              <img className='w-40 h-60 object-cover rounded-lg shadow-lg' src={Image1} alt="agent1" />
              <p className='text-center  text-red-800 font-semibold text-md'>Austin</p>

            </div>

            <div>
              <img className=' w-50 h-60 object-cover rounded-lg shadow-lg' src={Image2} alt="agent2" />
              <p className='text-center text-red-800 font-semibold text-md'>Katy</p>
            </div>

            <div>
              <img className=' w-50 h-60 object-cover rounded-lg shadow-lg' src={Image3} alt="agent3" />
              <p className='text-center  text-red-800 font-semibold text-md'>Rihana</p>
            </div>



              



 
            


      </div>
      
    </div>
  )
}
