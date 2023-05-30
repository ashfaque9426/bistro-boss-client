// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    
    return (
        <section className='mb-20 px-3'>
            <SectionTitle heading={"From Our Menu"} subHeading={"From Our Menu"} />
            <article className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem key={item._id} item={item} />)
                }
            </article>
            <div className='text-center mt-5'>
                <button className="btn btn-outline border-0 border-b-4 border-yellow-500 hover:border-yellow-500 hover:bg-yellow-500  mt-2 ">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;