import React, { useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BarChart3, ThumbsUp, FileText } from 'lucide-react';

interface QuestionResult {
  index: number;
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

function formatSubmitTime(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${day} ${h}:${min}`;
}

function SemiGauge({ correct, total }: { correct: number; total: number }) {
  const ratio = total > 0 ? correct / total : 0;
  const cx = 170;
  const cy = 160;
  const r = 118;
  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;
  const angle = Math.PI * (1 - ratio);
  const progressX = cx + r * Math.cos(angle);
  const progressY = cy - r * Math.sin(angle);

  const largeArc = ratio > 0.5 ? 1 : 0;
  const arcEndX = progressX;
  const arcEndY = progressY;

  const progressPath = `M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${arcEndX} ${arcEndY}`;
  const bgPath = `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`;

  return (
    <div className="relative w-[340px] h-[220px] mx-auto mt-[6px]">
      <svg width="340" height="220" viewBox="0 0 340 220" fill="none">
        <path d={bgPath} stroke="#DFE2F5" strokeWidth="16" strokeLinecap="round" />
        <path d={progressPath} stroke="#7B83E9" strokeWidth="16" strokeLinecap="round" />
        <circle cx={progressX} cy={progressY} r="13" fill="#7B83E9" stroke="#ffffff" strokeWidth="6" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-[22px]">
        <div className="text-[18px] text-[#9aa0ad]">答对</div>
        <div className="text-[58px] leading-[1] text-[#2f3340]" style={{ fontWeight: 700 }}>{correct}</div>
        <div className="text-[18px] text-[#9aa0ad]">/{total}</div>
      </div>
    </div>
  );
}

export function ResultScreen({ questions, questionResults, onGoToQuestion, onWrongDetail, onBack }: ResultScreenProps) {
  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const wrongCount = questionResults.filter((r) => r.isSubmitted && !r.isCorrect).length;
  const total = questions.length;
  const submitAtRef = useRef(new Date());

  const totalMinutes = useMemo(() => {
    const estimatedSeconds = Math.max(60, total * 32);
    return `${Math.ceil(estimatedSeconds / 60)}分钟`;
  }, [total]);

  return (
    <div className="w-[1280px] h-[800px] bg-[#e3e9ff] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[1280px] h-[56px] bg-[#E3E9FF] flex items-center justify-center px-[30px]">
        <button
          onClick={onBack}
          className="absolute left-[30px] w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.08)]"
        >
          <ArrowLeft className="w-[22px] h-[22px] text-[#33347C]" />
        </button>
        <span className="text-[#33347c] text-[18px]" style={{ fontWeight: 700 }}>答题报告</span>
      </div>

      <div className="absolute left-[24px] top-[72px] w-[1232px] h-[712px] flex gap-[8px]">
        <div className="bg-white h-full rounded-[24px] overflow-hidden" style={{ width: '40%' }}>
          <div className="h-full px-[20px] py-[18px] flex flex-col">
            <SemiGauge correct={correctCount} total={total} />

            <div className="mt-[12px] space-y-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-[16px] text-[#a8abb2]">练习类型：</span>
                <span className="text-[16px] text-[#a8abb2]" style={{ fontWeight: 500 }}>错题重刷</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[16px] text-[#a8abb2]">提交时间：</span>
                <span className="text-[16px] text-[#a8abb2]" style={{ fontWeight: 500 }}>
                  {formatSubmitTime(submitAtRef.current)}
                </span>
              </div>
            </div>

            <div className="mt-[20px] flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[24px] rounded-full bg-[#f5b327]" />
                <span className="text-[24px] text-[#303133]" style={{ fontWeight: 700 }}>答题结果</span>
              </div>
              <div className="flex items-center gap-[14px]">
                <div className="flex items-center gap-[6px] text-[13px] text-[#9aa0ad]"><span className="w-[10px] h-[10px] rounded-full bg-[#9bcc37]" />正确</div>
                <div className="flex items-center gap-[6px] text-[13px] text-[#9aa0ad]"><span className="w-[10px] h-[10px] rounded-full bg-[#ff7366]" />错误</div>
              </div>
            </div>

            <div className="mt-[14px] grid grid-cols-5 gap-[12px]">
              {questions.map((q, idx) => {
                const r = questionResults.find((x) => x.id === q.id);
                const isWrong = r?.isSubmitted ? !r.isCorrect : false;
                const bg = r?.isSubmitted ? (isWrong ? '#ff7366' : '#9bcc37') : '#c8ccd8';
                return (
                  <motion.button
                    key={q.id}
                    onClick={() => onGoToQuestion(idx)}
                    whileTap={{ scale: 0.95 }}
                    className="w-[54px] h-[54px] rounded-full text-white text-[16px]"
                    style={{ background: bg, fontWeight: 600 }}
                  >
                    {idx + 1}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white h-full rounded-[24px] overflow-hidden flex flex-col" style={{ width: '60%' }}>
          <div className="px-[20px] pt-[18px] pb-[12px]">
            <div className="rounded-[20px] bg-[#f4f4ff] h-[110px] px-[18px] flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-[#9b9fc2] text-[14px]">一共</div>
                <div className="text-[#6075e5] text-[32px]" style={{ fontWeight: 700 }}>{total}题</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-[#9b9fc2] text-[14px]">答对</div>
                <div className="text-[#34c189] text-[32px]" style={{ fontWeight: 700 }}>{correctCount}题</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-[#9b9fc2] text-[14px]">答错</div>
                <div className="text-[#ea6a68] text-[32px]" style={{ fontWeight: 700 }}>{wrongCount}题</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-[#9b9fc2] text-[14px]">总用时</div>
                <div className="text-[#6075e5] text-[32px]" style={{ fontWeight: 700 }}>{totalMinutes}</div>
              </div>
            </div>

            <div className="mt-[14px] rounded-[20px] bg-[#eef1ff] p-[18px]">
              <div className="text-[24px] text-[#2f3340]" style={{ fontWeight: 700 }}>本次刷题情况</div>

              <div className="mt-[10px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[24px] h-[24px] rounded-[8px] bg-[#36cfb4] flex items-center justify-center">
                    <BarChart3 className="w-[14px] h-[14px] text-white" />
                  </div>
                  <div className="text-[#2f3340] text-[18px]" style={{ fontWeight: 700 }}>核心诊断</div>
                </div>
                <p className="text-[#606266] text-[15px] leading-[1.6] mt-[4px]">
                  {wrongCount === 0 ? '本次练习全部答对，知识掌握稳定，继续保持。' : `本次主要失分在 ${wrongCount} 道题，建议优先回看错题的核心步骤与概念。`}
                </p>
              </div>

              <div className="mt-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[24px] h-[24px] rounded-[8px] bg-[#f7c55f] flex items-center justify-center">
                    <ThumbsUp className="w-[14px] h-[14px] text-white" />
                  </div>
                  <div className="text-[#2f3340] text-[18px]" style={{ fontWeight: 700 }}>亮点表扬</div>
                </div>
                <p className="text-[#606266] text-[15px] leading-[1.6] mt-[4px]">
                  你在解答题的书写规范上有明显进步，公式排版更整齐。
                </p>
              </div>

              <div className="mt-[12px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[24px] h-[24px] rounded-[8px] bg-[#58c8f5] flex items-center justify-center">
                    <FileText className="w-[14px] h-[14px] text-white" />
                  </div>
                  <div className="text-[#2f3340] text-[18px]" style={{ fontWeight: 700 }}>提分方案</div>
                </div>
                <p className="text-[#606266] text-[15px] leading-[1.6] mt-[4px]">
                  建议针对本次失分点进行 5 分钟专项训练，AI 已为你准备好题目。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto p-[20px] flex items-center justify-end gap-[14px]">
            <button
              onClick={onWrongDetail}
              className="h-[50px] w-[220px] rounded-[999px] text-[#7f85ff] text-[18px]"
              style={{ border: '1px solid #7f85ff', background: '#f4f4ff', fontWeight: 600 }}
            >
              错题解析
            </button>
            <button
              className="h-[50px] w-[220px] rounded-[999px] text-white text-[18px]"
              style={{ background: '#7f85ff', fontWeight: 600 }}
            >
              AI推题
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
