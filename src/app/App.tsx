import React from 'react';
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

export default function App() {
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
          <WrongQuestionReview />
        </div>
      </div>
    </AppErrorBoundary>
  );
}
