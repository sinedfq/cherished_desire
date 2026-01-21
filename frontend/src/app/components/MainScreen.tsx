import { User, HandHeart } from 'lucide-react';
import { StarBackground } from './StarBackground';

interface MainScreenProps {
  onNavigate: (screen: 'zagadat' | 'ispolnit' | 'login' | 'fulfilled-gallery' | 'trust-and-safety') => void;
  isLoggedIn: boolean;
}

export function MainScreen({ onNavigate, isLoggedIn }: MainScreenProps) {
  const handleAction = (screen: 'zagadat' | 'ispolnit') => {
    if (!isLoggedIn) {
      onNavigate('login');
    } else {
      onNavigate(screen);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <StarBackground />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Title at top for mobile, bottom for desktop */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-wide md:order-2 md:mt-12">
          ДРИМИ
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl text-center mb-8 md:mb-12 md:order-3">
          Место, где мечты становятся реальностью ✨
        </p>

        {/* Action cards */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-2xl md:order-1">
          {/* Загадать card */}
          <button
            onClick={() => handleAction('zagadat')}
            className="flex-1 bg-blue-100 rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
              {/* Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow relative">
                <User className="w-12 h-12 md:w-16 md:h-16 text-blue-400 stroke-[1.5]" />
                <div className="absolute ml-8 mt-8 text-red-400 text-2xl">♥</div>
              </div>
              
              {/* Label */}
              <span className="text-2xl md:text-3xl font-bold text-gray-700 tracking-wider">
                ЗАГАДАТЬ
              </span>
              <span className="text-sm text-gray-500">желание</span>
            </div>
          </button>

          {/* Исполнить card */}
          <button
            onClick={() => handleAction('ispolnit')}
            className="flex-1 bg-green-100 rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
              {/* Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <HandHeart className="w-12 h-12 md:w-16 md:h-16 text-green-400 stroke-[1.5]" />
              </div>
              
              {/* Label */}
              <span className="text-2xl md:text-3xl font-bold text-gray-700 tracking-wider">
                ИСПОЛНИТЬ
              </span>
              <span className="text-sm text-gray-500">желание</span>
            </div>
          </button>
        </div>

        {/* Bottom links */}
        <div className="flex gap-6 mt-8 md:mt-12 md:order-4 text-sm">
          <button
            onClick={() => onNavigate('fulfilled-gallery')}
            className="text-gray-500 hover:text-gray-700 transition-colors underline"
          >
            Исполненные мечты
          </button>
          <span className="text-gray-300">•</span>
          <button
            onClick={() => onNavigate('trust-and-safety')}
            className="text-gray-500 hover:text-gray-700 transition-colors underline"
          >
            Безопасность
          </button>
        </div>
      </div>
    </div>
  );
}