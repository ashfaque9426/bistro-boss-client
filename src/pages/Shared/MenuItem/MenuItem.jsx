// eslint-disable-next-line no-unused-vars
import React from 'react';

const MenuItem = ({item}) => {
    const { image, price, recipe, name} = item;
    
    return (
        <div className='flex space-x-4'>
            <img style={{borderRadius: "0 200px 200px 200px"}} className='w-[104px]' src={image} alt="menu Item Image" />
            <section>
                <h3 className='uppercase'>{name}------------</h3>
                <p>{recipe}</p>
            </section>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default MenuItem;