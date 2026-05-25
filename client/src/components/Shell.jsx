export default function Shell({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute right-[-10rem] top-24 h-[30rem] w-[30rem] rounded-full bg-red-600/25 blur-3xl" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="city-silhouette" />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
