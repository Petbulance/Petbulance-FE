import { useNavigate } from 'react-router-dom';

import { HospitalCard } from '@/components/hosiptals/ui/HospitalCard/HospitalCard';

export function HospitalCardList({ hospitals, userLat, userLng }) {
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-0">
      <div className="space-y-4 overflow-y-auto px-8 pt-17 pb-5">
        {hospitals.map((h) => (
          <HospitalCard
            key={h.hospitalId}
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
        ))}
      </div>
    </div>
  );
}
