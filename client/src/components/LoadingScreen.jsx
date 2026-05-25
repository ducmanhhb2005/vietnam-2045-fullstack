export default function LoadingScreen({ error, onRetry }) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl items-center justify-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="glass-card w-full rounded-[2rem] p-8 text-center">
        {error ? (
          <>
            <div className="text-6xl">⚠️</div>
            <h2 className="mt-5 text-3xl font-black">Không kết nối được backend</h2>
            <p className="mt-3 text-white/75">{error}</p>
            <p className="mt-4 text-sm text-white/60">Hãy kiểm tra server Express ở http://localhost:4000 rồi thử lại.</p>
            <button onClick={onRetry} className="mt-7 rounded-full bg-white px-6 py-3 font-bold text-slate-950">Thử lại</button>
          </>
        ) : (
          <>
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            <h2 className="mt-6 text-3xl font-black">Đang tải hành trình...</h2>
            <p className="mt-3 text-white/70">Đang lấy dữ liệu nhân vật, tình huống và quiz từ API.</p>
          </>
        )}
      </div>
    </section>
  );
}
