import { ArrowLeft, BarChart3, Users } from 'lucide-react';

export default function AnalyticsScreen({ analytics, loading, onBack }) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="light-card w-full rounded-[2rem] p-6 sm:p-8">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200">
          <ArrowLeft size={16} /> Quay lại
        </button>

        <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-600">Dashboard demo</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Số liệu trải nghiệm</h2>
            <p className="mt-3 text-slate-600">Dữ liệu lấy trực tiếp từ bảng JourneySession trong Prisma database.</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg">
            <BarChart3 size={30} />
          </div>
        </div>

        {loading ? (
          <div className="mt-10 rounded-2xl bg-slate-100 p-8 text-center font-bold text-slate-600">Đang tải số liệu...</div>
        ) : analytics ? (
          <div className="mt-10 space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-slate-950 p-6 text-white">
                <Users size={28} className="text-blue-300" />
                <p className="mt-6 text-sm text-white/60">Tổng lượt hoàn thành</p>
                <p className="mt-1 text-4xl font-black">{analytics.totalSessions}</p>
              </div>
              <Metric title="Điểm trung bình" value={round(analytics.averageScore?.totalScore)} />
              <Metric title="Quiz trung bình" value={round(analytics.averageScore?.quizScore)} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-black text-slate-950">Phân bố kết quả</h3>
                <div className="mt-5 space-y-3">
                  {analytics.groupedProfiles?.length ? analytics.groupedProfiles.map((item) => (
                    <div key={item.resultTitle}>
                      <div className="mb-1 flex justify-between text-sm font-bold text-slate-700">
                        <span>{item.resultTitle}</span>
                        <span>{item.count}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                          style={{ width: `${Math.max(6, (item.count / analytics.totalSessions) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )) : <p className="text-slate-500">Chưa có dữ liệu. Hãy chơi thử một lượt.</p>}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-black text-slate-950">Lượt chơi gần nhất</h3>
                <div className="mt-5 space-y-3">
                  {analytics.latestSessions?.length ? analytics.latestSessions.map((session) => (
                    <div key={session.id} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex justify-between gap-3">
                        <p className="font-bold text-slate-950">{session.resultTitle}</p>
                        <p className="font-black text-blue-600">{session.totalScore}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">Vai: {session.roleTitle} • {new Date(session.createdAt).toLocaleString('vi-VN')}</p>
                    </div>
                  )) : <p className="text-slate-500">Chưa có lượt chơi nào.</p>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl bg-red-50 p-8 text-center font-bold text-red-700">Không tải được số liệu.</div>
        )}
      </div>
    </section>
  );
}

function Metric({ title, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-5 text-4xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function round(value) {
  if (value === null || value === undefined) return 0;
  return Number(value).toFixed(1);
}
