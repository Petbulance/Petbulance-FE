import NearbyHospitalShortcut from '@/components/user/home/NearbyHospitalShortcut.jsx';
import HomeBanner from '@/components/user/home/HomeBanner.jsx';
import LatestReceiptReview from '@/components/user/home/LatestReceiptReview.jsx';
import PopularPostList from '@/components/user/home/PopularPostList.jsx';

export default function Home() {
  return (
    <div className="space-y-6 px-4 py-4 bg-white">
      <NearbyHospitalShortcut />
      <HomeBanner />
      <LatestReceiptReview />
      <PopularPostList />
    </div>
  );
}
