import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonial = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Freelance Worker",
            image: "https://i.ibb.co/VJnHzqp/user1.jpg",
            quote: "TOLOKO has been a game-changer for me. I've earned substantial income completing micro-tasks in my spare time. The platform is user-friendly and payments are always on time!"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Task Buyer",
            image: "https://i.ibb.co/0J6Nxr5/user2.jpg",
            quote: "As a business owner, TOLOKO helps me get small tasks done quickly and efficiently. The quality of work is consistently high, and the pricing is very reasonable."
        },
        {
            id: 3,
            name: "Emma Davis",
            role: "Regular Worker",
            image: "https://i.ibb.co/XZ7XTxk/user3.jpg",
            quote: "The coin system is brilliant! I love how I can accumulate earnings and withdraw when it's convenient. It's become a reliable source of extra income for me."
        },
        {
            id: 4,
            name: "Alex Thompson",
            role: "Digital Marketer",
            image: "https://i.ibb.co/wzXZ7Nx/user4.jpg",
            quote: "TOLOKO's platform is perfect for my digital marketing needs. I can easily find skilled workers for various tasks, and the results are always impressive."
        },
        {
            id: 5,
            name: "Lisa Wong",
            role: "Content Creator",
            image: "https://i.ibb.co/Kj3Kv8n/user5.jpg",
            quote: "The variety of tasks available is amazing. Whether you're skilled in writing, design, or data entry, there's always something suitable to work on."
        }
    ];

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover why thousands of users choose TOLOKO for their micro-task needs
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="testimonial-swiper"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <FaQuoteLeft className="text-primary text-3xl mb-4 opacity-20" />
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    {testimonial.quote}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial; 