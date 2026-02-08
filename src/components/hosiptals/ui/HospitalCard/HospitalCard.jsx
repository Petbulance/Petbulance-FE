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
  tags,
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
        tags={tags}
        phone={phoneNumber}
        overallRating={rating}
        reviewCount={reviews}
        acceptedAnimals={kinds}
      />
    </HosipitalDetailWrap>
  );
}
