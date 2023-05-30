// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuBG from '../../../assets/menu/banner3.jpg';
import desertImg from '../../../assets/menu/dessert-bg.jpeg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* main cover */}
            <Cover bgImg={menuBG} title="Our Menu" />

            {/* offered menu items */}
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer" />
            <MenuCategory items={offered} />

            {/* dessert menu items */}
            <MenuCategory items={desserts} title="desert" coverImg={desertImg} />

            {/* pizza menu items */}
            <MenuCategory items={pizzas} title="pizzas" coverImg={pizzaImg} />

            {/* salad menu items */}
            <MenuCategory items={salad} title="salad" coverImg={saladImg} />

            {/* soup menu items */}
            <MenuCategory items={soup} title="soup" coverImg={soupImg} />
        </div>
    );
};

export default Menu;