// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        fetch('/reviews.json')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, [])

    return (
        <section className='my-20'>
            <SectionTitle subHeading="What Our Client Say" heading="Testimonials" />
            <section>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className='flex flex-col items-center space-y-6 m-24'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <h3 className="text-2xl text-orange-400">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>
        </section>
    );
};

export default Testimonials;