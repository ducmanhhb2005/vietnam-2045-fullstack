import { ArrowRight } from 'lucide-react';

export default function RoleSelect({ roles, onSelect }) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="light-card w-full rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-600">Chọn nhân vật</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Bạn muốn nhập vai thành ai?</h2>
          <p className="mt-4 text-slate-600">Mỗi lựa chọn sẽ tạo nên hành trình khác nhau và ảnh hưởng đến kết quả cuối cùng.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {roles.map((role) => (
            <button
              key={role.slug}
              onClick={() => onSelect(role)}
              className={`group min-h-[25rem] overflow-hidden rounded-[1.8rem] bg-gradient-to-br ${role.accent} p-[1px] text-left shadow-xl transition hover:-translate-y-2`}
            >
              <div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-slate-950/20 p-6 text-white backdrop-blur-sm">
                <div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-6xl shadow-2xl backdrop-blur">
                    {role.icon}
                  </div>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-white/70">{role.subtitle}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight">{role.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/82">{role.description}</p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                  Bắt đầu với vai này
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
          💡 Mỗi lựa chọn của bạn sẽ tạo nên hành trình khác nhau!
        </div>
      </div>
    </section>
  );
}
