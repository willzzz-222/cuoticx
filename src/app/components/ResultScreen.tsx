import React from 'react';
import { motion } from 'motion/react';
import svgPaths from '../../imports/1/svg-7g4uuntaqn';

// ============ MASCOT SVG ============
function AIMascot() {
  return (
    <div className="absolute" style={{ left: '30px', bottom: '16px', width: '206px', height: '206px' }}>
      <svg viewBox="0 0 206 206" className="size-full" fill="none">
        <defs>
          <linearGradient id="rBodyGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0.72" stopColor="#EFF0FF" />
            <stop offset="1" stopColor="#C9CFF2" />
          </linearGradient>
          <linearGradient id="rShadow" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#DCF9FF" stopOpacity="0" />
            <stop offset="1" stopColor="#C0F4FF" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="rArmGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#e5e6ff" />
            <stop offset="1" stopColor="#cad0f3" />
          </linearGradient>
          <radialGradient id="rEyeGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0" stopColor="#9EA4EE" />
            <stop offset="1" stopColor="#6567C4" />
          </radialGradient>
          <filter id="shadowBlur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dy="-4" result="offsetBlur" />
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
            <feFlood floodColor="#9097E2" floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="shadowDiff" operator="in" result="shadow" />
            <feComposite in="SourceGraphic" in2="shadow" operator="over" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="100" cy="196" rx="56" ry="9" fill="rgba(124,119,171,0.18)" filter="url(#shadowBlur)" />

        {/* Body (using the body shape path concept) */}
        <ellipse cx="95" cy="142" rx="47" ry="54" fill="url(#rBodyGrad)" filter="url(#innerShadow)" />
        {/* Body highlight */}
        <ellipse cx="78" cy="115" rx="16" ry="22" fill="white" fillOpacity="0.25" transform="rotate(-20 78 115)" />

        {/* Left leg */}
        <path d="M72 182 C67 190 61 196 58 198 C65 200 76 198 78 192 Z" fill="#d5d9f2" />
        {/* Right leg */}
        <path d="M118 182 C123 190 129 196 132 198 C125 200 114 198 112 192 Z" fill="#d5d9f2" />

        {/* Neck */}
        <rect x="85" y="90" width="20" height="14" rx="4" fill="#d5d9f2" />

        {/* Head */}
        <ellipse cx="95" cy="72" rx="40" ry="32" fill="url(#rBodyGrad)" filter="url(#innerShadow)" />
        {/* Head highlight */}
        <ellipse cx="78" cy="58" rx="14" ry="10" fill="white" fillOpacity="0.3" transform="rotate(-15 78 58)" />

        {/* Left ear */}
        <ellipse cx="57" cy="72" rx="8" ry="12" fill="#d5d9f2" />
        {/* Right ear */}
        <ellipse cx="133" cy="72" rx="8" ry="12" fill="#d5d9f2" />

        {/* Antenna */}
        <line x1="95" y1="40" x2="95" y2="52" stroke="#b8bce8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="95" cy="37" r="5" fill="#b8bce8" />
        <circle cx="95" cy="37" r="2.5" fill="white" fillOpacity="0.6" />

        {/* Left eye */}
        <ellipse cx="80" cy="68" rx="9" ry="9" fill="url(#rEyeGrad)" />
        <ellipse cx="77" cy="64" rx="3.5" ry="3.5" fill="white" fillOpacity="0.8" />
        <circle cx="82" cy="70" r="2" fill="white" fillOpacity="0.4" />

        {/* Right eye */}
        <ellipse cx="110" cy="68" rx="9" ry="9" fill="url(#rEyeGrad)" />
        <ellipse cx="107" cy="64" rx="3.5" ry="3.5" fill="white" fillOpacity="0.8" />
        <circle cx="112" cy="70" r="2" fill="white" fillOpacity="0.4" />

        {/* Mouth (happy curve) */}
        <path d="M84 80 Q95 89 106 80" stroke="#9097c8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Cheek blush left */}
        <ellipse cx="68" cy="78" rx="7" ry="4" fill="#ffb8c0" fillOpacity="0.35" />
        {/* Cheek blush right */}
        <ellipse cx="122" cy="78" rx="7" ry="4" fill="#ffb8c0" fillOpacity="0.35" />

        {/* Left arm */}
        <ellipse cx="51" cy="138" rx="9" ry="26" fill="url(#rArmGrad)" transform="rotate(-10 51 138)" />

        {/* Right arm (waving) */}
        <path d="M142 128 C150 112 158 102 165 88 C168 82 165 76 160 78 C155 80 152 88 148 98 C144 108 141 120 142 128 Z" fill="url(#rArmGrad)" />
        {/* Waving hand */}
        <ellipse cx="162" cy="83" rx="11" ry="13" fill="url(#rBodyGrad)" transform="rotate(-20 162 83)" />
        <ellipse cx="159" cy="77" rx="5" ry="3" fill="white" fillOpacity="0.3" />

        {/* Belly button / sensor */}
        <rect x="84" y="145" width="22" height="14" rx="7" fill="#d5d9f2" />
        <circle cx="95" cy="152" r="3" fill="#b8bce8" />

        {/* Highlight on arm wave */}
        <ellipse cx="156" cy="92" rx="5" ry="9" fill="white" fillOpacity="0.2" transform="rotate(-25 156 92)" />
      </svg>
    </div>
  );
}

// ============ INSIGHT ICON COMPONENTS ============
function CoreDiagIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <div className="absolute inset-0 rounded-[10px] flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, #30c9b0, #54f5bf)' }}>
        <svg width="15.6" height="15.6" viewBox="0 0 15.6 15.6" fill="none">
          <path d="M0.65 12.35H14.95" stroke="white" strokeLinecap="round" strokeWidth="1.3" />
          <rect x="0.65" y="5.2" width="2" height="7.15" fill="white" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
          <rect x="4.95" y="0.65" width="2" height="11.7" fill="white" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
          <rect x="9.25" y="3.25" width="2" height="9.1" fill="white" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function PraiseIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <div className="absolute inset-0 rounded-[8.667px] flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, #ffc884, #ffd248)' }}>
        <svg width="15.6" height="15.6" viewBox="0 0 15.6 15.6" fill="none">
          <path d={svgPaths.p186e0980} fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" transform="scale(0.65)" />
          <path d={svgPaths.p302a4880} fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" transform="translate(3.5, 1.5) scale(0.6)" />
        </svg>
      </div>
    </div>
  );
}

function PlanIcon() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <div className="absolute inset-0 rounded-[10px] flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, #4ebdfc, #63edff)' }}>
        <svg width="15.6" height="15.6" viewBox="0 0 15.6 15.6" fill="none">
          <path d={svgPaths.p1e5d0800} fill="white" transform="scale(0.8) translate(1, 0.5)" />
        </svg>
      </div>
    </div>
  );
}

// ============ RESULT SCREEN ============
interface QuestionResult {
  index: number; // 0-based question index
  id: number;
  isCorrect: boolean;
  isRevealed: boolean;
  isSubmitted: boolean;
}

interface ResultScreenProps {
  questions: Array<{ id: number; type: string }>;
  questionResults: QuestionResult[];
  onGoToQuestion: (index: number) => void;
  onWrongDetail: () => void;
  onBack: () => void;
}

export function ResultScreen({ questions, questionResults, onGoToQuestion, onWrongDetail, onBack }: ResultScreenProps) {
  const correctCount = questionResults.filter(r => r.isCorrect).length;
  const total = questions.length;

  return (
    <div className="w-[1280px] h-[800px] bg-[#e3e9ff] relative overflow-hidden">
      {/* Nav */}
      <div className="absolute top-0 left-0 w-[1280px] h-[56px] bg-[#E3E9FF] flex items-center justify-center px-[30px]">
        <button
          onClick={onBack}
          className="absolute left-[30px] w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.08)] transition-all"
        >
          <svg width="19.258" height="17.428" viewBox="0 0 19.258 17.4284" fill="none">
            <path d={svgPaths.p2cbb90f0} fill="#33347C" />
          </svg>
        </button>
        <span className="text-[#33347c] text-[24px]" style={{ fontWeight: 600 }}>本次做题情况</span>
      </div>

      {/* Content */}
      <div className="absolute left-[24px] top-[72px] w-[1232px] h-[712px] flex gap-[8px]">

        {/* ========== LEFT PANEL ========== */}
        <div className="bg-white flex-1 h-full rounded-[24px] overflow-hidden relative">
          <div className="flex flex-col gap-[24px] p-[24px] h-full">
            {/* Student header */}
            <div className="flex flex-col gap-[4px]">
              <span className="text-[#303133] text-[22px]" style={{ fontWeight: 600 }}>
                同学在本次错题中：
              </span>
              <span className="text-[#606266] text-[15px]">做题时长：15 分钟</span>
            </div>

            {/* Insights */}
            <div className="flex flex-col gap-[16px] w-full" style={{ maxWidth: '498px' }}>
              {/* 核心诊断 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px]">
                  <CoreDiagIcon />
                  <span className="text-[#414559] text-[16px]" style={{ fontWeight: 500 }}>核心诊断</span>
                </div>
                <p className="text-[#606266] text-[15px] leading-[24px]">
                  {correctCount === total
                    ? '本次练习全部答对，掌握情况良好！'
                    : `本次练习共答错 ${total - correctCount} 题，需要重点关注相关知识点的理解与应用。`}
                </p>
              </div>

              {/* 亮点表扬 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px]">
                  <PraiseIcon />
                  <span className="text-[#414559] text-[16px]" style={{ fontWeight: 500 }}>亮点表扬</span>
                </div>
                <p className="text-[#606266] text-[15px] leading-[24px]">
                  {correctCount >= Math.ceil(total * 0.7)
                    ? '你在解题过程中思路清晰，书写规范整洁，继续保持！'
                    : '认真完成了全部题目，学习态度值得肯定，继续努力！'}
                </p>
              </div>

              {/* 提分方案 */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px]">
                  <PlanIcon />
                  <span className="text-[#414559] text-[16px]" style={{ fontWeight: 500 }}>提分方案</span>
                </div>
                <p className="text-[#606266] text-[15px] leading-[24px]">
                  建议针对错题进行专项训练，AI 已为你准备好对应题目，点击「AI 推题」开始练习。
                </p>
              </div>
            </div>
          </div>

          {/* Robot mascot */}
          <AIMascot />
        </div>

        {/* ========== RIGHT PANEL ========== */}
        <div
          className="bg-white h-full rounded-[24px] overflow-hidden flex flex-col justify-between"
          style={{ width: '677.6px' }}
        >
          {/* Grading area */}
          <div className="flex flex-col gap-[24px] px-[20px] py-[16px] flex-1 overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between shrink-0">
              <div className="flex items-center gap-[12px]">
                <div className="bg-[#f5b327] h-[24px] rounded-[118.8px] w-[6px]" />
                <span className="text-[#303133] text-[22px]" style={{ fontWeight: 700 }}>批改结果</span>
              </div>
              <div className="flex items-center gap-[24px]">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#9bcc37]" />
                  <span className="text-[#a8abb2] text-[18px]">正确</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#ff5c5c]" />
                  <span className="text-[#a8abb2] text-[18px]">错误</span>
                </div>
              </div>
            </div>

            {/* Question circles grid */}
            <div className="content-start flex flex-wrap gap-[24px] items-start overflow-y-auto flex-1 relative">
              {/* Scrollbar track */}
              {questions.map((q, idx) => {
                const result = questionResults.find(r => r.id === q.id);
                const isCorrect = result?.isCorrect ?? false;
                const isSubmitted = result?.isSubmitted ?? false;
                const bg = isSubmitted
                  ? (isCorrect ? '#9bcc37' : '#ff7366')
                  : '#c0c4cc';

                return (
                  <motion.button
                    key={q.id}
                    onClick={() => onGoToQuestion(idx)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center rounded-[72px] shrink-0 size-[40px] cursor-pointer"
                    style={{ background: bg }}
                  >
                    <span className="text-white text-[22px]" style={{ fontWeight: 500 }}>
                      {idx + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="bg-white shrink-0 flex items-center justify-end gap-[16px] p-[24px]"
            style={{ borderTop: "1px solid #f3f4f6" }}>
            <button
              onClick={onWrongDetail}
              className="flex items-center justify-center px-[32px] py-[13px] rounded-[40px] w-[232px] transition-all hover:bg-[#eceeff]"
              style={{
                background: "#f4f4ff",
                border: "1px solid #7f85ff",
              }}
            >
              <span className="text-[#7f85ff] text-[18px]" style={{ fontWeight: 500 }}>错题解析</span>
            </button>
            <button
              className="flex items-center justify-center px-[80px] h-[50px] rounded-[90px] transition-all hover:opacity-90"
              style={{ background: "#7f85ff" }}
            >
              <span className="text-white text-[18px]" style={{ fontWeight: 500 }}>AI推题</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
