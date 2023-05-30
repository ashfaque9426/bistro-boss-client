import { useQuery } from '@tanstack/react-query'
// import { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
const useCart = () => {
    // const {user} = useContext(AuthContext);
    const {user, loading} = useAuth();
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        // to prevent api calls before getting jwt token enabled: !loading is used
        enabled: !loading,
        // queryFn: async () => {
        //     const response = await fetch(`https://bistro-boss-server-4i7hxvfyt-ashfaque9426.vercel.app/carts?email=${user?.email}`, {
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }
        //     })
        //     return response.json();
        // },
        queryFn: async () => {
            const response = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('response from axios', response)
            return response.data;
        },
    })
    return [cart, refetch];
}

export default useCart;