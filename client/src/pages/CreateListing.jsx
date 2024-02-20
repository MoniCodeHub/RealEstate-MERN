import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row  gap-4 '>
            <div className='flex flex-col gap-4 flex-1'>
                <input 
                type="text" 
                placeholder='Name' 
                className='border  border-fuchsia-500 p-3 rounded-lg'
                id='name'
                maxLength='62'
                minLength='10' required/>
                <textarea 
                type="text" 
                placeholder='Description' 
                className='border  border-fuchsia-500 p-3 rounded-lg'
                id='description'
                />
                <input 
                type="text" 
                placeholder='Address' 
                className='border  border-fuchsia-500 p-3 rounded-lg'
                id='address'
                />
                <div className="flex gap-6 flex-wrap">
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-3'>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg' />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg' />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='regular-price' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg' />
                        
                        <p>Regular Price</p>
                        <span className='text-xs'>($ / month )</span>
                   
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='discounted-price' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg' />
                  
                        <p>Discounted Price</p>
                        <span className='text-xs'>($ / month )</span>

                    </div>
                </div>                                                          
            </div>
            <div className='flex flex-col flex-1'>
                <p className='font-semibold'>Images: 
                <span className='font-normal text-gray-600 ml-2'
                >The first image will be the cover (max 6)</span></p>
                <div className='flex my-4 gap-4'>
                    <input className='p-3 border border-fuchsia-500 rounded w-full' 
                    type="file" id="images" accept='image/*' multiple />
                    <button className='p-3 text-blue-700 border border-blue-400 font-bold
                     rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 my-5 bg-slate-700 text-white
                rounded-lg uppercase hover:shadow-lg disabled:opacity-80'
                >CREATE LISTING</button>            
            </div>          
        </form>
    </main>
  )
};

export default CreateListing