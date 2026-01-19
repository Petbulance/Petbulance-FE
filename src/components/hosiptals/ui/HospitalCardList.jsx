import { useNavigate } from 'react-router-dom';

import placeholder from '@/assets/images/pageImages/placeholder.svg';
import { HospitalCard } from '@/components/hosiptals/ui/HospitalCard/HospitalCard';

export function HospitalCardList() {
  const navigate = useNavigate();

  const mockHospitals = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    img: placeholder,
    name: `병원명 ${i + 1}`,
    status: i % 3 === 0 ? '진료중' : '진료 종료',
    time: i % 3 === 0 ? '20:00' : '09:00',
    distance: (0.6 + i * 0.2).toFixed(1),
    phoneNumber: `02-1234-56${String(70 + i).slice(-2)}`,
    rating: (4.2 + (i % 5) * 0.1).toFixed(1),
    reviews: String(10 + i * 3),
    kinds: i % 2 === 0 ? ['소형동물', '포유류'] : ['조류', '파충류'],
  }));

  return (
    <div className="h-full min-h-0 bg-gray-100">
      <div className="space-y-4 overflow-y-auto px-8 pt-17 pb-5">
        {mockHospitals.map((h) => (
          <HospitalCard
            key={h.id}
            img={h.img}
            name={h.name}
            status={h.status}
            time={h.time}
            distance={h.distance}
            phoneNumber={h.phoneNumber}
            rating={h.rating}
            reviews={h.reviews}
            kinds={h.kinds}
            onClick={() => navigate('/index/hospitals/detail')}
          />
        ))}
      </div>
    </div>
  );
}
