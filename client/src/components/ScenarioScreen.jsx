import { CheckCircle2 } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';

export default function ScenarioScreen({ scenario, currentIndex, total, role, onChoose }) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="grid w-full items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card overflow-hidden rounded-[2rem] p-6">
          <div className="rounded-[1.6rem] bg-gradient-to-br from-blue-950 via-slate-900 to-red-950 p-6">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Vai trò của bạn</span>
              <span>{role?.icon}</span>
            </div>
            <h2 className="mt-3 text-3xl font-black">{role?.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">{role?.description}</p>

            <div className="mt-10 flex min-h-[17rem] items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/10 text-8xl shadow-inner">
              {scenario.icon}
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/78">
              {scenario.context}
            </div>
          </div>
        </div>

        <div className="light-card rounded-[2rem] p-6 sm:p-8">
          <ProgressBar value={progress} label={`Tình huống ${currentIndex + 1}/${total}`} />
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Hành trình của bạn</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{scenario.title}</h1>
          <p className="mt-5 rounded-2xl bg-slate-100 p-5 text-lg font-semibold leading-8 text-slate-800">
            {scenario.prompt}
          </p>

          <div className="mt-7 grid gap-4">
            {scenario.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onChoose(choice)}
                className="choice-btn flex items-start gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm hover:border-blue-400 hover:bg-blue-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
                  {choice.label}
                </span>
                <span>
                  <span className="block text-base font-bold text-slate-950">{choice.text}</span>
                  <span className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 size={15} /> Chọn để xem thông điệp
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
