// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const savedUser = {name: data.name, email: data.email}
            console.log(savedUser);
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                console.log("User profile info updated");
                fetch('https://bistro-boss-server-4i7hxvfyt-ashfaque9426.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                .then(res => res.json(savedUser))
                .then(data => {
                    if(data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User Profile Updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        logOut()
                        .then(() => navigate("/", { replace: true }))
                    }
                })
                reset();
                
            })
        })
        .catch(err => console.log(err.message))
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered bg-white" />
                                {errors.name && <span className='text-red-600'>Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} name='photo' placeholder="Photo Url" className="input input-bordered bg-white" />
                                {errors.photo && <span className='text-red-600'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered bg-white" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i })} name='password' placeholder="password" className="input input-bordered bg-white" />
                                {errors.password?.type === "required" && <span className='text-red-600'>Password is required</span>}
                                {errors.password?.type === "minLength" && <span className='text-red-600'>Password must be 8 characters long.</span>}
                                {errors.password?.type === "maxLength" && <span className='text-red-600'>Password must be less than 20 characters.</span>}
                                {errors.password?.type === "pattern" && <span className='text-red-600'> Password must eight characters, at least one letter and one number.</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center'><small>Already have an account?</small> <Link to='/login'>Login</Link></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;