import React from 'react';
import { ArrowLeft, BarChart3, Camera, ChevronRight, ClipboardList, Sparkles } from 'lucide-react';
import { WrongQuestionReview } from './components/WrongQuestionReview';

class AppErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { error: Error | null }
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('App runtime error:', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="w-screen h-screen bg-[#f6f7fb] flex items-center justify-center p-6">
          <div className="w-full max-w-[900px] bg-white rounded-2xl border border-[#e6e8f0] shadow-sm p-6">
            <div className="text-[#e03131] text-[18px] font-semibold">页面运行出错</div>
            <pre className="mt-3 text-[13px] leading-6 text-[#333] whitespace-pre-wrap break-all">
              {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function WrongBookHome({ onEnterReview }: { onEnterReview: () => void }) {
  const cardClass =
    'h-[110px] rounded-[18px] border border-[#79a8ff] bg-[linear-gradient(180deg,#2f43b8_0%,#2337a2_100%)] px-[18px] flex items-center justify-between text-white';

  return (
    <div className="w-[1280px] h-[800px] relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#2d3fb3_0%,#1b2678_45%,#12184f_100%)]">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,#4e68ff_0%,transparent_45%)]" />

      <div className="absolute top-[24px] left-[24px] w-[52px] h-[52px] rounded-full bg-[#7aa3ff] text-white flex items-center justify-center">
        <ArrowLeft className="w-[30px] h-[30px]" />
      </div>

      <div className="absolute left-[620px] top-[56px] right-[20px] bottom-[20px] rounded-[24px] border border-[#6786ff] bg-[linear-gradient(180deg,#2f3ca0_0%,#252f89_100%)] p-[22px]">
        <div className="flex items-center justify-end">
          <button className="h-[46px] px-[20px] rounded-[24px] border border-[#7da8ff] text-white/95 text-[24px] flex items-center gap-[8px] bg-[rgba(109,154,255,0.22)]">
            <BarChart3 className="w-[22px] h-[22px]" />
            学科报告
          </button>
        </div>

        <div className="mt-[26px] grid grid-cols-2 gap-[18px]">
          <div className="rounded-[18px] border border-[#648ef6] bg-[rgba(88,119,255,0.16)] p-[18px] text-white">
            <div className="text-[52px] leading-none" style={{ fontWeight: 700 }}>25题</div>
            <div className="text-[24px] text-white/80 mt-[6px]">新增错题</div>
          </div>
          <div className="rounded-[18px] border border-[#648ef6] bg-[rgba(88,119,255,0.16)] p-[18px] text-white">
            <div className="text-[52px] leading-none" style={{ fontWeight: 700 }}>30题</div>
            <div className="text-[24px] text-white/80 mt-[6px]">高频错题</div>
          </div>
        </div>

        <div className="mt-[18px] grid grid-cols-2 gap-[18px]">
          <button onClick={onEnterReview} className={`${cardClass} hover:opacity-95 transition-opacity`}>
            <div>
              <div className="text-[42px]" style={{ fontWeight: 700 }}>错题重刷</div>
              <div className="text-[20px] leading-[1.15] text-white/80 mt-[2px]">巩固练习，查缺补漏</div>
            </div>
            <ChevronRight className="w-[34px] h-[34px]" />
          </button>

          <button className={cardClass}>
            <div>
              <div className="text-[42px]" style={{ fontWeight: 700 }}>AI推题</div>
              <div className="text-[20px] leading-[1.15] text-white/80 mt-[2px]">AI智能变式训练</div>
            </div>
            <Sparkles className="w-[34px] h-[34px]" />
          </button>

          <button className={cardClass}>
            <div>
              <div className="text-[42px]" style={{ fontWeight: 700 }}>拍照录题</div>
              <div className="text-[20px] leading-[1.15] text-white/80 mt-[2px]">一拍即录</div>
            </div>
            <Camera className="w-[34px] h-[34px]" />
          </button>

          <button className={cardClass}>
            <div>
              <div className="text-[42px]" style={{ fontWeight: 700 }}>全部错题</div>
              <div className="text-[20px] leading-[1.15] text-white/80 mt-[2px]">错题合集</div>
            </div>
            <ClipboardList className="w-[34px] h-[34px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = React.useState<'home' | 'review'>('home');

  return (
    <AppErrorBoundary>
      <div className="w-screen h-screen bg-[#b8c4e8] flex items-center justify-center overflow-hidden">
        <div
          className="relative overflow-hidden"
          style={{
            width: '1280px',
            height: '800px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          {page === 'home' ? (
            <WrongBookHome onEnterReview={() => setPage('review')} />
          ) : (
            <WrongQuestionReview onExitToHome={() => setPage('home')} />
          )}
        </div>
      </div>
    </AppErrorBoundary>
  );
}
