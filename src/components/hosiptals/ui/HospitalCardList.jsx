import { useNavigate } from 'react-router-dom';

import { HospitalCard } from '@/components/hosiptals/ui/HospitalCard/HospitalCard';

export function HospitalCardList({ hospitals }) {
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-0 bg-gray-100">
      <div className="space-y-4 overflow-y-auto px-8 pt-17 pb-5">
        {hospitals.map((h) => (
          <HospitalCard
            key={h.hospitalId}
            img={h.thumbnailUrl}
            name={h.name}
            status={h.isOpenNow}
            time={h.openHours}
            distance={(h.distanceMeters / 1000).toFixed(1)}
            phoneNumber={h.phone}
            rating={h.rating}
            reviews={h.reviewCount}
            kinds={h.types}
            onClick={() => navigate(`/index/hospitals/${h.hospitalId}`)}
          />
        ))}
      </div>
    </div>
  );
}
