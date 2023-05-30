import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth()

    const axiosSecure = axios.create({
        baseURL: 'https://bistro-boss-server-4i7hxvfyt-ashfaque9426.vercel.app', // Replace with your base URL
    });

    useEffect(() => {
        const source = axios.CancelToken.source();

        const interceptor = axiosSecure.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('access-token');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Logout the user and redirect to login page
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
            source.cancel();
        };
    }, [logOut, navigate, axiosSecure]);

    return [axiosSecure];
};

export default useAxiosSecure;
