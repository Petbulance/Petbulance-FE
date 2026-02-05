import { HosipitalDetail } from './HospitalDetail';
import { HosipitalDetailWrap } from './HospitalDetailWrap';

export function HospitalCard({
  img,
  name,
  status,
  time,
  lat,
  lng,
  userLat,
  userLng,
  // distance,
  phoneNumber,
  rating,
  reviews,
  kinds = [],
  onClick,
}) {
  return (
    <HosipitalDetailWrap onClick={onClick}>
      <HosipitalDetail
        image={img}
        name={name}
        openNow={status}
        time={time}
        lat={lat}
        lng={lng}
        userLat={userLat}
        userLng={userLng}
        // distanceMeter={distance}
        phone={phoneNumber}
        overallRating={rating}
        reviewCount={reviews}
        acceptedAnimals={kinds}
      />
    </HosipitalDetailWrap>
  );
}
