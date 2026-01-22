import HomeBanner from '@/components/user/home/HomeBanner.jsx';
import LatestReceiptReview from '@/components/user/home/LatestReceiptReview.jsx';
import NearbyHospitalShortcut from '@/components/user/home/NearbyHospitalShortcut.jsx';
import PopularPostList from '@/components/user/home/PopularPostList.jsx';

export default function Home() {
  return (
    <div className="space-y-6 bg-white px-[24px] py-[24px]">
      <NearbyHospitalShortcut />
      <HomeBanner />
      <LatestReceiptReview />
      {/*<PopularPostList />*/}
    </div>
  );
}
