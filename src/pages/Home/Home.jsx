import React from 'react';
import Banner from './Banner/Banner';
import Extra1 from './Extra1stSection/Extra1';
import Extra2 from './Extra2Section/Extra2';
import Extra3 from './Extra3Section/Extra3';
import Top6Workers from './Top6Workers/top6Workers';
import Testimonial from './Testimonil/Testimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='w-full mx-auto'>
            <Top6Workers></Top6Workers>
            <Testimonial></Testimonial>
            <Extra2></Extra2>
            <Extra3></Extra3>
            <Extra1></Extra1>
            
            </div>
        </div>
    );
};

export default Home;