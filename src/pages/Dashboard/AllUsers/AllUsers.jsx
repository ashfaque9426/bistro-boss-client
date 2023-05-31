// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const {data: users = [], refetch} = useQuery(['users'], async() => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })

    const handleDelete = user => {
        console.log(user);
    }

    const handleMakeAdmin = user => {
        console.log(user)
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className='w-full md:p-10'>
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <h2 className='text-3xl text-center font-semibold my-4'>Total Users: {users.length}</h2>
            <section>
                <div className="overflow-x-auto">
                    <table className="table table-zebra text-white w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === "admin" ? "admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600 text-white"><FaUserShield /></button>}</td>
                                    <td><button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt /></button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AllUsers;