import { useNavigate } from 'react-router-dom';

import { HospitalCard } from './HospitalCard';

export function HospitalInfoSlide({ hospitals, selectedHospital }) {
  const navigate = useNavigate();

  const displayList = selectedHospital ? [selectedHospital] : hospitals;

  if (displayList.length === 0) return null;

  console.log('병원검색 병원카드', hospitals);

  return (
    <div className="absolute right-0 bottom-4 left-0 z-50 flex flex-col items-center gap-2">
      <div className="no-scrollbar flex w-full gap-3 overflow-x-auto px-[25.72px] pb-2">
        {displayList.map((card) => (
          <div key={card.hospitalId} className="flex-shrink-0">
            <HospitalCard
              img={card.image}
              name={card.name}
              status={card.isOpenNow}
              time={card.openHours}
              distance={card.distanceMeters}
              phoneNumber={card.phone}
              rating={card.rating}
              reviews={card.reviewCount}
              kinds={card.types}
              onClick={() => navigate(`/index/hospitals/${card.hospitalId}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
