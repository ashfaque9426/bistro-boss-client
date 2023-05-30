// eslint-disable-next-line no-unused-vars
import React from 'react';
import FoodCard from '../../../components/FoodCard/FoodCard';

const OrderTab = ({items}) => {
    return (
        <section className='grid md:grid-cols-3 gap-10'>
            {
                items.map(item => <FoodCard key={item._id} item={item} />)
            }
        </section>
    );
};

export default OrderTab;