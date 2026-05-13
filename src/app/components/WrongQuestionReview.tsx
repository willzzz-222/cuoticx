import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Star } from "lucide-react";
import svgPaths from "../../imports/错题本详情页选择题待检查/svg-jvu32dafeg";
import svgPaths2 from "../../imports/错题本详情页选择题待检查-1/svg-ltwr1plp22";
import imgGeometry from "figma:asset/6e109925589a4a403896cd2e02a844159083d75a.png";
import { ResultScreen } from "./ResultScreen";

// ============ TYPES ============
type QuestionType =
  | "单选题"
  | "多选题"
  | "判断题"
  | "填空题"
  | "解答题";

interface Question {
  id: number;
  type: QuestionType;
  content: string;
  options?: { label: string; content: string }[];
  blanksCount?: number;
  blanksLabels?: string[];
  correctAnswer: string | string[];
  answerText: string;
  analysisText: string;
  subject: string;
  difficulty: "简单" | "中等" | "困难";
  hasGeometryImage?: boolean;
}

// ============ DATA ============
const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "单选题",
    content:
      "下列各图形，绕各自的中心点旋转180°后，不能完全重合的是（  ）",
    options: [
      { label: "A", content: "圆形" },
      { label: "B", content: "等边三角形" },
      { label: "C", content: "菱形" },
      { label: "D", content: "正方形" },
    ],
    correctAnswer: "B",
    answerText:
      "解：A、圆绕中心旋转任意角度都能与原图形重合，当然旋转180°也能完全重合。B、等边三角形只有三个顶点，绕中心点旋转180°后，原本朝上的顶点会转到下方，原本在底部的边会转到上方，无法与原图形重合。C、菱形绕中心点旋转180°后，上下对角互换，左右对角互换，图形与原图形完全重合。D、正方形绕中心点旋转180°后，四个角的位置互换，四条边的位置互换，图形与原图形完全重合。故选：B。",
    analysisText:
      "绕各自的中心点旋转180°，也就是图形绕中心点转动半圈后，观察其形状和位置是否与原图形完全一致。旋转对称图形：旋转某个角度后与原图形重合，等边三角形最小旋转角为120°，不是180°。",
    subject: "数学 · 图形变换",
    difficulty: "中等",
    hasGeometryImage: true,
  },
  {
    id: 2,
    type: "单选题",
    content: "解方程 3x − 6 = 0，x 的值是（  ）",
    options: [
      { label: "A", content: "x = 2" },
      { label: "B", content: "x = −2" },
      { label: "C", content: "x = 3" },
      { label: "D", content: "x = −3" },
    ],
    correctAnswer: "A",
    answerText:
      "解：3x − 6 = 0，移项得：3x = 6，两边除以3得：x = 2。验证：代入原方程 3×2 − 6 = 0 ✓。故选：A。",
    analysisText:
      "解一元一次方程的基本步骤：①移项（把含未知数的项移到左边，常数项移到右边）；②合并同类项；③系数化为1（两边同除以系数）。",
    subject: "数学 · 一元一次方程",
    difficulty: "简单",
  },
  {
    id: 3,
    type: "单选题",
    content: "计算 (−3)² + 2 × (−3) + 1 的结果是（  ）",
    options: [
      { label: "A", content: "4" },
      { label: "B", content: "−4" },
      { label: "C", content: "16" },
      { label: "D", content: "10" },
    ],
    correctAnswer: "A",
    answerText:
      "解：(−3)² + 2×(−3) + 1 = 9 + (−6) + 1 = 9 − 6 + 1 = 4。注意：(−3)² = (−3)×(−3) = 9（负数的偶次方为正）。故选：A。",
    analysisText:
      "注意区分 (−3)² 与 −3²：(−3)² = 9，而 −3² = −9。按运算顺序：先乘方，再乘除，最后加减。",
    subject: "数学 · 有理数运算",
    difficulty: "简单",
  },
  {
    id: 4,
    type: "单选题",
    content: "若 a∶b = 2∶3，b∶c = 4∶5，则 a∶b∶c 等于（  ）",
    options: [
      { label: "A", content: "2∶3∶5" },
      { label: "B", content: "8∶12∶15" },
      { label: "C", content: "2∶4∶5" },
      { label: "D", content: "4∶6∶5" },
    ],
    correctAnswer: "B",
    answerText:
      "解：将b统一化。a∶b = 2∶3 = 8∶12，b∶c = 4∶5 = 12∶15。b统一为12时，a = 8，c = 15。所以 a∶b∶c = 8∶12∶15。故选：B。",
    analysisText:
      "连比的求法：找到中间量b的公倍数，将两个比中b化为同一值，再写出a、b、c的比。",
    subject: "数学 · 比和比例",
    difficulty: "中等",
  },
  {
    id: 5,
    type: "多选题",
    content: "下列关于平行四边形的说法，正确的是（  ）",
    options: [
      { label: "A", content: "对边相等" },
      { label: "B", content: "四个角都是直角" },
      { label: "C", content: "对角线互相平分" },
      { label: "D", content: "对角相等" },
    ],
    correctAnswer: ["A", "C", "D"],
    answerText:
      '解：平行四边形的基本性质：①对边平行且相等（A ✓）；②对角线互相平分（C ✓）；③对角相等（D ✓）。B选项"四个角都是直角"是矩形的特有性质，普通平行四边形不一定满足（B ✗）。故选：A、C、D。',
    analysisText:
      "平行四边形的四条基本性质：两组对边平行、两组对边相等、对角相等、对角线互相平分。注意与矩形、菱形、正方形的特殊性质区分。",
    subject: "数学 · 平行四边形",
    difficulty: "中等",
  },
  {
    id: 6,
    type: "多选题",
    content: "下列各式中，属于一次函数的是（  ）",
    options: [
      { label: "A", content: "y = x²" },
      { label: "B", content: "y = 2x − 1" },
      { label: "C", content: "y = −3x" },
      { label: "D", content: "y = 1/x" },
    ],
    correctAnswer: ["B", "C"],
    answerText:
      "解：一次函数的定义是 y = kx + b（k ≠ 0）。B: y = 2x − 1，k = 2，b = −1，满足（✓）。C: y = −3x，k = −3，b = 0，满足（✓）。A: y = x² 是二次函数（✗）。D: y = 1/x 是反比例函数（✗）。故选：B、C。",
    analysisText:
      "一次函数 y = kx + b（k ≠ 0）的特征：x的次数为1，b=0时为正比例函数。注意区分一次函数、二次函数、反比例函数。",
    subject: "数学 · 一次函数",
    difficulty: "简单",
  },
  {
    id: 7,
    type: "多选题",
    content: "下列各数中，属于无理数的是（  ）",
    options: [
      { label: "A", content: "0.3333…" },
      { label: "B", content: "√2" },
      { label: "C", content: "π" },
      { label: "D", content: "3/7" },
    ],
    correctAnswer: ["B", "C"],
    answerText:
      "解：无理数是无限不循环小数。√2 ≈ 1.41421356… 无限不循环，是无理数（✓）。π ≈ 3.14159265… 无限不循环，是无理数（✓）。0.3333… = 1/3 是循环小数，属有理数（✗）。3/7 是分数，属有理数（✗）。故选：B、C。",
    analysisText:
      "数的分类：有理数（整数、有限小数、无限循环小数）和无理数（无限不循环小数）。有理数和无理数合称实数。√2、√3、π等都是常见的无理数。",
    subject: "数学 · 实数分类",
    difficulty: "简单",
  },
  {
    id: 8,
    type: "判断题",
    content: "菱形是特殊的平行四边形，其对角线互相垂直平分。",
    correctAnswer: "true",
    answerText:
      "答：正确。菱形的四条边都相等，是特殊的平行四边形。菱形的对角线具有特殊性质：①互相平分（平行四边形共有性质）；②互相垂直（菱形特有性质）。因此，菱形的对角线互相垂直平分。",
    analysisText:
      "菱形是四边都相等的平行四边形。除拥有平行四边形的所有性质外，还有：对角线互相垂直，每条对角线平分一组对角。",
    subject: "数学 · 菱形",
    difficulty: "简单",
  },
  {
    id: 9,
    type: "判断题",
    content: "两个锐角之和一定是钝角。",
    correctAnswer: "false",
    answerText:
      "答：错误。两个锐角（均小于90°）之和的范围是 (0°, 180°)，并不是一定等于钝角（90°到180°）。反例：30° + 40° = 70°（锐角）；45° + 45° = 90°（直角）；60° + 70° = 130°（钝角）。因此，两个锐角之和可能是锐角、直角或钝角。",
    analysisText:
      '用反例法验证命题：找到一个满足条件但结论不成立的例子，即可证明命题为假。遇到"一定"、"必然"等绝对词时，要特别注意寻找反例。',
    subject: "数学 · 角的分类",
    difficulty: "简单",
  },
  {
    id: 10,
    type: "填空题",
    content:
      "解方程组：\n   3x − y = 7\n   x + y = 5\n\n则 x = ____，y = ____",
    blanksCount: 2,
    blanksLabels: ["x", "y"],
    correctAnswer: ["3", "2"],
    answerText:
      "解：将两方程相加（加减消元法）：\n(3x − y) + (x + y) = 7 + 5\n4x = 12，解得 x = 3\n代入 x + y = 5：3 + y = 5，解得 y = 2\n所以 x = 3，y = 2。",
    analysisText:
      "解二元一次方程组的常用方法：①加减消元法（将两方程相加或相减，消去一个未知数）；②代入消元法（用一个方程表达一个未知数，代入另一方程）。本题用加减法更简便。",
    subject: "数学 · 二元一次方程组",
    difficulty: "中等",
  },
  {
    id: 11,
    type: "填空题",
    content:
      "已知圆的半径为 r，请写出圆的公式：\n\n圆的面积：S = ____\n圆的周长：C = ____",
    blanksCount: 2,
    blanksLabels: ["S", "C"],
    correctAnswer: ["πr²", "2πr"],
    answerText:
      "解：圆的两个基本公式：\n① 圆的面积 S = πr²（π ≈ 3.14，r 为半径）\n② 圆的周长 C = 2πr（也可写作 C = πd，其中 d = 2r 为直径）",
    analysisText:
      "圆的面积和周长公式是基础，需要熟记。注意面积公式中 r 是平方，而周长公式中 r 是一次方。半径 r、直径 d = 2r 的关系也要清楚。",
    subject: "数学 · 圆",
    difficulty: "简单",
  },
  {
    id: 12,
    type: "解答题",
    content:
      "已知 △ABC 中，AB = AC，D 是 BC 的中点，求证：AD ⊥ BC。",
    correctAnswer: "",
    answerText:
      "【证明过程】\n在 △ABD 和 △ACD 中：\n  ① AB = AC（已知）\n  ② BD = CD（D 是 BC 中点，已知）\n  ③ AD = AD（公共边）\n∴ △ABD ≅ △ACD（SSS）\n∴ ∠ADB = ∠ADC（全等三角形对应角相等）\n又 ∠ADB + ∠ADC = 180°（平角）\n∴ ∠ADB = ∠ADC = 90°\n∴ AD ⊥ BC  ■",
    analysisText:
      "本题考查全等三角形的判定（SSS）和性质。证明两线段垂直，关键是证明所成角等于90°。思路：构造两个全等三角形，利用全等得到相等的角，再利用平角180°推出每个角为90°。",
    subject: "数学 · 全等三角形",
    difficulty: "困难",
  },
];

const ERROR_CAUSES = [
  "马虎粗心",
  "概念未掌握",
  "没有思路",
  "运算错误",
  "知识遗忘",
];

// ============ HELPERS ============
function checkIsCorrect(
  q: Question,
  answer: string | string[],
): boolean {
  if (q.type === "解答题") return false;
  if (Array.isArray(q.correctAnswer)) {
    const ca = [...(q.correctAnswer as string[])].sort();
    const ua = Array.isArray(answer)
      ? [...answer].sort()
      : [answer];
    return JSON.stringify(ca) === JSON.stringify(ua);
  }
  return (
    String(answer).toLowerCase().trim() ===
    String(q.correctAnswer).toLowerCase().trim()
  );
}

function checkBlankCorrect(
  correct: string,
  userVal: string,
): boolean {
  return (
    userVal.toLowerCase().trim().replace(/\s/g, "") ===
    correct.toLowerCase().trim().replace(/\s/g, "")
  );
}

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  points: StrokePoint[];
  erase: boolean;
}

function drawStrokePath(
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
  color: string,
  width: number,
) {
  if (!stroke.points.length) return;
  ctx.save();
  ctx.globalCompositeOperation = stroke.erase
    ? "destination-out"
    : "source-over";
  ctx.strokeStyle = color;
  ctx.lineWidth = stroke.erase ? width * 3 : width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (let i = 1; i < stroke.points.length; i += 1) {
    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}

const TYPE_COLORS: Record<
  QuestionType,
  { bg: string; text: string }
> = {
  单选题: { bg: "#e5e5f9", text: "#7075ef" },
  多选题: { bg: "#fff7e6", text: "#d46b08" },
  判断题: { bg: "#e6fffb", text: "#08979c" },
  填空题: { bg: "#e6f7ff", text: "#096dd9" },
  解答题: { bg: "#fff0f6", text: "#c41d7f" },
};

const DIFF_COLORS: Record<
  string,
  { bg: string; text: string }
> = {
  简单: { bg: "#f6ffed", text: "#389e0d" },
  中等: { bg: "#fff7e6", text: "#d46b08" },
  困难: { bg: "#fff1f0", text: "#cf1322" },
};

// ============ GEOMETRY SHAPES ============
const GeometryShapes = () => {
  const shapes = [
    { label: "A", left: "-54.55%" },
    { label: "B", left: "-323.52%" },
    { label: "C", left: "-598.79%" },
    { label: "D", left: "-866.98%" },
  ];
  return (
    <div className="flex items-center justify-between px-[20px] w-full">
      {shapes.map(({ label, left }) => (
        <div
          key={label}
          className="flex gap-[8px] items-center"
        >
          <span
            className="text-[16px] text-[#303133]"
            style={{ fontWeight: 500 }}
          >
            {label}
          </span>
          <div className="h-[99px] relative shrink-0 w-[77px] overflow-hidden">
            <img
              alt={`图形${label}`}
              className="absolute h-full max-w-none top-0"
              style={{ left, width: "998.7%" }}
              src={imgGeometry}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ============ OPTION STYLE ============
type OptionVariant =
  | "default"
  | "selected"
  | "correct-selected"
  | "correct-unselected"
  | "wrong-selected";

function getOptionVariant(
  label: string,
  isSubmitted: boolean,
  isRevealed: boolean,
  userAnswer: string | string[] | undefined,
  correctAnswer: string | string[],
): OptionVariant {
  const isSelected = Array.isArray(userAnswer)
    ? userAnswer.includes(label)
    : userAnswer === label;
  const isCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.includes(label)
    : correctAnswer === label;

  if (!isSubmitted && !isRevealed) {
    return isSelected ? "selected" : "default";
  }
  if (isCorrect && isSelected) return "correct-selected";
  if (isCorrect && !isSelected) return "correct-unselected";
  if (!isCorrect && isSelected) return "wrong-selected";
  return "default";
}

const OPTION_STYLES: Record<
  OptionVariant,
  {
    bg: string;
    border: string;
    textColor: string;
    iconColor?: string;
  }
> = {
  default: {
    bg: "#f4f4ff",
    border: "2px solid transparent",
    textColor: "#91969e",
  },
  selected: {
    bg: "#eceeff",
    border: "2px solid #7075ef",
    textColor: "#7075ef",
  },
  "correct-selected": {
    bg: "#9bcc37",
    border: "2px solid #9bcc37",
    textColor: "white",
    iconColor: "white",
  },
  "correct-unselected": {
    bg: "#9bcc37",
    border: "2px solid #9bcc37",
    textColor: "white",
  },
  "wrong-selected": {
    bg: "#ffece8",
    border: "2px solid #ffece8",
    textColor: "#ff5c5c",
    iconColor: "#ff5c5c",
  },
};

// ============ NAV BAR ============
interface NavBarProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
  onDraft: () => void;
}

function NavBar({
  currentIndex,
  total,
  onPrev,
  onNext,
  onBack,
  onDraft,
}: NavBarProps) {
  return (
    <div className="absolute top-0 left-0 w-[1280px] h-[56px] bg-[#c5d3ff] flex items-center justify-between px-[30px]">
      <button
        onClick={onBack}
        className="flex items-center gap-[8px] cursor-pointer"
      >
        <div className="w-[40px] h-[40px] relative">
          <svg
            className="absolute block"
            style={{
              left: "10.29px",
              top: "11.62px",
              width: "19.258px",
              height: "17.428px",
            }}
            fill="none"
            viewBox="0 0 19.258 17.4284"
          >
            <path d={svgPaths.p2cbb90f0} fill="#33347C" />
          </svg>
        </div>
        <span
          className="text-[#33347c] text-[24px]"
          style={{ fontWeight: 600 }}
        >
          错题复习
        </span>
      </button>

      <div className="bg-[#f4f4ff] flex items-center gap-[12px] h-[40px] px-[16px] rounded-[9999px]">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#e8e9ff] disabled:opacity-40 transition-all"
        >
          <ChevronLeft className="w-[18px] h-[18px] text-[#606266]" />
        </button>
        <div
          className="flex items-center gap-[4px] text-[18px]"
          style={{ fontWeight: 600 }}
        >
          <span className="text-[#7075ef]">
            {currentIndex + 1}
          </span>
          <span className="text-[#a8abb2]">/</span>
          <span className="text-[#a8abb2]">{total}</span>
        </div>
        <button
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#e8e9ff] disabled:opacity-40 transition-all"
        >
          <ChevronRight className="w-[18px] h-[18px] text-[#606266]" />
        </button>
      </div>

      <div className="flex items-center gap-[12px]">
        <button
          onClick={onDraft}
          className="flex items-center gap-[4px] text-[#7075ef] text-[15px] hover:opacity-75 transition-opacity"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d={svgPaths.p2a71dc00} fill="#7075EF" />
          </svg>
          <span>草稿</span>
        </button>
        <div className="bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.8)] flex items-center gap-[6px] px-[14px] py-[6px] rounded-[36px] text-[#7075ef] text-[15px] cursor-pointer hover:bg-[rgba(255,255,255,0.6)] transition-all">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d={svgPaths.p149c0700}
              stroke="#716EFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>打印</span>
        </div>
        <div className="bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.8)] w-[40px] h-[36px] flex items-center justify-center rounded-[36px] cursor-pointer hover:bg-[rgba(255,255,255,0.6)] transition-all">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d={svgPaths.p4279900} fill="#7075EF" />
            <path d={svgPaths.p11e47970} fill="#7075EF" />
            <path d={svgPaths.p9ec6c80} fill="#7075EF" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ============ LEFT PANEL ============
interface QuestionPanelProps {
  question: Question;
  questionIndex: number;
  total: number;
  isSubmitted: boolean;
  isRevealed: boolean;
}

function QuestionPanel({
  question,
  questionIndex,
  total,
  isSubmitted,
  isRevealed,
}: QuestionPanelProps) {
  const tc = TYPE_COLORS[question.type];
  const dc = DIFF_COLORS[question.difficulty];
  const showAnswer = isSubmitted || isRevealed;

  return (
    <div className="bg-white flex-1 h-full rounded-[24px] overflow-hidden flex flex-col">
      <div className="flex flex-col gap-[24px] p-[24px] h-full overflow-y-auto">
        {/* Type badge + difficulty */}
        <div className="flex items-center justify-between shrink-0">
          <div
            className="px-[11px] py-[4px] rounded-[4px] text-[16px]"
            style={{
              backgroundColor: tc.bg,
              color: tc.text,
              fontWeight: 500,
            }}
          >
            {question.type}
          </div>
          <div className="flex items-center gap-[8px]">
            <div
              className="px-[10px] py-[3px] rounded-[20px] text-[12px]"
              style={{ backgroundColor: dc.bg, color: dc.text }}
            >
              {question.difficulty}
            </div>
            <span className="text-[#a8abb2] text-[13px]">
              {question.subject}
            </span>
          </div>
        </div>

        {/* Question content */}
        <div className="flex flex-col gap-[8px] shrink-0">
          <div className="text-[#303133] text-[16px] leading-[24px]">
            <ol
              className="list-decimal"
              start={questionIndex + 1}
            >
              <li className="ms-[24px]">
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {question.content}
                </span>
              </li>
            </ol>
          </div>
          {question.hasGeometryImage && <GeometryShapes />}
          {question.hasGeometryImage && <GeometryShapes />}
        </div>

        {/* Answer + Analysis sections (shown after submit) */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-[24px] shrink-0"
            >
              {/* 答案 section */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[6px]">
                  <div className="bg-[#16c580] w-[5px] h-[16px] rounded-[90px]" />
                  <span
                    className="text-[#212121] text-[18px]"
                    style={{ fontWeight: 500 }}
                  >
                    答案
                  </span>
                </div>
                <div className="bg-[#f2f3f5] rounded-[8px] p-[8px]">
                  <p
                    className="text-[#303133] text-[16px] leading-[28px]"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {question.answerText}
                  </p>
                </div>
              </div>

              {/* 解析 section */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[6px]">
                  <div className="bg-[#16c580] w-[5px] h-[16px] rounded-[90px]" />
                  <span
                    className="text-[#212121] text-[18px]"
                    style={{ fontWeight: 500 }}
                  >
                    解析
                  </span>
                </div>
                <div className="bg-[#f2f3f5] rounded-[8px] p-[8px]">
                  <p className="text-[#303133] text-[16px] leading-[28px]">
                    {question.analysisText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

              </div>
    </div>
  );
}

// ============ ERROR CAUSE SECTION ============
function ErrorCauseSection({
  selectedCauses,
  onToggle,
}: {
  selectedCauses: string[];
  onToggle: (cause: string) => void;
}) {
  return (
    <div className="bg-white w-full shrink-0 flex items-center justify-between p-[16px]">
      <span
        className="text-[#414559] text-[18px] shrink-0"
        style={{ fontWeight: 600 }}
      >
        错因记录
      </span>
      <div className="flex items-center gap-[4px] overflow-hidden">
        {ERROR_CAUSES.map((cause) => {
          const isActive = selectedCauses.includes(cause);
          return (
            <button
              key={cause}
              onClick={() => onToggle(cause)}
              className="px-[12px] h-[32px] rounded-[99px] text-[14px] shrink-0 transition-all"
              style={{
                background: isActive ? "#7075ef" : "white",
                color: isActive ? "white" : "#6b7280",
                border: isActive ? "none" : "1px solid #f3f4f6",
                fontFamily: "sans-serif",
              }}
            >
              {cause}
            </button>
          );
        })}
        {/* Custom */}
        <button
          className="flex items-center gap-[4px] px-[12px] h-[32px] rounded-[99px] text-[14px] text-[#6b7280] shrink-0 transition-all hover:bg-[#f9f9f9]"
          style={{
            background: "white",
            border: "1px solid #f3f4f6",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d={svgPaths2.p10602900}
              stroke="#6B7280"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.33333"
            />
            <path
              d="M3.33333 8H12.6667"
              stroke="#6B7280"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.33333"
            />
          </svg>
          自定义
        </button>
      </div>
    </div>
  );
}

// ============ RIGHT PANEL (ANSWER) ============
interface AnswerPanelProps {
  question: Question;
  userAnswer: string | string[] | undefined;
  fillBlanks: string[];
  essayText: string;
  isSubmitted: boolean;
  isRevealed: boolean;
  isLast: boolean;
  selectedCauses: string[];
  confirmed: boolean;
  onSelectOption: (label: string) => void;
  onFillBlank: (idx: number, val: string) => void;
  onEssayChange: (val: string) => void;
  onSubmit: () => void;
  onReveal: () => void;
  onNext: () => void;
  onFinish: () => void;
  onToggleCause: (cause: string) => void;
  onConfirm: () => void;
}

function AnswerPanel({
  question,
  userAnswer,
  fillBlanks,
  essayText,
  isSubmitted,
  isRevealed,
  isLast,
  selectedCauses,
  confirmed,
  onSelectOption,
  onFillBlank,
  onEssayChange,
  onSubmit,
  onReveal,
  onNext,
  onFinish,
  onToggleCause,
  onConfirm,
}: AnswerPanelProps) {
  const showResult = isSubmitted || isRevealed;
  const isAnswerable =
    question.type !== "解答题"
      ? (Array.isArray(userAnswer)
          ? userAnswer.length > 0
          : !!userAnswer) ||
        (question.type === "填空题" &&
          fillBlanks.some((b) => b.trim()))
      : essayText.trim().length > 10;

  // Determine if user got it right — wrong answers and revealed answers need 错因记录
  const isAnswerCorrect = (() => {
    if (
      !isSubmitted ||
      isRevealed ||
      question.type === "解答题"
    )
      return false;
    if (question.type === "填空题") {
      const corrects = question.correctAnswer as string[];
      return corrects.every((c, i) =>
        checkBlankCorrect(c, fillBlanks[i] || ""),
      );
    }
    return !!userAnswer && checkIsCorrect(question, userAnswer);
  })();

  // Only show 错因记录 when answer is wrong or revealed
  const showErrorCause = showResult && !isAnswerCorrect;

  return (
    <div
      className="bg-white shrink-0 h-full rounded-[24px] overflow-hidden flex flex-col"
      style={{ width: "677.6px" }}
    >
      {/* 错因记录 section - only after submit */}
      <AnimatePresence>
        {showErrorCause && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0"
            style={{ borderBottom: "1px solid #f3f4f6" }}
          >
            <ErrorCauseSection
              selectedCauses={selectedCauses}
              onToggle={onToggleCause}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main answer input area */}
      <div className="flex-1 overflow-y-auto p-[16px]">
        {(question.type === "单选题" ||
          question.type === "多选题") && (
          <ChoiceOptions
            question={question}
            userAnswer={userAnswer}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            onSelect={onSelectOption}
          />
        )}
        {question.type === "判断题" && (
          <TrueFalseOptions
            userAnswer={userAnswer}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            correctAnswer={question.correctAnswer as string}
            onSelect={onSelectOption}
          />
        )}
        {question.type === "填空题" && (
          <FillBlankInputs
            question={question}
            fillBlanks={fillBlanks}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            onChange={onFillBlank}
          />
        )}
        {question.type === "解答题" && (
          <EssayInput
            value={essayText}
            isSubmitted={isSubmitted}
            onChange={onEssayChange}
          />
        )}
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 px-[16px] pb-[16px]">
        {!showResult ? (
          <div className="flex items-center justify-between">
            <button
              onClick={onReveal}
              className="text-[#8286ef] text-[15px] hover:opacity-70 transition-opacity"
            >
              不会做，
              <span className="underline">查看答案</span>？
            </button>
            <button
              onClick={onSubmit}
              disabled={!isAnswerable}
              className="px-[32px] py-[12px] rounded-[9999px] text-white text-[16px] transition-all"
              style={{
                background: isAnswerable
                  ? "#7075ef"
                  : "#c2c5ff",
                boxShadow: isAnswerable
                  ? "0px 4px 12px rgba(112,117,239,0.4)"
                  : "none",
                cursor: isAnswerable
                  ? "pointer"
                  : "not-allowed",
              }}
            >
              提交
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-[24px]">
            {/* 确认掌握 */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: confirmed ? 1 : 0.6 }}
              onClick={onConfirm}
              className="flex items-center gap-[4px] h-[46px] px-[32px] rounded-[90px] text-[16px] transition-all"
              style={{
                background: confirmed ? "#f0fff4" : "white",
                border: confirmed
                  ? "1px solid #52c41a"
                  : "1px solid #f2f3f5",
                color: confirmed ? "#389e0d" : "#bdbdbd",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d={svgPaths2.p1874e200}
                  stroke={confirmed ? "#389e0d" : "#BDBDBD"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.35"
                />
              </svg>
              确认掌握
            </motion.button>

            {/* 下一题 / 完成 */}
            {isLast ? (
              <button
                onClick={onFinish}
                className="flex items-center gap-[10px] px-[32px] py-[12px] rounded-[9999px] text-white text-[16px]"
                style={{
                  background: "#7075ef",
                  boxShadow:
                    "0px 4px 3px #c7d2fe, 0px 10px 7.5px #c7d2fe",
                }}
              >
                <Star className="w-[16px] h-[16px]" />
                完成练习
              </button>
            ) : (
              <button
                onClick={onNext}
                className="px-[32px] py-[12px] rounded-[9999px] text-white text-[16px]"
                style={{
                  background: "#7075ef",
                  boxShadow:
                    "0px 4px 3px #c7d2fe, 0px 10px 7.5px #c7d2fe",
                  minWidth: "112px",
                }}
              >
                下一题
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ CHOICE OPTIONS ============
function ChoiceOptions({
  question,
  userAnswer,
  isSubmitted,
  isRevealed,
  onSelect,
}: {
  question: Question;
  userAnswer: string | string[] | undefined;
  isSubmitted: boolean;
  isRevealed: boolean;
  onSelect: (label: string) => void;
}) {
  const isMulti = question.type === "多选题";
  return (
    <div className="flex flex-col gap-[12px]">
      {isMulti && !isSubmitted && !isRevealed && (
        <p className="text-[#a8abb2] text-[13px]">
          多选题，请选择所有正确答案
        </p>
      )}
      <div className="content-start flex flex-wrap gap-[24px] items-start">
        {question.options!.map((opt) => {
          const variant = getOptionVariant(
            opt.label,
            isSubmitted,
            isRevealed,
            userAnswer,
            question.correctAnswer,
          );
          const style = OPTION_STYLES[variant];
          const showCheck = variant === "correct-selected";
          const showX = variant === "wrong-selected";

          return (
            <div
              key={opt.label}
              onClick={() =>
                !isSubmitted &&
                !isRevealed &&
                onSelect(opt.label)
              }
              className="relative h-[56px] rounded-[12px] flex items-center justify-center gap-[10px] py-[15px] transition-all duration-200 select-none"
              style={{
                width: "310px",
                minWidth: "74px",
                backgroundColor: style.bg,
                border: style.border,
                color: style.textColor,
                cursor:
                  isSubmitted || isRevealed
                    ? "default"
                    : "pointer",
              }}
            >
              <span
                className="text-[22px]"
                style={{ fontWeight: 500 }}
              >
                {opt.label}
              </span>
              {/* Before submit: also show content text */}
              {!isSubmitted && !isRevealed && (
                <span className="text-[15px]">
                  {opt.content}
                </span>
              )}
              {showCheck && (
                <div className="absolute right-[16px] top-[16px] w-[24px] h-[24px]">
                  <svg
                    className="absolute block inset-0 size-full"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12L10 17L20 7"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    />
                  </svg>
                </div>
              )}
              {showX && (
                <div className="absolute right-[16px] top-[16px] w-[24px] h-[24px]">
                  <svg
                    className="absolute block inset-0 size-full"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 7L17 17"
                      stroke="#FF5C5C"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    />
                    <path
                      d="M7 17L17 7"
                      stroke="#FF5C5C"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ TRUE/FALSE OPTIONS ============
function TrueFalseOptions({
  userAnswer,
  isSubmitted,
  isRevealed,
  correctAnswer,
  onSelect,
}: {
  userAnswer: string | string[] | undefined;
  isSubmitted: boolean;
  isRevealed: boolean;
  correctAnswer: string;
  onSelect: (label: string) => void;
}) {
  const opts = [
    { label: "true", icon: "✓", text: "正确" },
    { label: "false", icon: "✗", text: "错误" },
  ];

  return (
    <div className="flex gap-[24px] mt-[8px]">
      {opts.map(({ label, icon, text }) => {
        const variant = getOptionVariant(
          label,
          isSubmitted,
          isRevealed,
          userAnswer,
          correctAnswer,
        );
        const style = OPTION_STYLES[variant];
        return (
          <button
            key={label}
            onClick={() =>
              !isSubmitted && !isRevealed && onSelect(label)
            }
            disabled={isSubmitted || isRevealed}
            className="flex-1 h-[100px] rounded-[16px] flex flex-col items-center justify-center gap-[8px] transition-all duration-200"
            style={{
              backgroundColor: style.bg,
              border: style.border,
              color: style.textColor,
              cursor:
                isSubmitted || isRevealed
                  ? "default"
                  : "pointer",
            }}
          >
            <span className="text-[28px]">{icon}</span>
            <span
              className="text-[20px]"
              style={{ fontWeight: 600 }}
            >
              {text}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function HandwriteBoard({
  open,
  title,
  fullHeight,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  fullHeight?: boolean;
  onClose: () => void;
  onConfirm: (img: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<Stroke[]>([]);
  const [isErasing, setIsErasing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const currentStroke = useRef<Stroke | null>(null);

  const redraw = (nextStrokes: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextStrokes.forEach((s) => drawStrokePath(ctx, s, "#111111", 3));
  };

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const rect = box.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width));
    canvas.height = Math.max(1, Math.floor(rect.height));
    redraw(strokes);
  }, [open, isFullscreen]);

  const pointFromEvent = (
    e: React.PointerEvent<HTMLCanvasElement>,
  ): StrokePoint => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = pointFromEvent(e);
    const stroke: Stroke = { points: [p], erase: isErasing };
    currentStroke.current = stroke;
    setDrawing(true);
    setRedoStrokes([]);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing || !currentStroke.current) return;
    const p = pointFromEvent(e);
    currentStroke.current.points.push(p);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    redraw(strokes);
    drawStrokePath(ctx, currentStroke.current, "#111111", 3);
  };

  const endStroke = () => {
    if (!drawing || !currentStroke.current) return;
    const next = [...strokes, currentStroke.current];
    setStrokes(next);
    redraw(next);
    currentStroke.current = null;
    setDrawing(false);
  };

  const handleUndo = () => {
    if (!strokes.length) return;
    const removed = strokes[strokes.length - 1];
    const next = strokes.slice(0, -1);
    setStrokes(next);
    setRedoStrokes((prev) => [...prev, removed]);
    redraw(next);
  };

  const handleRedo = () => {
    if (!redoStrokes.length) return;
    const recovered = redoStrokes[redoStrokes.length - 1];
    const nextRedo = redoStrokes.slice(0, -1);
    const next = [...strokes, recovered];
    setRedoStrokes(nextRedo);
    setStrokes(next);
    redraw(next);
  };

  const handleClear = () => {
    setStrokes([]);
    setRedoStrokes([]);
    redraw([]);
  };

  const handleConfirm = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      onConfirm("");
      return;
    }
    onConfirm(canvas.toDataURL("image/png"));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={handleConfirm}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed z-50 bg-white rounded-[16px] border border-[#e7e9ff] overflow-hidden"
            style={
              isFullscreen
                ? {
                    top: 56,
                    right: 24,
                    bottom: 24,
                    left: "50%",
                    width: "calc(50% - 24px)",
                  }
                : {
                    right: 24,
                    top: 96,
                    width: 620,
                    height: fullHeight ? 620 : 360,
                  }
            }
          >
            <div className="h-[44px] px-[12px] bg-[#f4f5ff] flex items-center justify-between">
              <span className="text-[14px] text-[#4e548c]">{title}</span>
              <button
                onClick={() => setIsFullscreen((v) => !v)}
                className="w-[20px] h-[20px] text-[#9aa0b6] hover:text-[#6f748d] transition-colors"
                title="全屏"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 3H3V8M16 3H21V8M3 16V21H8M21 16V21H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="p-[12px] h-[calc(100%-44px)] flex flex-col gap-[10px]">
              <div
                ref={boxRef}
                className="flex-1 rounded-[12px] border border-[#e4e7ff] bg-white overflow-hidden"
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block touch-none"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endStroke}
                  onPointerLeave={endStroke}
                />
              </div>
              <div className="h-[42px] rounded-[9999px] bg-[#f4f5ff] px-[10px] flex items-center justify-between text-[13px] text-[#586086]">
                <div className="flex items-center gap-[8px]">
                  <button onClick={handleUndo}>撤销</button>
                  <button onClick={handleRedo}>反向撤销</button>
                  <button onClick={() => setIsErasing(true)}>橡皮擦</button>
                  <button onClick={() => setIsErasing(false)}>手写</button>
                  <button onClick={handleClear}>清空</button>
                </div>
                <div className="flex items-center gap-[8px]">
                  <button onClick={onClose}>关闭</button>
                  <button onClick={handleConfirm}>确认</button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============ FILL BLANK INPUTS ============
function FillBlankInputs({
  question,
  fillBlanks,
  isSubmitted,
  isRevealed,
  onChange,
}: {
  question: Question;
  fillBlanks: string[];
  isSubmitted: boolean;
  isRevealed: boolean;
  onChange: (idx: number, val: string) => void;
}) {
  const count = question.blanksCount || 1;
  const labels =
    question.blanksLabels ||
    Array.from({ length: count }, (_, i) => '?' + (i + 1) + '?');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[16px] mt-[8px]">
      {Array.from({ length: count }).map((_, idx) => {
        const val = fillBlanks[idx] || "";
        return (
          <div key={idx} className="flex flex-col gap-[6px]">
            <label
              className="text-[14px] text-[#606266]"
              style={{ fontWeight: 500 }}
            >
              {labels[idx]} =
            </label>
            <div className="flex-1 relative">
              <button
                type="button"
                onClick={() => !isSubmitted && !isRevealed && setEditingIdx(idx)}
                disabled={isSubmitted || isRevealed}
                className="w-full h-[56px] rounded-[12px] overflow-hidden transition-all text-left"
                style={{ background: "#ffffff", border: "2px solid #e8e9ff" }}
              >
                {val ? (
                  <img src={val} alt={"blank-" + (idx + 1)} className="w-full h-full object-contain" />
                ) : (
                  <span className="px-[16px] text-[14px] text-[#a8abb2]">????</span>
                )}
              </button>
              {!(isSubmitted || isRevealed) && (
                <button
                  type="button"
                  onClick={() => onChange(idx, "")}
                  className="absolute right-[8px] top-[8px] w-[24px] h-[24px] rounded-full bg-[#f4f5ff] text-[#7c81a8] text-[12px]"
                >
                  ?
                </button>
              )}
              <HandwriteBoard
                open={editingIdx === idx}
                title={"???? " + labels[idx]}
                onClose={() => setEditingIdx(null)}
                onConfirm={(img) => {
                  onChange(idx, img);
                  setEditingIdx(null);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ ESSAY INPUT ============
function EssayInput({
  value,
  isSubmitted,
  onChange,
}: {
  value: string;
  isSubmitted: boolean;
  onChange: (val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex flex-col gap-[10px]" style={{ minHeight: "200px" }}>
      <button
        type="button"
        onClick={() => !isSubmitted && setEditing(true)}
        disabled={isSubmitted}
        className="w-full rounded-[12px] overflow-hidden text-left"
        style={{ background: "#ffffff", border: "2px solid #e8e9ff", minHeight: "420px" }}
      >
        {value ? (
          <img src={value} alt="essay-handwriting" className="w-full h-[420px] object-contain" />
        ) : (
          <div className="w-full h-[420px] px-[16px] py-[14px] text-[#a8abb2] text-[14px]">????</div>
        )}
      </button>
      {!isSubmitted && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="self-end h-[32px] px-[14px] rounded-[999px] bg-[#f4f5ff] text-[#7f85a8] text-[13px]"
        >
          ??
        </button>
      )}
      <HandwriteBoard
        open={editing}
        title="???????"
        fullHeight
        onClose={() => setEditing(false)}
        onConfirm={(img) => {
          onChange(img);
          setEditing(false);
        }}
      />
    </div>
  );
}

// ============ DRAFT DRAWER ============
function DraftDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 z-10"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 200,
            }}
            className="absolute right-0 top-0 h-full w-[400px] bg-white z-20 shadow-2xl flex flex-col"
            style={{ borderRadius: "0 0 0 24px" }}
          >
            <div className="bg-[#c5d3ff] h-[56px] flex items-center justify-between px-[20px] shrink-0">
              <div
                className="flex items-center gap-[6px] text-[#33347c] text-[18px]"
                style={{ fontWeight: 600 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path d={svgPaths.p2a71dc00} fill="#33347C" />
                </svg>
                草稿纸
              </div>
              <button
                onClick={onClose}
                className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] transition-all"
              >
                <X className="w-[18px] h-[18px] text-[#33347c]" />
              </button>
            </div>
            <div className="flex-1 p-[16px] flex flex-col gap-[12px]">
              <p className="text-[#a8abb2] text-[13px]">
                在此处记录解题思路、草稿计算过程
              </p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="在这里写下你的计算过程和思路..."
                className="flex-1 w-full rounded-[12px] p-[14px] text-[15px] leading-[1.8] outline-none resize-none"
                style={{
                  background: "#fafafa",
                  border: "2px solid #e8e9ff",
                  color: "#303133",
                }}
              />
              <button
                onClick={() => setText("")}
                className="self-end text-[#a8abb2] text-[13px] hover:text-[#ff4d4f] transition-colors"
              >
                清空草稿
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============ MAIN COMPONENT ============
export function WrongQuestionReview() {
  const [viewMode, setViewMode] = useState<
    "quiz" | "result" | "wrongDetail"
  >("quiz");
  const [wrongDetailIdx, setWrongDetailIdx] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, string | string[]>
  >({});
  const [fillBlanksMap, setFillBlanksMap] = useState<
    Record<number, string[]>
  >({});
  const [essayMap, setEssayMap] = useState<
    Record<number, string>
  >({});
  const [submitted, setSubmitted] = useState<
    Record<number, boolean>
  >({});
  const [revealed, setRevealed] = useState<
    Record<number, boolean>
  >({});
  const [errorCausesMap, setErrorCausesMap] = useState<
    Record<number, string[]>
  >({});
  const [confirmedMap, setConfirmedMap] = useState<
    Record<number, boolean>
  >({});
  const [showDraft, setShowDraft] = useState(false);

  // ---- Derived ----
  const question = QUESTIONS[currentIndex];
  const isSubmitted = submitted[question.id] || false;
  const isRevealed = revealed[question.id] || false;
  const userAnswer = answers[question.id];
  const fillBlanks =
    fillBlanksMap[question.id] ||
    Array(question.blanksCount || 0).fill("");
  const essayText = essayMap[question.id] || "";
  const selectedCauses = errorCausesMap[question.id] || [];
  const isConfirmed = confirmedMap[question.id] || false;
  const isLast = currentIndex === QUESTIONS.length - 1;

  // Compute per-question result status
  const questionResults = QUESTIONS.map((q) => {
    const isQ_Submitted = submitted[q.id] || false;
    const isQ_Revealed = revealed[q.id] || false;
    let isQ_Correct = false;
    if (isQ_Submitted && !isQ_Revealed && q.type !== "解答题") {
      if (q.type === "填空题") {
        const blanks = fillBlanksMap[q.id] || [];
        isQ_Correct = (q.correctAnswer as string[]).every(
          (c, i) => checkBlankCorrect(c, blanks[i] || ""),
        );
      } else {
        isQ_Correct = checkIsCorrect(q, answers[q.id] ?? "");
      }
    }
    return {
      index: QUESTIONS.indexOf(q),
      id: q.id,
      isCorrect: isQ_Correct,
      isRevealed: isQ_Revealed,
      isSubmitted: isQ_Submitted,
    };
  });

  // Wrong questions list
  const wrongQuestions = QUESTIONS.filter((q, idx) => {
    const r = questionResults[idx];
    return r.isSubmitted && (!r.isCorrect || r.isRevealed);
  });

  const wrongDetailQuestion =
    wrongQuestions[wrongDetailIdx] || wrongQuestions[0];
  const wrongDetailIsLast =
    wrongDetailIdx >= wrongQuestions.length - 1;

  // ---- Handlers ----
  const handleSelectOption = (label: string) => {
    if (isSubmitted || isRevealed) return;
    if (
      question.type === "单选题" ||
      question.type === "判断题"
    ) {
      setAnswers((prev) => ({ ...prev, [question.id]: label }));
    } else if (question.type === "多选题") {
      const current = (answers[question.id] as string[]) || [];
      const updated = current.includes(label)
        ? current.filter((l) => l !== label)
        : [...current, label];
      setAnswers((prev) => ({
        ...prev,
        [question.id]: updated,
      }));
    }
  };

  const handleFillBlank = (idx: number, val: string) => {
    const current =
      fillBlanksMap[question.id] ||
      Array(question.blanksCount || 0).fill("");
    const updated = [...current];
    updated[idx] = val;
    setFillBlanksMap((prev) => ({
      ...prev,
      [question.id]: updated,
    }));
  };

  const handleToggleCause = (cause: string) => {
    const current = errorCausesMap[question.id] || [];
    const updated = current.includes(cause)
      ? current.filter((c) => c !== cause)
      : [...current, cause];
    setErrorCausesMap((prev) => ({
      ...prev,
      [question.id]: updated,
    }));
  };

  const handleSubmit = () =>
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));
  const handleReveal = () => {
    setRevealed((prev) => ({ ...prev, [question.id]: true }));
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (!isLast) setCurrentIndex(currentIndex + 1);
  };
  const handleFinish = () => setViewMode("result");

  // ---- Result screen ----
  if (viewMode === "result") {
    return (
      <ResultScreen
        questions={QUESTIONS}
        questionResults={questionResults}
        onGoToQuestion={(idx) => {
          setCurrentIndex(idx);
          setViewMode("quiz");
        }}
        onWrongDetail={() => {
          setWrongDetailIdx(0);
          setViewMode("wrongDetail");
        }}
        onBack={() => setViewMode("quiz")}
      />
    );
  }

  // ---- Wrong detail view ----
  if (viewMode === "wrongDetail" && wrongDetailQuestion) {
    const wdQ = wrongDetailQuestion;
    const wdSubmitted = submitted[wdQ.id] || false;
    const wdRevealed = revealed[wdQ.id] || false;
    const wdAnswer = answers[wdQ.id];
    const wdBlanks =
      fillBlanksMap[wdQ.id] ||
      Array(wdQ.blanksCount || 0).fill("");
    const wdEssay = essayMap[wdQ.id] || "";
    const wdCauses = errorCausesMap[wdQ.id] || [];
    const wdConfirmed = confirmedMap[wdQ.id] || false;

    return (
      <div className="w-[1280px] h-[800px] bg-[#e3e9ff] relative overflow-hidden">
        {/* Wrong-detail nav */}
        <div className="absolute top-0 left-0 w-[1280px] h-[56px] bg-[#c5d3ff] flex items-center justify-between px-[30px]">
          <button
            onClick={() => setViewMode("result")}
            className="flex items-center gap-[8px] cursor-pointer"
          >
            <div className="w-[40px] h-[40px] relative">
              <svg
                className="absolute block"
                style={{
                  left: "10.29px",
                  top: "11.62px",
                  width: "19.258px",
                  height: "17.428px",
                }}
                fill="none"
                viewBox="0 0 19.258 17.4284"
              >
                <path d={svgPaths.p2cbb90f0} fill="#33347C" />
              </svg>
            </div>
            <span
              className="text-[#33347c] text-[24px]"
              style={{ fontWeight: 600 }}
            >
              错题解析
            </span>
          </button>

          <div className="bg-[#f4f4ff] flex items-center gap-[12px] h-[40px] px-[16px] rounded-[9999px]">
            <button
              onClick={() =>
                setWrongDetailIdx((i) => Math.max(0, i - 1))
              }
              disabled={wrongDetailIdx === 0}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#e8e9ff] disabled:opacity-40 transition-all"
            >
              <ChevronLeft className="w-[18px] h-[18px] text-[#606266]" />
            </button>
            <div
              className="flex items-center gap-[4px] text-[18px]"
              style={{ fontWeight: 600 }}
            >
              <span className="text-[#ff5c5c]">
                {wrongDetailIdx + 1}
              </span>
              <span className="text-[#a8abb2]">/</span>
              <span className="text-[#a8abb2]">
                {wrongQuestions.length}
              </span>
            </div>
            <button
              onClick={() =>
                setWrongDetailIdx((i) =>
                  Math.min(wrongQuestions.length - 1, i + 1),
                )
              }
              disabled={wrongDetailIsLast}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#e8e9ff] disabled:opacity-40 transition-all"
            >
              <ChevronRight className="w-[18px] h-[18px] text-[#606266]" />
            </button>
          </div>

          <button
            onClick={() => setViewMode("result")}
            className="bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.8)] px-[20px] h-[36px] rounded-[36px] text-[#7075ef] text-[15px] hover:bg-[rgba(255,255,255,0.6)] transition-all"
          >
            返回结果
          </button>
        </div>

        <div className="absolute left-[24px] top-[72px] w-[1232px] h-[712px] flex gap-[8px]">
          <QuestionPanel
            question={wdQ}
            questionIndex={QUESTIONS.indexOf(wdQ)}
            total={QUESTIONS.length}
            isSubmitted={wdSubmitted}
            isRevealed={wdRevealed}
          />
          <AnswerPanel
            question={wdQ}
            userAnswer={wdAnswer}
            fillBlanks={wdBlanks}
            essayText={wdEssay}
            isSubmitted={wdSubmitted}
            isRevealed={wdRevealed}
            isLast={wrongDetailIsLast}
            selectedCauses={wdCauses}
            confirmed={wdConfirmed}
            onSelectOption={() => {}}
            onFillBlank={() => {}}
            onEssayChange={() => {}}
            onSubmit={() => {}}
            onReveal={() => {}}
            onNext={() =>
              setWrongDetailIdx((i) =>
                Math.min(wrongQuestions.length - 1, i + 1),
              )
            }
            onFinish={() => setViewMode("result")}
            onToggleCause={(cause) => {
              const cur = errorCausesMap[wdQ.id] || [];
              const upd = cur.includes(cause)
                ? cur.filter((c) => c !== cause)
                : [...cur, cause];
              setErrorCausesMap((prev) => ({
                ...prev,
                [wdQ.id]: upd,
              }));
            }}
            onConfirm={() =>
              setConfirmedMap((prev) => ({
                ...prev,
                [wdQ.id]: !prev[wdQ.id],
              }))
            }
          />
        </div>

        <DraftDrawer
          open={showDraft}
          onClose={() => setShowDraft(false)}
        />
      </div>
    );
  }

  // ---- Quiz view ----
  return (
    <div className="w-[1280px] h-[800px] bg-[#e3e9ff] relative overflow-hidden">
      <NavBar
        currentIndex={currentIndex}
        total={QUESTIONS.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onBack={() => setViewMode("result")}
        onDraft={() => setShowDraft(true)}
      />
      <div className="absolute left-[24px] top-[72px] w-[1232px] h-[712px] flex gap-[8px]">
        <QuestionPanel
          question={question}
          questionIndex={currentIndex}
          total={QUESTIONS.length}
          isSubmitted={isSubmitted}
          isRevealed={isRevealed}
        />
        <AnswerPanel
          question={question}
          userAnswer={userAnswer}
          fillBlanks={fillBlanks}
          essayText={essayText}
          isSubmitted={isSubmitted}
          isRevealed={isRevealed}
          isLast={isLast}
          selectedCauses={selectedCauses}
          confirmed={isConfirmed}
          onSelectOption={handleSelectOption}
          onFillBlank={handleFillBlank}
          onEssayChange={(val) =>
            setEssayMap((prev) => ({
              ...prev,
              [question.id]: val,
            }))
          }
          onSubmit={handleSubmit}
          onReveal={handleReveal}
          onNext={handleNext}
          onFinish={handleFinish}
          onToggleCause={handleToggleCause}
          onConfirm={() =>
            setConfirmedMap((prev) => ({
              ...prev,
              [question.id]: !prev[question.id],
            }))
          }
        />
      </div>
      <DraftDrawer
        open={showDraft}
        onClose={() => setShowDraft(false)}
      />
    </div>
  );
}
