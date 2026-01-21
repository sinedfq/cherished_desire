import { StarBackground } from './StarBackground';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Wish } from '../types';

interface FulfilledGalleryProps {
  onBack: () => void;
  fulfilledWishes: Wish[];
}

export function FulfilledGallery({ onBack, fulfilledWishes }: FulfilledGalleryProps) {
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
            Исполненные мечты
          </h2>
          <div className="w-20"></div>
        </div>

        {/* Hero section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Здесь живут осуществлённые мечты ✨
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Каждая история — это доказательство того, что доброта существует, 
            и мечты сбываются благодаря неравнодушным людям.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-blue-600 mb-1">
              {fulfilledWishes.length}
            </p>
            <p className="text-sm text-blue-700">Исполнено</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-green-600 mb-1">
              {new Set(fulfilledWishes.map((w) => w.fulfilledBy)).size}
            </p>
            <p className="text-sm text-green-700">Исполнителей</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-purple-600 mb-1">💙</p>
            <p className="text-sm text-purple-700">Бесконечно</p>
          </div>
        </div>

        {/* Gallery */}
        {fulfilledWishes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              Скоро здесь появятся первые истории
            </p>
            <p className="text-gray-400">
              Когда желания начнут исполняться, мы покажем их здесь
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fulfilledWishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={wish.videoUrl}
                    alt={wish.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-green-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" />
                    Исполнено
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2">
                      {wish.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {wish.description}
                  </p>

                  {/* User info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {wish.userName.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{wish.userName}</span>
                    </div>

                    {wish.fulfilledAt && (
                      <span className="text-xs text-gray-400">
                        {new Date(wish.fulfilledAt).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inspirational message */}
        <div className="mt-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-lg p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Станьте частью этой истории 💫
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Каждое исполненное желание начинается с одного простого шага — 
            желания помочь. Вы тоже можете изменить чью-то жизнь к лучшему.
          </p>
          <button
            onClick={onBack}
            className="bg-green-400 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Исполнить желание
          </button>
        </div>
      </div>
    </div>
  );
}
