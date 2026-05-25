import { Download, Facebook, RotateCcw, Send, Share2 } from 'lucide-react';

function scoreItems(score) {
  return [
    { label: 'Công dân số', value: score.digitalScore, icon: '🤖' },
    { label: 'Sáng tạo', value: score.innovationScore, icon: '🚀' },
    { label: 'Tiên phong', value: score.pioneerScore, icon: '🔥' },
    { label: 'Tri thức', value: score.knowledgeScore, icon: '📚' },
    { label: 'Xanh', value: score.greenScore, icon: '🌱' },
    { label: 'Quiz', value: score.quizScore, icon: '🧠' }
  ];
}

export default function ResultScreen({ result, onRestart }) {
  if (!result) return null;

  const { profile, score, role } = result;
  const shareText = `Tôi vừa hoàn thành hành trình Việt Nam 2045 và nhận kết quả: ${profile.title}! #Vietnam2045 #DangSoiDuong2026`;

  async function shareResult() {
    if (navigator.share) {
      await navigator.share({ title: 'Việt Nam 2045 - Bạn sẽ là ai?', text: shareText, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Đã copy nội dung chia sẻ!');
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
    alert('Đã copy kết quả để chia sẻ!');
  }

  function downloadCard() {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 1600;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.45, '#1d4ed8');
    gradient.addColorStop(1, '#b91c1c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    for (let i = 0; i < 40; i += 1) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 5 + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 42px Arial';
    ctx.fillText('VIỆT NAM 2045', width / 2, 160);

    ctx.font = 'bold 88px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(profile.icon, width / 2, 325);

    ctx.font = 'bold 70px Arial';
    wrapText(ctx, profile.badge, width / 2, 470, 930, 84);

    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    ctx.font = '32px Arial';
    wrapText(ctx, profile.subtitle, width / 2, 700, 900, 46);

    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    roundRect(ctx, 140, 880, 920, 320, 42);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px Arial';
    ctx.fillText('Tổng điểm hành trình', width / 2, 970);
    ctx.font = 'bold 96px Arial';
    ctx.fillText(String(score.totalScore), width / 2, 1090);

    ctx.fillStyle = '#bfdbfe';
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`#Vietnam2045  #DangSoiDuong2026`, width / 2, 1390);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText('Học mà chơi - Chơi mà học - Cùng kiến tạo tương lai', width / 2, 1450);

    const link = document.createElement('a');
    link.download = `vietnam-2045-${profile.slug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="result-card-bg overflow-hidden rounded-[2.2rem] p-7 shadow-2xl sm:p-10">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Chúc mừng bạn!</span>
            <span>Vai: {role?.title}</span>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border-4 border-yellow-300 bg-yellow-400/20 text-8xl shadow-glow backdrop-blur">
              {profile.icon}
            </div>
          </div>
          <p className="mt-10 text-center text-sm font-bold uppercase tracking-[0.35em] text-yellow-200">Bạn là</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-4xl font-black leading-tight text-white sm:text-5xl">
            {profile.badge}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-white/82">{profile.headline}</p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <button onClick={shareResult} className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-500">
              <Share2 size={18} /> Chia sẻ kết quả
            </button>
            <button onClick={downloadCard} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-slate-950 hover:bg-blue-50">
              <Download size={18} /> Tải ảnh kết quả
            </button>
          </div>
        </div>

        <div className="light-card rounded-[2.2rem] p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">Phân tích hành trình</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950">{profile.title}</h3>
          <p className="mt-4 text-slate-600 leading-7">{profile.description}</p>
          <div className="mt-5 rounded-2xl bg-blue-50 p-5 text-blue-900">
            <p className="font-black">Gợi ý tiếp theo</p>
            <p className="mt-2 leading-7">{profile.recommendation}</p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {scoreItems(score).map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-2xl font-black text-slate-950">{item.value}</span>
                </div>
                <p className="mt-2 text-sm font-bold text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-slate-900 hover:bg-slate-50"
            >
              <Facebook size={18} /> Facebook
            </a>
            <button onClick={copyResult} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-slate-900 hover:bg-slate-50">
              <Send size={18} /> Copy caption
            </button>
            <button onClick={onRestart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800">
              <RotateCcw size={18} /> Chơi lại
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n += 1) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
