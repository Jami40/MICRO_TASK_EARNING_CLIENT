import React from 'react';
import Banner from './Banner/Banner';
import Extra1 from './Extra1stSection/Extra1';
import Extra2 from './Extra2Section/Extra2';
import Extra3 from './Extra3Section/Extra3';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='w-11/12 mx-auto'>
            <Extra2></Extra2>
            <Extra3></Extra3>
            <Extra1></Extra1>
            
            </div>
        </div>
    );
};

export default Home;