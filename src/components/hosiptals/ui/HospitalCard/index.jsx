import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

import left_arrow from '@/assets/images/icons/slide_arrow_left.svg';
import right_arrow from '@/assets/images/icons/slide_arrow_right.svg';
import { HospitalCard } from './HospitalCard';

export function HospitalInfoSlide({
  hospitals,
  selectedHospital,
  userLat,
  userLng,
}) {
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && selectedHospital && hospitals) {
      const index = hospitals.findIndex(
        (h) => h.hospitalId === selectedHospital.hospitalId
      );
      if (index !== -1) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selectedHospital, swiperInstance, hospitals]);

  if (!hospitals || hospitals.length === 0) return null;

  return (
    <div className="absolute right-0 bottom-0 left-0 z-[1500] flex w-full justify-center overflow-hidden pb-6">
      <div className="relative flex w-full items-center">
        <button className="custom-prev z-10 flex h-[56px] w-[36px] shrink-0 items-center justify-center bg-white shadow-md active:bg-[#EEEEEE] disabled:opacity-50">
          <img src={left_arrow} alt="left" />
        </button>

        <div className="min-w-0 flex-1">
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={1}
            onSwiper={setSwiperInstance}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            className="h-full w-full !overflow-visible px-1 py-4"
          >
            {hospitals.map((h) => (
              <SwiperSlide key={h.hospitalId}>
                <div className="h-full w-full">
                  <HospitalCard
                    img={h.image}
                    name={h.name}
                    status={h.isOpenNow}
                    time={h.openHours}
                    userLat={userLat}
                    userLng={userLng}
                    lat={h.lat}
                    lng={h.lng}
                    phoneNumber={h.phone}
                    rating={h.rating}
                    reviews={h.reviewCount}
                    kinds={h.types}
                    tags={h.tags}
                    onClick={() => navigate(`/index/hospitals/${h.hospitalId}`)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button className="custom-next z-10 flex h-[56px] w-[36px] shrink-0 items-center justify-center bg-white shadow-md active:bg-[#EEEEEE] disabled:opacity-50">
          <img src={right_arrow} alt="right" />
        </button>
      </div>
    </div>
  );
}
