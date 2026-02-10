import { useNavigate } from 'react-router-dom';

import { HospitalCard } from '@/components/hosiptals/ui/HospitalCard/HospitalCard';

export function HospitalCardList({ hospitals, userLat, userLng, fromScreen }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    console.log('스크린', fromScreen);
    navigate(`/index/hospitals/${id}`, {
      state: { from_screen: fromScreen },
    });
  };

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
            onClick={() => handleCardClick(h.hospitalId)}
          />
        ))}
      </div>
    </div>
  );
}
