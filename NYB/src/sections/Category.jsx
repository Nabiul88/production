import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../assets/home/slide1.jpg";
import slide2 from "../assets/home/slide2.jpg";
import slide3 from "../assets/home/slide3.jpg";
import slide4 from "../assets/home/slide4.jpg";
import SectionTitle from "../components/SectionTitle";

const Category = () => {
  return (
    <section className="mb-20">
      <SectionTitle
        subHeading={"---From 11:00am to 10:00pm---"}
        heading={'ORDER ONLINE'}
      ></SectionTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        autoplay={true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="rounded-xl" src={slide1} alt="" />
          <h2 className="ml-4 md:ml-14 md:text-4xl text-xl text-white uppercase">
            Salads
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className="rounded-xl" src={slide2} alt="" />
          <h2 className="ml-4 md:ml-14 md:text-4xl text-xl text-white uppercase">
            Pizzas
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className="rounded-xl" src={slide3} alt="" />
          <h2 className="ml-4 md:ml-14 md:text-4xl text-xl text-white uppercase">
            Soups
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img className="rounded-xl" src={slide4} alt="" />
          <h2 className="ml-4 md:ml-14 md:text-4xl text-xl text-white uppercase">
            Deserts
          </h2>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;