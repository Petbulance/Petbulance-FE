import ReviewList from '@/components/user/my/reviewManage/ReviewList.jsx';

export default function ReviewManage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <main className="flex-1 overflow-y-auto">
        <ReviewList />
      </main>
    </div>
  );
}
