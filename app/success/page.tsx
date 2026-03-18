export default function Success() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">You're Pro!</h1>
        <p className="text-gray-500 mb-6">Welcome to FantasyEdge Pro. You now have unlimited AI requests and all premium features.</p>
        <a href="/" className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
          Start Winning →
        </a>
      </div>
    </main>
  );
}