import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeedbackScreen({ choice, scenario, onNext, isLastScenario }) {
  const positive = Boolean(choice?.scoreValue);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="light-card w-full overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className={`rounded-[2rem] bg-gradient-to-br ${positive ? 'from-emerald-400 to-blue-600' : 'from-amber-400 to-red-500'} p-8 text-white shadow-2xl`}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-5xl backdrop-blur">
              {positive ? '✅' : '💡'}
            </div>
            <p className="mt-10 text-sm uppercase tracking-[0.35em] text-white/75">Lựa chọn {choice?.label}</p>
            <h2 className="mt-3 text-4xl font-black leading-tight">{choice?.feedbackTitle}</h2>
            <div className="mt-7 rounded-2xl bg-white/15 p-4 text-sm font-semibold leading-6 text-white/85">
              {scenario?.title}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <Sparkles size={16} /> Thông điệp liên hệ nghị quyết
            </div>
            <blockquote className="mt-6 rounded-3xl border-l-8 border-red-500 bg-slate-50 p-6 text-xl font-bold leading-9 text-slate-900">
              {choice?.feedback}
            </blockquote>
            <p className="mt-5 text-slate-600">
              Hành trình này giúp biến nội dung chính trị thành trải nghiệm gần gũi: bạn chọn, bạn nhận phản hồi, và bạn hiểu rõ hơn vai trò của mình trong tương lai đất nước.
            </p>
            <button
              onClick={onNext}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-4 font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              {isLastScenario ? 'Tiếp tục đến quiz' : 'Tiếp tục hành trình'}
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
