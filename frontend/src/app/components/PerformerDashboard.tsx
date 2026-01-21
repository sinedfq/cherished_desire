import { StarBackground } from './StarBackground';
import { ArrowLeft, Heart, CheckCircle2, MessageCircle } from 'lucide-react';
import { Wish } from '../types';

interface PerformerDashboardProps {
  onBack: () => void;
  onWishClick: (wishId: string) => void;
  activeWishes: Wish[];
  fulfilledWishes: Wish[];
}

export function PerformerDashboard({
  onBack,
  onWishClick,
  activeWishes,
  fulfilledWishes,
}: PerformerDashboardProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
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
            Мои дела
          </h2>
          <div className="w-20"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl shadow-lg p-6 text-white">
            <Heart className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-bold mb-1">{activeWishes.length}</p>
            <p className="text-blue-100">Активных желаний</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-3xl shadow-lg p-6 text-white">
            <CheckCircle2 className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-bold mb-1">{fulfilledWishes.length}</p>
            <p className="text-green-100">Исполненных желаний</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl shadow-lg p-6 text-white">
            <MessageCircle className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-bold mb-1">0</p>
            <p className="text-purple-100">Новых сообщений</p>
          </div>
        </div>

        {/* Active wishes section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Активные желания
          </h3>
          
          {activeWishes.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">Нет активных желаний</p>
              <p className="text-gray-400">Выберите желание из ленты, чтобы начать помогать</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeWishes.map((wish) => (
                <button
                  key={wish.id}
                  onClick={() => onWishClick(wish.id)}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all p-6 text-left"
                >
                  <div className="flex gap-4">
                    <img
                      src={wish.videoUrl}
                      alt={wish.title}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                        {wish.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        {wish.userName}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          В процессе
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fulfilled wishes section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Исполненные желания
          </h3>
          
          {fulfilledWishes.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">Ещё нет исполненных желаний</p>
              <p className="text-gray-400">Когда вы исполните первое желание, оно появится здесь</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fulfilledWishes.map((wish) => (
                <div
                  key={wish.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >
                  <img
                    src={wish.videoUrl}
                    alt={wish.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                      {wish.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">
                      {wish.userName}
                    </p>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-semibold">Исполнено</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Emotional section */}
        <div className="mt-12 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Спасибо за вашу доброту! 💙
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Каждое исполненное желание делает чью-то жизнь лучше. Вы делаете важную работу, продолжайте помогать людям осуществлять их мечты.
          </p>
        </div>
      </div>
    </div>
  );
}
