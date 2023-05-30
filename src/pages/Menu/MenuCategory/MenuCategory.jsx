// eslint-disable-next-line no-unused-vars
import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title, coverImg}) => {
    return (
        <div className='pt-16'>
            {
                title && <Cover bgImg={coverImg} title={title} />
            }
            <article className="grid md:grid-cols-2 gap-10 mt-16">
                {
                    items.map(item => <MenuItem key={item._id} item={item} />)
                }
            </article>
            <section className='text-center'>
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 border-yellow-500 hover:border-yellow-500 hover:bg-yellow-500  mt-2">Order Now</button>
                </Link>
            </section>
        </div>
    );
};

export default MenuCategory;