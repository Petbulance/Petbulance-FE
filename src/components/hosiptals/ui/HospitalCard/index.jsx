import { useNavigate } from 'react-router-dom';

import placeholder from '@/assets/images/pageImages/placeholder.svg';

import { HospitalCard } from './HospitalCard';

export function HospitalInfoSlide() {
  const navigate = useNavigate();

  const hospitalData = [
    {
      img: placeholder,
      name: '리틀버드서울 버드앤주클리닉',
      status: '진료중',
      time: '20:00',
      distance: '1.2',
      phoneNumber: '02-1234-5678',
      rating: '4.8',
      reviews: '25',
      kinds: ['소형동물', '포유류'],
    },
    {
      img: placeholder,
      name: '리틀버드서울 버드앤주클리닉',
      status: '진료중',
      time: '20:00',
      distance: '1.2',
      phoneNumber: '02-1234-5678',
      rating: '4.8',
      reviews: '25',
      kinds: ['소형동물', '포유류'],
    },
  ];

  return (
    <div className="no-scrollbar absolute bottom-4 z-50 flex gap-2 overflow-x-auto px-[25.72px]">
      {hospitalData.map((card, idx) => (
        <HospitalCard
          key={`${card.name}-${idx}`}
          img={card.img}
          name={card.name}
          status={card.status}
          time={card.time}
          distance={card.distance}
          phoneNumber={card.phoneNumber}
          rating={card.rating}
          reviews={card.reviews}
          kinds={card.kinds}
          onClick={() => navigate('detail')}
        />
      ))}
    </div>
  );
}
