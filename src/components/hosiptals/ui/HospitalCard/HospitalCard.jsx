import { HosipitalDetail } from './HospitalDetail';
import { HosipitalDetailWrap } from './HospitalDetailWrap';

export function HospitalCard({
  img,
  name,
  status,
  time,
  distance,
  phoneNumber,
  rating,
  reviews,
  kinds = [],
  onClick,
}) {
  return (
    <HosipitalDetailWrap onClick={onClick}>
      <HosipitalDetail
        img={img}
        name={name}
        openNow={status}
        time={time}
        distanceMeter={distance}
        phone={phoneNumber}
        overallRating={rating}
        reviewCount={reviews}
        acceptedAnimals={kinds}
      />
    </HosipitalDetailWrap>
  );
}
