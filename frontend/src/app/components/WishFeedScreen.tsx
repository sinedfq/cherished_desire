import { StarBackground } from './StarBackground';
import { ArrowLeft, Play } from 'lucide-react';
import { Wish } from '../types';

interface WishFeedScreenProps {
  onBack: () => void;
  onWishClick: (wishId: string) => void;
  wishes: Wish[];
}

export function WishFeedScreen({ onBack, onWishClick, wishes }: WishFeedScreenProps) {
  const publishedWishes = wishes.filter((wish) => wish.status === 'published');

  return (
    <div className="min-h-screen bg-white relative overflow-hidden px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Исполнить желание
          </h2>
          <div className="w-20"></div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Выберите желание, которое вы готовы исполнить. 
          Каждое доброе дело делает мир лучше ✨
        </p>

        {/* Wishes grid */}
        {publishedWishes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Пока нет опубликованных желаний</p>
            <p className="text-gray-400 mt-2">Загляните позже!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedWishes.map((wish) => (
              <button
                key={wish.id}
                onClick={() => onWishClick(wish.id)}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group text-left"
              >
                {/* Video preview */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={wish.videoUrl}
                    alt={wish.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-gray-700 ml-1" />
                    </div>
                  </div>
                  
                  {/* Age category badge */}
                  {wish.ageCategory && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {wish.ageCategory}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {wish.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {wish.description}
                  </p>
                  
                  {/* User info */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {wish.userName.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-600">{wish.userName}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <div className="bg-green-100 text-green-700 font-semibold text-center py-3 rounded-2xl group-hover:bg-green-400 group-hover:text-white transition-colors">
                    Исполнить желание
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
