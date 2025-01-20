import React from 'react';
import '../Banner/Banner.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/fb-doing-micro-jobs-2.png'
import img2 from '../../../assets/microworkers.jpg'
import img3 from '../../../assets/ByLYZJNM62j07eprXIIifvCSSo.png'


const Banner = () => {
    return (
        <>
          <Carousel>
                <div>
                    <img className='' src={img1} />
                </div>
                <div>
                    <img className='' src={img2} />
                </div>
                <div>
                    <img className='' src={img3} />
                </div>
            </Carousel>
        </>
    );
};

export default Banner;