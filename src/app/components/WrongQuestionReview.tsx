import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Tag,
  PencilLine,
  PenLine,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Check,
  Image as ImageIcon,
  Mic,
  Video,
} from "lucide-react";
import imgGeometry from "figma:asset/6e109925589a4a403896cd2e02a844159083d75a.png";
import { ResultScreen } from "./ResultScreen";

// Fallback icon path maps. The original generated imports were removed,
// so we guard runtime rendering to avoid ReferenceError -> white screen.
const svgPaths: Record<string, string> = {};
const svgPaths2: Record<string, string> = {};

// ============ TYPES ============
type QuestionType = string;

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
  difficulty: string;
  hasGeometryImage?: boolean;
}

// ============ DATA ============
const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "single",
    content: "解方程 3x - 6 = 0，x 的值是？",
    options: [
      { label: "A", content: "x = 2" },
      { label: "B", content: "x = -2" },
      { label: "C", content: "x = 3" },
      { label: "D", content: "x = -3" },
    ],
    correctAnswer: "A",
    answerText: "x = 2",
    analysisText: "3x - 6 = 0，移项得 3x = 6，所以 x = 2。",
    subject: "数学 · 代数",
    difficulty: "中等",
  },
  {
    id: 2,
    type: "multi",
    content: "下列分数中，属于真分数的是？",
    options: [
      { label: "A", content: "1/2" },
      { label: "B", content: "3/4" },
      { label: "C", content: "7/5" },
      { label: "D", content: "9/8" },
    ],
    correctAnswer: ["A", "B"],
    answerText: "A、B",
    analysisText: "真分数分子小于分母，所以 1/2、3/4 正确。",
    subject: "数学 · 分数",
    difficulty: "简单",
  },
  {
    id: 3,
    type: "judge",
    content: "所有的等边三角形都是等腰三角形。",
    correctAnswer: "true",
    answerText: "对",
    analysisText: "等边三角形三边相等，必然至少有两边相等，所以也是等腰三角形。",
    subject: "数学 · 几何",
    difficulty: "简单",
  },
  {
    id: 4,
    type: "fill",
    content: "计算并填写结果。",
    blanksCount: 3,
    blanksLabels: ["1", "2", "3"],
    correctAnswer: ["312", "103", "191"],
    answerText: "1=312，2=103，3=191",
    analysisText: "按顺序完成三道计算并核对结果。",
    subject: "数学 · 计算",
    difficulty: "中等",
  },
  {
    id: 5,
    type: "essay",
    content: "写出半径为 r 的圆的面积和周长公式。",
    correctAnswer: ["S=πr²", "C=2πr"],
    answerText: "S=πr²，C=2πr",
    analysisText: "圆面积公式 S=πr²，圆周长公式 C=2πr。",
    subject: "数学 · 圆",
    difficulty: "中等",
  },
  {
    id: 6,
    type: "single",
    content: "计算 (-3)^2 + 2×(-3) + 1 的值是？",
    options: [
      { label: "A", content: "4" },
      { label: "B", content: "-14" },
      { label: "C", content: "16" },
      { label: "D", content: "10" },
    ],
    correctAnswer: "A",
    answerText: "4",
    analysisText: "9 - 6 + 1 = 4。",
    subject: "数学 · 代数",
    difficulty: "简单",
  },
  {
    id: 7,
    type: "judge",
    content: "一个三角形内角和等于 180°。",
    correctAnswer: "true",
    answerText: "对",
    analysisText: "平面几何中三角形内角和恒为 180°。",
    subject: "数学 · 几何",
    difficulty: "简单",
  },
  {
    id: 8,
    type: "fill",
    content: "解方程组 3x-y=7，x+y=5，求 x、y。",
    blanksCount: 2,
    blanksLabels: ["1", "2"],
    correctAnswer: ["3", "2"],
    answerText: "x=3，y=2",
    analysisText: "两式相加得 4x=12，x=3，再代入得 y=2。",
    subject: "数学 · 方程组",
    difficulty: "中等",
  },
  {
    id: 9,
    type: "essay",
    content: "请说明为什么任何数乘 0 都等于 0。",
    correctAnswer: ["利用乘法分配律", "结果为0"],
    answerText: "由 a×(0+0)=a×0+a×0，推出 a×0=0。",
    analysisText: "设 a×0=b，则 b=a×(0+0)=a×0+a×0=b+b，因此 b=0。",
    subject: "数学 · 数与式",
    difficulty: "中等",
  },
  {
    id: 10,
    type: "single",
    content: "函数 y=2x-1 与 y 轴的交点是？",
    options: [
      { label: "A", content: "(0,-1)" },
      { label: "B", content: "(0,1)" },
      { label: "C", content: "(1,0)" },
      { label: "D", content: "(2,1)" },
    ],
    correctAnswer: "A",
    answerText: "A",
    analysisText: "令 x=0，得 y=-1，交点为 (0,-1)。",
    subject: "数学 · 函数",
    difficulty: "中等",
  },
  {
    id: 11,
    type: "fill",
    content: "填空：半径为 r 的圆，面积是（1），周长是（2）。",
    blanksCount: 2,
    blanksLabels: ["1", "2"],
    correctAnswer: ["πr²", "2πr"],
    answerText: "1=πr²，2=2πr",
    analysisText: "直接应用圆的面积和周长公式。",
    subject: "数学 · 圆",
    difficulty: "简单",
  },
  {
    id: 12,
    type: "multi",
    content: "下列数中，属于无理数的是？",
    options: [
      { label: "A", content: "√2" },
      { label: "B", content: "π" },
      { label: "C", content: "1/3" },
      { label: "D", content: "0.5" },
    ],
    correctAnswer: ["A", "B"],
    answerText: "A、B",
    analysisText: "√2 和 π 不能表示成两个整数之比，属于无理数。",
    subject: "数学 · 实数",
    difficulty: "中等",
  },
];

const ERROR_CAUSES = [
  "马虎粗心",
  "没有思路",
  "运算错误",
  "知识遗忘",
  "概念未掌握",
];

function normalizeType(qType: string) {
  const v = (qType || "").toLowerCase();
  if (v.includes("single")) return "single";
  if (v.includes("multi")) return "multi";
  if (v.includes("judge")) return "judge";
  if (v.includes("fill")) return "fill";
  if (v.includes("essay")) return "essay";
  return v;
}

function isType(qType: string, labels: string[]) {
  const n = normalizeType(qType);
  return labels.includes(n);
}

function isSingleChoiceType(qType: string) {
  return isType(qType, ["single"]);
}

function isMultiChoiceType(qType: string) {
  return isType(qType, ["multi"]);
}

function isTrueFalseType(qType: string) {
  return isType(qType, ["judge"]);
}

function isFillBlankType(qType: string) {
  return isType(qType, ["fill"]);
}

function isEssayType(qType: string) {
  return isType(qType, ["essay"]);
}

function getTypeLabelZh(qType: string) {
  const t = normalizeType(qType);
  if (t === "single") return "单选题";
  if (t === "multi") return "多选题";
  if (t === "judge") return "判断题";
  if (t === "fill") return "填空题";
  if (t === "essay") return "解答题";
  return "题目";
}

function getHandwritePartLabels(question?: Question | null) {
  if (!question) return ["1"];
  if (isEssayType(question.type)) return ["1"];
  if (isFillBlankType(question.type)) {
    const count = question.blanksCount || 1;
    return Array.from({ length: count }, (_, i) => String(i + 1));
  }

  const matches = (question.content || "").match(/\d+\s*[).、]/g) || [];
  if (matches.length > 0) {
    return matches.map((_, idx) => String(idx + 1));
  }
  return ["1", "2", "3"];
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

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  single: { bg: "#e5e5f9", text: "#7075ef" },
  multi: { bg: "#fff7e6", text: "#d46b08" },
  judge: { bg: "#e6fffb", text: "#08979c" },
  fill: { bg: "#e6f7ff", text: "#096dd9" },
  essay: { bg: "#fff0f6", text: "#c41d7f" },
};

const DIFF_COLORS: Record<string, { bg: string; text: string }> = {
  easy: { bg: "#f6ffed", text: "#389e0d" },
  medium: { bg: "#fff7e6", text: "#d46b08" },
  hard: { bg: "#fff1f0", text: "#cf1322" },
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
              alt={`鍥惧舰${label}`}
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

function checkIsCorrect(
  question: Question,
  userAnswer: string | string[],
) {
  if (isSingleChoiceType(question.type) || isTrueFalseType(question.type)) {
    return userAnswer === question.correctAnswer;
  }
  if (isMultiChoiceType(question.type)) {
    const ua = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
    const ca = Array.isArray(question.correctAnswer)
      ? [...question.correctAnswer].sort()
      : [];
    return ua.length === ca.length && ua.every((v, i) => v === ca[i]);
  }
  return false;
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
  const tc =
    TYPE_COLORS[normalizeType(question.type)] || TYPE_COLORS.single;
  const showAnswer = isSubmitted || isRevealed;

  return (
    <div className="bg-white flex-1 h-full rounded-[24px] overflow-hidden flex flex-col">
      <div className="flex flex-col gap-[24px] p-[24px] h-full overflow-y-auto">
        {/* Type badge + difficulty */}
        <div className="flex items-center shrink-0">
          <div
            className="px-[11px] py-[4px] rounded-[4px] text-[16px]"
            style={{
              backgroundColor: tc.bg,
              color: tc.text,
              fontWeight: 500,
            }}
          >
            {getTypeLabelZh(question.type)}
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
          {(isSingleChoiceType(question.type) || isMultiChoiceType(question.type)) &&
            question.options &&
            question.options.length > 0 && (
              <div className="pl-[24px] flex flex-col gap-[6px] text-[15px] leading-[22px] text-[#5b6175]">
                {question.options.map((opt) => (
                  <div key={`stem-opt-${question.id}-${opt.label}`}>
                    <span className="font-[600]">{opt.label}.</span>{" "}
                    <span>{opt.content}</span>
                  </div>
                ))}
              </div>
            )}
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
  const [customCauses, setCustomCauses] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalSelected, setModalSelected] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [otherRecord, setOtherRecord] = useState("");

  const allCauses = [...ERROR_CAUSES, ...customCauses];

  const openModal = () => {
    const extra = selectedCauses.filter(
      (cause) => !ERROR_CAUSES.includes(cause),
    );
    if (extra.length) {
      setCustomCauses((prev) =>
        Array.from(new Set([...prev, ...extra])),
      );
    }
    setModalSelected(selectedCauses);
    setShowModal(true);
  };

  const toggleModalCause = (cause: string) => {
    setModalSelected((prev) =>
      prev.includes(cause)
        ? prev.filter((c) => c !== cause)
        : [...prev, cause],
    );
  };

  const addCustomCause = () => {
    const text = customInput.trim().slice(0, 6);
    if (!text) return;
    if (!allCauses.includes(text)) {
      setCustomCauses((prev) => [...prev, text]);
    }
    if (!modalSelected.includes(text)) {
      setModalSelected((prev) => [...prev, text]);
    }
    setCustomInput("");
  };

  const saveModal = () => {
    const prevSet = new Set(selectedCauses);
    const nextSet = new Set(modalSelected);
    const all = Array.from(new Set([...selectedCauses, ...modalSelected]));
    all.forEach((cause) => {
      const oldVal = prevSet.has(cause);
      const newVal = nextSet.has(cause);
      if (oldVal !== newVal) onToggle(cause);
    });
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white w-full shrink-0 flex items-center justify-between p-[16px]">
        <span
          className="text-[#414559] text-[18px] shrink-0"
          style={{ fontWeight: 600 }}
        >
          {"\u9519\u56e0\u8bb0\u5f55"}
        </span>
        <div className="flex items-center gap-[6px] overflow-hidden">
          {ERROR_CAUSES.map((cause) => {
            const active = selectedCauses.includes(cause);
            return (
              <button
                key={cause}
                onClick={() => onToggle(cause)}
                className="px-[12px] h-[32px] rounded-[99px] text-[14px] shrink-0"
                style={{
                  background: active ? "#7075ef" : "#ffffff",
                  color: active ? "#ffffff" : "#6b7280",
                  border: active ? "1px solid #7075ef" : "1px solid #e6e8f2",
                }}
              >
                {cause}
              </button>
            );
          })}
          <button
            onClick={openModal}
            className="flex items-center gap-[4px] px-[12px] h-[34px] rounded-[99px] text-[14px] text-[#5f6480] shrink-0 transition-all"
            style={{
              background: "#f4f5ff",
              border: "1px solid #e7e9ff",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3V13"
                stroke="#6B7280"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
              <path
                d="M3 8H13"
                stroke="#6B7280"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
            </svg>
            {"\u81ea\u5b9a\u4e49"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/35 z-40"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
              style={{
                width: "min(840px, 92vw)",
                borderRadius: "28px",
                padding: "20px 28px 24px",
                boxShadow: "0 18px 60px rgba(51,61,127,0.22)",
              }}
            >
              <div className="relative flex items-center justify-center mb-[14px]">
                <h3
                  className="text-[34px] text-[#2f3340]"
                  style={{ fontWeight: 600, lineHeight: 1.1 }}
                >
                  {"\u9519\u56e0\u8bb0\u5f55"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full hover:bg-[#f4f5ff] flex items-center justify-center"
                >
                  <X className="w-[22px] h-[22px] text-[#2f3340]" />
                </button>
              </div>

              <div className="flex items-center gap-[10px] mb-[10px]">
                <div className="w-[44px] h-[44px] rounded-[14px] bg-[#f7ead6] flex items-center justify-center">
                  <Tag className="w-[24px] h-[24px] text-[#f37a20]" />
                </div>
                <div
                  className="text-[24px] text-[#2f3340]"
                  style={{ fontWeight: 600 }}
                >
                  {"\u9519\u56e0\u6807\u8bb0\uff08\u53ef\u591a\u9009\uff09"}
                </div>
              </div>

              <div className="flex flex-wrap gap-[10px] mb-[16px]">
                {allCauses.map((cause) => {
                  const active = modalSelected.includes(cause);
                  return (
                    <button
                      key={cause}
                      onClick={() => toggleModalCause(cause)}
                      className="h-[46px] px-[20px] rounded-[999px] text-[14px]"
                      style={{
                        background: active ? "#6f75f4" : "#ffffff",
                        color: active ? "#ffffff" : "#6f7688",
                        border: active
                          ? "1px solid #6f75f4"
                          : "1px solid #e5e7ee",
                        fontWeight: 500,
                      }}
                    >
                      {cause}
                    </button>
                  );
                })}

                <div
                  className="h-[46px] px-[14px] rounded-[999px] flex items-center"
                  style={{
                    background: "#f0f1ff",
                    border: "1px solid #e3e5ff",
                  }}
                >
                  <input
                    value={customInput}
                    onChange={(e) =>
                      setCustomInput(e.target.value.slice(0, 6))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCustomCause();
                    }}
                    onBlur={addCustomCause}
                    placeholder={"\u6700\u591a6\u5b57"}
                    className="w-[110px] text-[14px] outline-none bg-transparent text-[#7d84f4] placeholder:text-[#adb3ff]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[10px] mb-[10px]">
                <div className="w-[44px] h-[44px] rounded-[14px] bg-[#d9e7fb] flex items-center justify-center">
                  <PencilLine className="w-[24px] h-[24px] text-[#3d7cec]" />
                </div>
                <div
                  className="text-[24px] text-[#2f3340]"
                  style={{ fontWeight: 600 }}
                >
                  {"\u5176\u4ed6\u8bb0\u5f55"}
                </div>
              </div>

              <div
                className="rounded-[16px] p-[12px]"
                style={{
                  border: "1px solid #eceef5",
                  background: "#f9fafc",
                }}
              >
                <textarea
                  value={otherRecord}
                  onChange={(e) =>
                    setOtherRecord(e.target.value.slice(0, 400))
                  }
                  placeholder={"\u8bf7\u8f93\u5165\u9519\u56e0\u8865\u5145\u8bf4\u660e"}
                  className="w-full h-[110px] resize-none bg-transparent outline-none text-[14px] text-[#363b47] leading-[1.6]"
                />
                <div className="flex items-center justify-between mt-[10px]">
                  <div className="flex items-center gap-[18px] text-[#53576d]">
                    <ImageIcon className="w-[22px] h-[22px]" />
                    <Mic className="w-[22px] h-[22px]" />
                    <Video className="w-[22px] h-[22px]" />
                  </div>
                  <span className="text-[14px] text-[#b9bec9]">
                    {otherRecord.length} / 400
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[16px] mt-[18px]">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-[54px] rounded-[999px] text-[16px]"
                  style={{
                    background: "#f1f2f6",
                    color: "#6f7484",
                    fontWeight: 500,
                  }}
                >
                  {"\u53d6\u6d88"}
                </button>
                <button
                  onClick={saveModal}
                  className="flex-1 h-[54px] rounded-[999px] text-[16px] text-white"
                  style={{
                    background: "#6f75f4",
                    fontWeight: 500,
                  }}
                >
                  {"\u4fdd\u5b58"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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
  showConfirmButton?: boolean;
  selectedCauses: string[];
  confirmed: boolean;
  manualJudges?: Record<number, "correct" | "wrong">;
  onSelectOption: (label: string) => void;
  onFillBlank: (idx: number, val: string) => void;
  onEssayChange: (val: string) => void;
  onSubmit: () => void;
  onReveal: () => void;
  onNext: () => void;
  onFinish: () => void;
  onToggleCause: (cause: string) => void;
  onConfirm: () => void;
  onManualJudge: (
    partIndex: number,
    value: "correct" | "wrong",
  ) => void;
}

function AnswerPanelV3(props: AnswerPanelProps) {
  const {
    question,
    userAnswer,
    fillBlanks,
    essayText,
    isSubmitted,
    isRevealed,
    isLast,
    showConfirmButton = false,
    selectedCauses,
    confirmed,
    manualJudges,
    onSelectOption,
    onFillBlank,
    onEssayChange,
    onSubmit,
    onReveal,
    onNext,
    onFinish,
    onToggleCause,
    onConfirm,
    onManualJudge,
  } = props;

  const showResult = isSubmitted || isRevealed;
  const isHandwriteQuestion =
    isFillBlankType(question.type) || isEssayType(question.type);
  const partLabels = getHandwritePartLabels(question);
  const judgeEntries = manualJudges || {};
  const allJudged =
    isHandwriteQuestion && partLabels.every((_, idx) => !!judgeEntries[idx]);
  const hasWrongJudge = Object.values(judgeEntries).includes("wrong");
  const isObjectiveWrong =
    !isHandwriteQuestion &&
    isSubmitted &&
    !isRevealed &&
    !checkIsCorrect(question, userAnswer ?? "");
  const isAnswerable =
    isEssayType(question.type)
      ? essayText.trim().length > 0
      : isFillBlankType(question.type)
        ? fillBlanks.some((b) => b.trim())
        : Array.isArray(userAnswer)
          ? userAnswer.length > 0
          : !!userAnswer;
  const showErrorCause =
    showResult &&
    (isRevealed || (isHandwriteQuestion ? hasWrongJudge : isObjectiveWrong));

  return (
    <div
      className="bg-white shrink-0 h-full rounded-[24px] overflow-hidden flex flex-col"
      style={{ width: "677.6px" }}
    >
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

      <div className="flex-1 overflow-y-auto p-[16px]">
        {(isSingleChoiceType(question.type) ||
          isMultiChoiceType(question.type)) && (
          <ChoiceOptions
            question={question}
            userAnswer={userAnswer}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            onSelect={onSelectOption}
          />
        )}
        {isTrueFalseType(question.type) && (
          <TrueFalseOptions
            userAnswer={userAnswer}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            correctAnswer={question.correctAnswer as string}
            onSelect={onSelectOption}
          />
        )}
        {isFillBlankType(question.type) && (
          <FillBlankInputs
            question={question}
            fillBlanks={fillBlanks}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            manualJudges={manualJudges}
            onManualJudge={onManualJudge}
            onChange={onFillBlank}
          />
        )}
        {isEssayType(question.type) && (
          <FillBlankInputs
            question={question}
            fillBlanks={[essayText]}
            isSubmitted={isSubmitted}
            isRevealed={isRevealed}
            manualJudges={manualJudges}
            onManualJudge={onManualJudge}
            onChange={(_, val) => onEssayChange(val)}
          />
        )}
      </div>
      <div className="shrink-0 px-[16px] pb-[16px]">
        {!showResult ? (
          <div className="flex items-center justify-between">
            <button
              onClick={onReveal}
              className="text-[#8286ef] text-[15px] hover:opacity-70 transition-opacity"
            >
              不会做，<span className="underline">查看答案</span>
            </button>
            <button
              onClick={onSubmit}
              disabled={!isAnswerable}
              className="px-[32px] py-[12px] rounded-[9999px] text-white text-[16px] transition-all"
              style={{
                background: isAnswerable ? "#6672ff" : "#d8dbff",
                boxShadow: isAnswerable
                  ? "0px 12px 28px rgba(102,114,255,0.45)"
                  : "none",
                cursor: isAnswerable ? "pointer" : "not-allowed",
              }}
            >
              提交
            </button>
          </div>
        ) : isHandwriteQuestion ? (
          <div className="flex items-center justify-end gap-[16px]">
            {allJudged && (
              <button
                onClick={isLast ? onFinish : onNext}
                className="px-[32px] py-[14px] rounded-[999px] text-white text-[16px]"
                style={{
                  background: "#7075ef",
                  boxShadow:
                    "0px 8px 20px rgba(112,117,239,0.22)",
                  minWidth: "184px",
                }}
              >
                {isLast ? "批改完成，完成练习" : "批改完成，下一题"}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-end gap-[24px]">
            {showConfirmButton && (
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
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
            )}
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
  const isMulti = isMultiChoiceType(question.type);
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
    { label: "true", icon: "check", text: "正确" },
    { label: "false", icon: "cross", text: "错误" },
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
            <span className="text-[28px] leading-none">
              {icon === "check" ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12L10 17L19 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 7L17 17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 7L7 17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
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
  guideLabels,
  initialImage,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  fullHeight?: boolean;
  guideLabels?: string[];
  initialImage?: string;
  onClose: () => void;
  onConfirm: (img: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<Stroke[]>([]);
  const [isErasing, setIsErasing] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const currentStroke = useRef<Stroke | null>(null);
  const drawBaseImage = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    if (!baseImageRef.current) return;
    const img = baseImageRef.current;
    const sourceW = img.naturalWidth || img.width;
    const sourceH = img.naturalHeight || img.height;
    if (!sourceW || !sourceH) return;

    // Keep original handwriting proportions and avoid upscaling on re-open.
    const scale = Math.min(canvasWidth / sourceW, canvasHeight / sourceH, 1);
    const drawW = sourceW * scale;
    const drawH = sourceH * scale;
    const drawX = (canvasWidth - drawW) / 2;
    const drawY = (canvasHeight - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  const redraw = (nextStrokes: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBaseImage(ctx, canvas.width, canvas.height);
    nextStrokes.forEach((s) => drawStrokePath(ctx, s, "#111111", s.erase ? 22 : 3));
  };

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const rect = box.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width));
    canvas.height = Math.max(1, Math.floor(rect.height));
    setStrokes([]);
    setRedoStrokes([]);
    baseImageRef.current = null;

    if (!initialImage) {
      redraw([]);
      return;
    }

    const img = new Image();
    img.onload = () => {
      baseImageRef.current = img;
      redraw([]);
    };
    img.src = initialImage;
  }, [open, fullHeight, initialImage]);

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
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing || !currentStroke.current) return;
    const p = pointFromEvent(e);
    currentStroke.current.points.push(p);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    redraw(strokes);
    drawStrokePath(ctx, currentStroke.current, "#111111", currentStroke.current.erase ? 22 : 3);
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

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext("2d");

    if (!exportCtx) {
      onConfirm(canvas.toDataURL("image/png"));
      return;
    }

    drawBaseImage(exportCtx, exportCanvas.width, exportCanvas.height);

    strokes.forEach((s) =>
      drawStrokePath(exportCtx, s, "#111111", s.erase ? 22 : 3),
    );

    const imageData = exportCtx.getImageData(
      0,
      0,
      exportCanvas.width,
      exportCanvas.height,
    );
    const { data, width, height } = imageData;

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < minX || maxY < minY) {
      onConfirm(initialImage || "");
      return;
    }

    const padding = 0;
    const cropX = Math.max(0, minX - padding);
    const cropY = Math.max(0, minY - padding);
    const cropW = Math.min(width - cropX, maxX - minX + padding * 2 + 1);
    const cropH = Math.min(height - cropY, maxY - minY + padding * 2 + 1);

    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = cropW;
    trimmedCanvas.height = cropH;
    const trimmedCtx = trimmedCanvas.getContext("2d");

    if (!trimmedCtx) {
      onConfirm(canvas.toDataURL("image/png"));
      return;
    }

    trimmedCtx.drawImage(
      exportCanvas,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      cropW,
      cropH,
    );

    onConfirm(trimmedCanvas.toDataURL("image/png"));
  };

  const toolBtnClass =
    "w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all active:scale-[0.96]";
  const getToolBtnStyle = (
    active?: boolean,
    danger?: boolean,
    disabled?: boolean,
  ): React.CSSProperties => ({
    background: "#ffffff",
    color: disabled ? "#cfd4e6" : danger ? "#ff5c5c" : active ? "#6f75f4" : "#b7bcf7",
    boxShadow: "none",
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  });

  if (!open) return null;
  const guides =
    guideLabels && guideLabels.length > 0
      ? guideLabels
      : ["1", "2", "3"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="h-full rounded-[24px] bg-white border border-[#edf0ff] p-[12px]"
    >
      <div
        ref={boxRef}
        className="relative h-full rounded-[20px] bg-white overflow-hidden"
        style={{ minHeight: fullHeight ? 520 : 420 }}
      >
        <div className="absolute right-[18px] top-[18px] z-10 flex items-center gap-[10px] rounded-[999px] bg-white px-[14px] py-[8px] border border-[#e7e9f8]">
          <button type="button" onClick={handleUndo} disabled={!strokes.length} className={toolBtnClass} style={getToolBtnStyle(!!strokes.length, false, !strokes.length)} title="??">
            <Undo2 className="w-[24px] h-[24px]" strokeWidth={1.8} />
          </button>
          <button type="button" onClick={handleRedo} disabled={!redoStrokes.length} className={toolBtnClass} style={getToolBtnStyle(!!redoStrokes.length, false, !redoStrokes.length)} title="????">
            <Redo2 className="w-[24px] h-[24px]" strokeWidth={1.8} />
          </button>
          <button type="button" onClick={() => setIsErasing(true)} className={toolBtnClass} style={getToolBtnStyle(isErasing)} title="???">
            <Eraser className="w-[22px] h-[22px]" strokeWidth={1.8} />
          </button>
          <button type="button" onClick={() => setIsErasing(false)} className={toolBtnClass} style={getToolBtnStyle(!isErasing)} title="??">
            <PenLine className="w-[22px] h-[22px]" strokeWidth={1.8} />
          </button>
          <button type="button" onClick={handleClear} disabled={!strokes.length && !baseImageRef.current} className={toolBtnClass} style={getToolBtnStyle(!!strokes.length, false, !strokes.length && !baseImageRef.current)} title="??">
            <Trash2 className="w-[22px] h-[22px]" strokeWidth={1.8} />
          </button>
          <div className="w-px h-[34px] bg-[#e4e7ff]" />
          <button type="button" onClick={onClose} className={toolBtnClass} style={getToolBtnStyle(false, true)} title="??">
            <X className="w-[22px] h-[22px]" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={toolBtnClass}
            style={{
              background: "#ECEBFF",
              color: "#6f75f4",
              boxShadow: "none",
            }}
            title="??"
          >
            <Check className="w-[22px] h-[22px]" strokeWidth={2.2} />
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
        />
        <div className="absolute inset-0 pointer-events-none px-[16px] py-[14px] z-0">
          <div className="h-full flex flex-col">
            {guides.map((g, idx) => (
              <div
                key={g + idx}
                className="flex-1 relative"
                style={{
                  borderBottom:
                    idx === guides.length - 1
                      ? "none"
                      : "1px solid #e9ebf7",
                }}
              >
                <span className="absolute left-[4px] top-[6px] text-[18px] text-[#3f4659]">
                  {g}.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ FILL BLANK INPUTS ============
function FillBlankInputs({
  question,
  fillBlanks,
  isSubmitted,
  isRevealed,
  manualJudges,
  onManualJudge,
  onChange,
}: {
  question: Question;
  fillBlanks: string[];
  isSubmitted: boolean;
  isRevealed: boolean;
  manualJudges?: Record<number, "correct" | "wrong">;
  onManualJudge?: (idx: number, value: "correct" | "wrong") => void;
  onChange: (idx: number, val: string) => void;
}) {
  const labels = getHandwritePartLabels(question);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const showJudge = isSubmitted || isRevealed;

  if (editingIdx !== null) {
    return (
      <div className="h-full min-h-[560px]">
        <HandwriteBoard
          open
          title={`第 ${labels[editingIdx]} 题`}
          guideLabels={[labels[editingIdx]]}
          initialImage={fillBlanks[editingIdx] || ""}
          onClose={() => setEditingIdx(null)}
          onConfirm={(img) => {
            onChange(editingIdx, img);
            setEditingIdx(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-[8px] rounded-[20px] overflow-hidden bg-white">
      {labels.map((label, idx) => {
        const val = fillBlanks[idx] || "";
        const judge = manualJudges?.[idx];
        return (
          <div
            key={idx}
            className="flex items-stretch gap-[18px] px-[18px] py-[18px]"
            style={{
              borderTop: idx === 0 ? "none" : "1px solid #eceef8",
              borderBottom:
                labels.length === 1 || idx === labels.length - 1
                  ? "1px solid #eceef8"
                  : "none",
            }}
          >
            <div className="w-[52px] shrink-0 pt-[8px] text-[22px] text-[#454b60]">
              {label}
            </div>
            <div className="flex-1 relative min-h-[72px]">
              <div className="flex items-stretch gap-[16px]">
                <button
                  type="button"
                  onClick={() => !isSubmitted && !isRevealed && setEditingIdx(idx)}
                  disabled={isSubmitted || isRevealed}
                  className="flex-1 min-h-[72px] overflow-hidden transition-all text-left"
                  style={{
                    background: "#ffffff",
                  }}
                >
                  {val ? (
                    <div className="w-full h-full flex items-end justify-start pl-[10px] pr-[18px] pt-[2px] pb-[0px]">
                      <img
                        src={val}
                        alt={"blank-" + (idx + 1)}
                        className="max-w-[72%] max-h-[72%] object-contain"
                      />
                    </div>
                  ) : (
                    <span className="px-[16px] text-[14px] text-[#a8abb2]">{"点击输入"}</span>
                  )}
                </button>
                {showJudge && (
                  <div className="w-[88px] shrink-0 flex flex-col gap-[12px] justify-center">
                    <button
                      type="button"
                      onClick={() => onManualJudge?.(idx, "correct")}
                      className="h-[52px] rounded-[999px] text-[16px] transition-all flex items-center justify-center gap-[6px]"
                      style={{
                        background: judge === "correct" ? "#9BCC37" : "#f7f8fc",
                        color: judge === "correct" ? "#ffffff" : "#b7bdc9",
                        border: judge === "correct" ? "1px solid #9BCC37" : "1px solid #eff1f6",
                      }}
                    >
                      {judge === "correct" && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2.5 7.2L5.6 10.3L11.5 4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {"对了"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onManualJudge?.(idx, "wrong")}
                      className="h-[52px] rounded-[999px] text-[16px] transition-all flex items-center justify-center gap-[6px]"
                      style={{
                        background: judge === "wrong" ? "#FFECE8" : "#f7f8fc",
                        color: judge === "wrong" ? "#ff5c5c" : "#b7bdc9",
                        border: judge === "wrong" ? "1px solid #FFD8D1" : "1px solid #eff1f6",
                      }}
                    >
                      {judge === "wrong" && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M3 3L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M11 3L3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {"错了"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ ESSAY INPUT ============
function EssayInput({
  question,
  value,
  isSubmitted,
  isRevealed,
  judge,
  onManualJudge,
  onChange,
}: {
  question: Question;
  value: string;
  isSubmitted: boolean;
  isRevealed: boolean;
  judge?: "correct" | "wrong";
  onManualJudge?: (value: "correct" | "wrong") => void;
  onChange: (val: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const essayLabels = getHandwritePartLabels(question);

  if (editing) {
    return (
      <div className="h-full min-h-[560px]">
        <HandwriteBoard
          open
          title="第 1 题"
          fullHeight
          guideLabels={[essayLabels[0] || "1"]}
          initialImage={value}
          onClose={() => setEditing(false)}
          onConfirm={(img) => {
            onChange(img);
            setEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px]" style={{ minHeight: "200px" }}>
      <div className="flex items-stretch gap-[16px]">
        <button
          type="button"
          onClick={() => !isSubmitted && !isRevealed && setEditing(true)}
          disabled={isSubmitted || isRevealed}
          className="flex-1 rounded-[12px] overflow-hidden text-left"
          style={{ background: "#ffffff", border: "2px solid #e8e9ff", minHeight: "420px" }}
        >
          {value ? (
            <div className="w-full h-[420px] flex items-center justify-center px-[24px] py-[20px]">
              <img src={value} alt="essay-handwriting" className="max-w-[62%] max-h-[62%] object-contain" />
            </div>
          ) : (
            <div className="w-full h-[420px] px-[16px] py-[14px] text-[#a8abb2] text-[14px]">{"点击输入"}</div>
          )}
        </button>
        {(isSubmitted || isRevealed) && (
          <div className="w-[88px] shrink-0 flex flex-col gap-[12px] justify-center">
            <button
              type="button"
              onClick={() => onManualJudge?.("correct")}
              className="h-[52px] rounded-[999px] text-[16px] transition-all"
              style={{
                background: judge === "correct" ? "#eefad8" : "#f7f8fc",
                color: judge === "correct" ? "#86c73f" : "#b7bdc9",
                border: judge === "correct" ? "1px solid #d7efaf" : "1px solid #eff1f6",
              }}
            >
              {"对了"}
            </button>
            <button
              type="button"
              onClick={() => onManualJudge?.("wrong")}
              className="h-[52px] rounded-[999px] text-[16px] transition-all"
              style={{
                background: judge === "wrong" ? "#fff2f0" : "#f7f8fc",
                color: judge === "wrong" ? "#ff7b67" : "#b7bdc9",
                border: judge === "wrong" ? "1px solid #ffd7d1" : "1px solid #eff1f6",
              }}
            >
              {"错了"}
            </button>
          </div>
        )}
      </div>
      {!isSubmitted && !isRevealed && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="self-end h-[32px] px-[14px] rounded-[999px] bg-[#f4f5ff] text-[#7f85a8] text-[13px]"
        >
          {"清空"}
        </button>
      )}
    </div>
  );
}

// ============ DRAFT DRAWER ============
function DraftOverlay({
  open,
  initialImage,
  onClose,
  onSave,
}: {
  open: boolean;
  initialImage?: string;
  onClose: () => void;
  onSave: (img: string) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const currentStroke = useRef<Stroke | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<Stroke[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const redraw = (nextStrokes: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (baseImageRef.current) {
      ctx.drawImage(baseImageRef.current, 0, 0, canvas.width, canvas.height);
    }
    nextStrokes.forEach((s) =>
      drawStrokePath(ctx, s, "#e53935", s.erase ? 24 : 4),
    );
  };

  useEffect(() => {
    if (!open) return;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const rect = box.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width));
    canvas.height = Math.max(1, Math.floor(rect.height));
    setStrokes([]);
    setRedoStrokes([]);
    baseImageRef.current = null;
    if (!initialImage) {
      redraw([]);
      return;
    }
    const img = new Image();
    img.onload = () => {
      baseImageRef.current = img;
      redraw([]);
    };
    img.src = initialImage;
  }, [open, initialImage]);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
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
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing || !currentStroke.current) return;
    const p = pointFromEvent(e);
    currentStroke.current.points.push(p);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    redraw(strokes);
    drawStrokePath(ctx, currentStroke.current, "#e53935", currentStroke.current.erase ? 24 : 4);
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
    baseImageRef.current = null;
    redraw([]);
  };
  const handleConfirm = () => {
    const canvas = canvasRef.current;
    onSave(canvas ? canvas.toDataURL("image/png") : "");
    onClose();
  };

  const toolBtnClass =
    "w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all active:scale-[0.96]";
  const getToolBtnStyle = (
    active?: boolean,
    danger?: boolean,
    disabled?: boolean,
  ): React.CSSProperties => ({
    background: "#ffffff",
    color: disabled ? "#cfd4e6" : danger ? "#ff5c5c" : active ? "#6f75f4" : "#b7bcf7",
    boxShadow: "none",
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30"
        >
          <div className="absolute inset-0 bg-black/35" />
          <div ref={boxRef} className="absolute inset-0">
            <canvas
              ref={canvasRef}
              className="w-full h-full block touch-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endStroke}
              onPointerLeave={endStroke}
            />
          </div>
          <div className="absolute right-[28px] top-[82px] z-40 flex items-center gap-[10px] rounded-[999px] bg-white px-[14px] py-[8px] border border-[#e7e9f8]">
            <button type="button" onClick={handleUndo} disabled={!strokes.length} className={toolBtnClass} style={getToolBtnStyle(!!strokes.length, false, !strokes.length)}>
              <Undo2 className="w-[24px] h-[24px]" strokeWidth={1.8} />
            </button>
            <button type="button" onClick={handleRedo} disabled={!redoStrokes.length} className={toolBtnClass} style={getToolBtnStyle(!!redoStrokes.length, false, !redoStrokes.length)}>
              <Redo2 className="w-[24px] h-[24px]" strokeWidth={1.8} />
            </button>
            <button type="button" onClick={() => setIsErasing(true)} className={toolBtnClass} style={getToolBtnStyle(isErasing)}>
              <Eraser className="w-[22px] h-[22px]" strokeWidth={1.8} />
            </button>
            <button type="button" onClick={() => setIsErasing(false)} className={toolBtnClass} style={getToolBtnStyle(!isErasing)}>
              <PenLine className="w-[22px] h-[22px]" strokeWidth={1.8} />
            </button>
            <button type="button" onClick={handleClear} disabled={!strokes.length && !baseImageRef.current} className={toolBtnClass} style={getToolBtnStyle(!!strokes.length, false, !strokes.length && !baseImageRef.current)}>
              <Trash2 className="w-[22px] h-[22px]" strokeWidth={1.8} />
            </button>
            <div className="w-px h-[34px] bg-[#e4e7ff]" />
            <button type="button" onClick={onClose} className={toolBtnClass} style={getToolBtnStyle(false, true)}>
              <X className="w-[22px] h-[22px]" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className={toolBtnClass}
              style={{
                background: "#ECEBFF",
                color: "#6f75f4",
                boxShadow: "none",
              }}
            >
              <Check className="w-[22px] h-[22px]" strokeWidth={2.2} />
            </button>
          </div>
        </motion.div>
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
  const [manualJudgeMap, setManualJudgeMap] = useState<
    Record<number, Record<number, "correct" | "wrong">>
  >({});
  const [showDraft, setShowDraft] = useState(false);
  const [draftMap, setDraftMap] = useState<Record<number, string>>({});

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
  const manualJudges = manualJudgeMap[question.id] || {};
  const isLast = currentIndex === QUESTIONS.length - 1;
  const isCurrentHandwriteQuestion =
    isFillBlankType(question.type) || isEssayType(question.type);
  // Compute per-question result status
  const questionResults = QUESTIONS.map((q) => {
    const isQ_Submitted = submitted[q.id] || false;
    const isQ_Revealed = revealed[q.id] || false;
    const isQ_Manual = manualJudgeMap[q.id] || {};
    let isQ_Correct = false;

    if (isFillBlankType(q.type) || isEssayType(q.type)) {
      const partCount = getHandwritePartLabels(q).length;
      const hasAllJudges =
        partCount > 0 &&
        Array.from({ length: partCount }).every(
          (_, idx) => !!isQ_Manual[idx],
        );
      isQ_Correct =
        isQ_Submitted &&
        !isQ_Revealed &&
        hasAllJudges &&
        !Object.values(isQ_Manual).includes("wrong");
    } else if (isQ_Submitted && !isQ_Revealed) {
      if (isFillBlankType(q.type)) {
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
      isSingleChoiceType(question.type) ||
      isTrueFalseType(question.type)
    ) {
      setAnswers((prev) => ({ ...prev, [question.id]: label }));
    } else if (isMultiChoiceType(question.type)) {
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

  const handleSelectOptionV2 = (label: string) => {
    if (isSubmitted || isRevealed) return;
    if (
      isSingleChoiceType(question.type) ||
      isTrueFalseType(question.type)
    ) {
      setAnswers((prev) => ({ ...prev, [question.id]: label }));
      return;
    }
    if (isMultiChoiceType(question.type)) {
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

  const handleSubmit = () => {
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));

    // Objective questions auto-advance when correct.
    const isObjective =
      isSingleChoiceType(question.type) ||
      isMultiChoiceType(question.type) ||
      isTrueFalseType(question.type);
    if (!isObjective || isLast) return;

    const currentAnswer = answers[question.id] ?? "";
    if (!checkIsCorrect(question, currentAnswer)) return;

    setTimeout(() => {
      setCurrentIndex((idx) =>
        idx < QUESTIONS.length - 1 ? idx + 1 : idx,
      );
    }, 420);
  };
  const handleReveal = () => {
    const revealJudges = Object.fromEntries(
      getHandwritePartLabels(question).map((_, idx) => [idx, "wrong"]),
    ) as Record<number, "wrong">;
    setRevealed((prev) => ({ ...prev, [question.id]: true }));
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));
    setManualJudgeMap((prev) => ({
      ...prev,
      [question.id]: revealJudges,
    }));
  };
  const handleManualJudge = (
    partIndex: number,
    value: "correct" | "wrong",
  ) =>
    setManualJudgeMap((prev) => ({
      ...prev,
      [question.id]: {
        ...(prev[question.id] || {}),
        [partIndex]: value,
      },
    }));
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
          const targetQuestion = QUESTIONS[idx];
          const targetWrongIdx = wrongQuestions.findIndex((wq) => wq.id === targetQuestion.id);
          if (targetWrongIdx >= 0) {
            setWrongDetailIdx(targetWrongIdx);
            setViewMode("wrongDetail");
            return;
          }
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
          <AnswerPanelV3
            question={wdQ}
            userAnswer={wdAnswer}
            fillBlanks={wdBlanks}
            essayText={wdEssay}
            isSubmitted={wdSubmitted}
            isRevealed={wdRevealed}
            isLast={wrongDetailIsLast}
            showConfirmButton
            selectedCauses={wdCauses}
            confirmed={wdConfirmed}
            manualJudges={manualJudgeMap[wdQ.id]}
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
            onManualJudge={(partIndex, value) =>
              setManualJudgeMap((prev) => ({
                ...prev,
                [wdQ.id]: {
                  ...(prev[wdQ.id] || {}),
                  [partIndex]: value,
                },
              }))
            }
          />
        </div>

        <DraftOverlay
          open={showDraft}
          initialImage={draftMap[wdQ.id] || ""}
          onClose={() => setShowDraft(false)}
          onSave={(img) =>
            setDraftMap((prev) => ({
              ...prev,
              [wdQ.id]: img,
            }))
          }
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
        <AnswerPanelV3
          question={question}
          userAnswer={userAnswer}
          fillBlanks={fillBlanks}
          essayText={essayText}
          isSubmitted={isSubmitted}
          isRevealed={isRevealed}
          isLast={isLast}
          showConfirmButton={false}
          selectedCauses={selectedCauses}
          confirmed={isConfirmed}
          manualJudges={manualJudges}
          onSelectOption={handleSelectOptionV2}
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
          onManualJudge={handleManualJudge}
        />
      </div>
      <DraftOverlay
        open={showDraft}
        initialImage={draftMap[question.id] || ""}
        onClose={() => setShowDraft(false)}
        onSave={(img) =>
          setDraftMap((prev) => ({
            ...prev,
            [question.id]: img,
          }))
        }
      />
    </div>
  );
}








