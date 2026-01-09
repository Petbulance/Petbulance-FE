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
}) {
  return (
    <HosipitalDetailWrap>
      <HosipitalDetail
        img={img}
        name={name}
        status={status}
        time={time}
        distance={distance}
        phoneNumber={phoneNumber}
        rating={rating}
        reviews={reviews}
        kinds={kinds}
      />
    </HosipitalDetailWrap>
  );
}
