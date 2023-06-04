// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((accu, currentItem) => accu + currentItem.price, 0);
    const price = parseFloat(total.toFixed(2))
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Payment</title>
            </Helmet>
            <SectionTitle subHeading="Please Process Payment" heading="Payment" />
            <h2 className='text-3xl text-center'>Teka o teka tumi uira uira asho...</h2>
            <div className='flex flex-col justify-center items-center my-9'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;