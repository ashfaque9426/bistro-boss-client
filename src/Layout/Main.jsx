// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup");
    return (
        <>
            {noHeaderFooter || <Navbar />}
            <Outlet />
            {noHeaderFooter || <Footer />}
        </>
    );
};

export default Main;