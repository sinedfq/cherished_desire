import { StarBackground } from './StarBackground';
import { ArrowLeft, User as UserIcon, Heart, CheckCircle2, Settings, LogOut } from 'lucide-react';
import { User } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  user: User;
  onLogout: () => void;
}

export function ProfileScreen({ onBack, user, onLogout }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
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
            Профиль
          </h2>
          <div className="w-20"></div>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>

            {/* User info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {user.name}
              </h3>
              <p className="text-gray-500 mb-3">{user.email}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                {user.role === 'загадывающий' && '💙 Загадывающий'}
                {user.role === 'исполнитель' && '💚 Исполнитель'}
                {user.role === 'модератор' && '⚡ Модератор'}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <Heart className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {user.wishesCreated}
              </p>
              <p className="text-sm text-gray-600">Загадано желаний</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {user.wishesFulfilled}
              </p>
              <p className="text-sm text-gray-600">Исполнено желаний</p>
            </div>
          </div>
        </div>

        {/* Settings section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800">Настройки</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-gray-700">Видимость контактов</span>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Включено
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-gray-700">Уведомления</span>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Включено
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-gray-700">Приватность</span>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left">
              <span className="text-gray-700">О платформе</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Выйти из аккаунта
        </button>

        {/* Trust message */}
        <div className="mt-6 text-center text-sm text-gray-500 px-4">
          <p>🔒 Ваши данные защищены и не передаются третьим лицам</p>
        </div>
      </div>
    </div>
  );
}
