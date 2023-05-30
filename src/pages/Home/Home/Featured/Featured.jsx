// eslint-disable-next-line no-unused-vars
import React from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='bg-black text-white'>
            <div className='featured-item py-20'>
                <div className='relative z-40'>
                    <SectionTitle subHeading="Check IT Out" heading="Featured Item" />
                    <article className='md:flex px-36 justify-center items-center '>
                        <div>
                            <img src={featuredImg} alt="featured Image" />
                        </div>
                        <div className='md:ml-10'>
                            <p>Aug 20, 2029</p>
                            <p className='uppercase'>Where can i get some?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugiat obcaecati pariatur eaque possimus! Accusamus laborum alias maxime itaque consequatur officia aperiam iure expedita eius doloremque quas sunt, fuga quod magnam aliquid, recusandae cumque voluptatem. Quas, incidunt quasi? Assumenda quis, in eius reiciendis exercitationem modi odio dicta maxime ipsa accusantium?</p>
                            <button className="btn btn-outline border-0 border-b-4 border-yellow-500 hover:border-yellow-500 hover:bg-yellow-500  mt-2 ">Order Now</button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default Featured;