import { Upload, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StarBackground } from './StarBackground';

interface ZagadatScreenProps {
  onBack: () => void;
}

export function ZagadatScreen({ onBack }: ZagadatScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimer(0);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col px-4 py-8">
      <StarBackground />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm md:text-base"
          >
            ← Назад
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-700 tracking-wide">
              ЗАПИШИ ИЛИ ЗАГРУЗИ
            </h2>
            <Upload className="w-5 h-5 md:w-6 md:h-6 text-gray-600 stroke-[1.5]" />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
          {/* Video preview */}
          <div className="relative w-full max-w-md md:max-w-lg">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1714949308848-d117347154d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwY2hpbGQlMjBoYXBweXxlbnwxfHx8fDE3NjgyMjgxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Smiling child"
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
                  <Circle className="w-3 h-3 fill-red-500 text-red-500 animate-pulse" />
                  <span className="text-sm font-semibold text-gray-700">REC</span>
                </div>
              )}

              {/* Timer */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <span className="text-2xl md:text-3xl font-bold text-gray-700 tabular-nums">
                  {formatTime(timer)}
                </span>
              </div>
            </div>
          </div>

          {/* Text and CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-8 max-w-md">
            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="text-gray-800">РАСКРОЙ </span>
              <span className="text-blue-400">МЕЧТУ</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
              расскажи своё заветное желание
            </p>

            {/* CTA Button */}
            <button
              onClick={handleStart}
              className="bg-green-400 hover:bg-green-500 active:bg-green-600 text-white font-bold text-xl md:text-2xl px-12 md:px-16 py-4 md:py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 tracking-wider"
            >
              {isRecording ? 'СТОП' : 'СТАРТ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}