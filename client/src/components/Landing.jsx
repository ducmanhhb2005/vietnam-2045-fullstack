import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-100 backdrop-blur">
          <Sparkles size={17} className="text-yellow-300" />
          Nhập vai • Trải nghiệm • Khám phá vai trò của bạn
        </div>

        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-red-200">Năm 2045</p>
          <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            VIỆT NAM 2045
            <span className="mt-3 block bg-gradient-to-r from-yellow-200 via-white to-sky-200 bg-clip-text text-transparent">
              BẠN SẼ LÀ AI?
            </span>
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-blue-50/85">
            Trải nghiệm hành trình công dân tương lai qua nhập vai, tình huống thực tế và mini quiz về khoa học công nghệ, đổi mới sáng tạo, chuyển đổi số và trách nhiệm của thanh niên.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-4 text-base font-bold text-white shadow-glow transition hover:scale-[1.02]"
          >
            Bắt đầu hành trình
            <ArrowRight className="transition group-hover:translate-x-1" size={20} />
          </button>
          <a
            href="#preview"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 font-semibold text-white/90 backdrop-blur hover:bg-white/15"
          >
            Xem minh họa
            <ChevronDown size={18} />
          </a>
        </div>
      </div>

      <div id="preview" className="grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="glass-card rounded-[2rem] p-5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-950 via-blue-900 to-red-950 p-6">
            <div className="mb-20 flex justify-between text-xs text-white/60">
              <span>Trang chủ</span>
              <span>Việt Nam 2045</span>
            </div>
            <p className="text-center text-sm uppercase tracking-[0.35em] text-blue-100">VIỆT NAM 2045</p>
            <h3 className="mt-2 text-center text-3xl font-black">Bạn sẽ là ai?</h3>
            <button className="mx-auto mt-8 block rounded-full bg-red-600 px-5 py-2 text-sm font-bold">Bắt đầu</button>
          </div>
        </div>

        <div className="light-card rounded-[2rem] p-5">
          <p className="text-sm font-bold text-slate-500">Kết quả cá nhân hóa</p>
          <div className="mt-5 rounded-[1.5rem] bg-gradient-to-br from-yellow-300 via-red-500 to-blue-900 p-5 text-white">
            <div className="text-6xl">🏅</div>
            <p className="mt-8 text-sm text-white/80">Chúc mừng bạn!</p>
            <h3 className="mt-1 text-2xl font-black">Công dân số tiên phong</h3>
            <p className="mt-3 text-sm text-white/75">Bạn đã hoàn thành hành trình và sẵn sàng kiến tạo tương lai số.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
