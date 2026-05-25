import { BarChart3, Home, RotateCcw } from 'lucide-react';

export default function Header({ onHome, onAnalytics, onRestart, compact = false }) {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
      <button onClick={onHome} className="flex items-center gap-3 text-left">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-xl shadow-glow">
          🇻🇳
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-100/80">Cờ Đảng</p>
          <h1 className="text-lg font-black leading-tight text-white sm:text-xl">Việt Nam 2045</h1>
        </div>
      </button>

      {!compact && (
        <nav className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1 text-sm text-blue-50 backdrop-blur md:flex">
          <button onClick={onHome} className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-white/15">
            <Home size={16} /> Trang chủ
          </button>
          <button onClick={onAnalytics} className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-white/15">
            <BarChart3 size={16} /> Số liệu
          </button>
          <button onClick={onRestart} className="flex items-center gap-2 rounded-full px-4 py-2 hover:bg-white/15">
            <RotateCcw size={16} /> Chơi lại
          </button>
        </nav>
      )}
    </header>
  );
}
