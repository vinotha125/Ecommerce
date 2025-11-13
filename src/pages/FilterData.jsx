import React from 'react';
import { useSelector } from 'react-redux';
import ProductCart from '../Components/ProductCart';
import notfound from '../assets/images/notfound.jpg';

const FilterData = () => {
  const filterProducts = useSelector(state => state.product.filteredData);

  return (
    <div className='mx-auto py-12 px-4 md:px-16 lg:px-24'>
      {filterProducts.length > 0 ? (
        <>
          <h2 className='text-2xl font-bold mb-6 text-center'>Top Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 cursor-pointer'>
            {filterProducts.map((product, index) => (
              <ProductCart key={index} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center'>
          <img src={notfound} alt="No products found" className='w-64 h-64 object-contain' />
        </div>
      )}
    </div>
  );
};

export default FilterData;
