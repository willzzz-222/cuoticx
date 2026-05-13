import { WrongQuestionReview } from './components/WrongQuestionReview';

export default function App() {
  return (
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
  );
}
