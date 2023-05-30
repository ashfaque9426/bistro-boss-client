// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const FoodCard = ({item}) => {
    const { image, price, recipe, name, _id } = item;
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = menuItem => {
        console.log(menuItem);
        if(user && user.email) {
            const orderItem = {menuItemId: _id, name, image, price, email: user.email}
            fetch('https://bistro-boss-server-4i7hxvfyt-ashfaque9426.vercel.app/carts', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderItem)
            })
            .then(res => res.json())
            .then(data=> {
                if(data.insertedId) {
                    refetch(); // refetching the cart items from server refetch is from tenstack query
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added To the cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
        else {
            Swal.fire({
                title: 'Please Login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}});
                }
            })

        }
    }
    return (
        <div className="card w-96 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4'>Price: ${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-2">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;