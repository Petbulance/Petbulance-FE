import spinnerImage from '@/assets/images/Spinner.png';

export default function Spinner({ fullScreen = false, message }) {
  return (
    <div
      className={`${
        fullScreen ? 'fixed inset-0 z-50 bg-white/70' : 'w-full py-10'
      } flex items-center justify-center`}
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src={spinnerImage}
          alt="loading"
          className="h-12 w-12 animate-spin"
        />
        {message ? <p className="text-sm text-gray-500">{message}</p> : null}
      </div>
    </div>
  );
}
