export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center font-sans">
      <div className="text-center">
        <div className="relative size-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-neutral-900 font-bold text-lg">Now Loading...</p>
      </div>
    </div>
  );
}