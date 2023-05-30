// eslint-disable-next-line no-unused-vars
import React from 'react';
import Banner from './Banner/Banner.jsx';
import Category from '../Category/Category.jsx';
import PopularMenu from '../PopularMenu/PopularMenu.jsx';
import Featured from './Featured/Featured.jsx';
import Testimonials from '../Testimonials/Testimonials.jsx';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <main>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <section role='banner'>
                <Banner />
            </section>
            <Category />
            <PopularMenu />
            <Featured />
            <Testimonials />
        </main>
    );
};

export default Home;