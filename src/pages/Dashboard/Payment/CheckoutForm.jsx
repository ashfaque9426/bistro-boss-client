// eslint-disable-next-line no-unused-vars
import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import './CheckoutForm.css'
import Swal from 'sweetalert2';

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    useEffect(()=> {
        if(price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(resData => {
                    console.log(resData);
                    setClientSecret(resData.data.clientSecret);
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async e => {
        e.preventDefault();

        if(!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if(card === null) return;

        // console.log("card: ", card);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error) {
            console.log('paymentError: ', error);
            setCardError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setCardError("");
        }

        setProcessing(true);

        const {paymentIntent, error:confirmError} = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous',
                    },
                },
            })
        if(confirmError) {
            setCardError(confirmError);
        }

        console.log("paymentIntent", paymentIntent);
        setProcessing(false);

        if(paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = { email: user?.email, transactionId: paymentIntent.id, price, quantity: cart.length, cartItems: cart.map(item => item._id), menuItems: cart.map(item => item.menuItemId), itemNames: cart.map(item => item.name), date: new Date(), status: "service pending" }
            axiosSecure.post('/payments', payment)
            .then(res => {
                console.log(res.data)
                if (res.data.paymentInsertResult.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Payment Successfull',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    }

    return (
        <>
            <form className='w-2/3 m-8' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-outline btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className='text-red-600'>{cardError}</p>}
            {transactionId && <p className='text-green-600'>Transaction Complete with Transaction Id: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;