import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';

export default function QuizScreen({ question, currentIndex, total, selectedOption, onSelect, onNext, isSubmitting }) {
  const progress = ((currentIndex + 1) / total) * 100;
  const hasSelected = Boolean(selectedOption);
  const explanation = selectedOption
    ? selectedOption.isCorrect
      ? question.explanationCorrect
      : question.explanationWrong
    : '';

  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="light-card w-full rounded-[2rem] p-6 sm:p-10">
        <ProgressBar value={progress} label={`Quiz nhanh ${currentIndex + 1}/${total}`} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600">Kiểm tra kiến thức</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{question.text}</h2>

            <div className="mt-8 grid gap-3">
              {question.options.map((option) => {
                const isChosen = selectedOption?.id === option.id;
                const showCorrect = hasSelected && option.isCorrect;
                const showWrong = isChosen && !option.isCorrect;

                return (
                  <button
                    key={option.id}
                    disabled={hasSelected}
                    onClick={() => onSelect(option)}
                    className={`choice-btn flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                      showCorrect
                        ? 'border-emerald-400 bg-emerald-50'
                        : showWrong
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50'
                    } ${hasSelected ? 'cursor-default' : ''}`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-black ${showCorrect ? 'bg-emerald-500 text-white' : showWrong ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-800'}`}>
                      {option.label}
                    </span>
                    <span className="flex-1 font-semibold text-slate-900">{option.text}</span>
                    {showCorrect && <CheckCircle2 className="text-emerald-500" size={22} />}
                    {showWrong && <XCircle className="text-red-500" size={22} />}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-red-950 p-6 text-white">
            <div className="text-6xl">🧠</div>
            <h3 className="mt-8 text-2xl font-black">Ghi nhớ nhanh</h3>
            <p className="mt-4 text-sm leading-6 text-white/75">
              Các câu hỏi giúp củng cố thông điệp về khoa học công nghệ, đổi mới sáng tạo, chuyển đổi số và trách nhiệm công dân số.
            </p>

            {hasSelected && (
              <div className="mt-6 rounded-2xl bg-white/12 p-4 text-sm font-semibold leading-6 text-white/90">
                {explanation}
              </div>
            )}

            <button
              disabled={!hasSelected || isSubmitting}
              onClick={onNext}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 font-bold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Đang tính kết quả...' : currentIndex === total - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
              <ArrowRight size={18} />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
