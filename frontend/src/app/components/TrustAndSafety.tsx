import { StarBackground } from './StarBackground';
import { ArrowLeft, Shield, Heart, Lock, Eye, Users, CheckCircle } from 'lucide-react';

interface TrustAndSafetyProps {
  onBack: () => void;
}

export function TrustAndSafety({ onBack }: TrustAndSafetyProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Безопасность и доверие
          </h1>
          <p className="text-lg text-gray-600">
            Как мы защищаем наших пользователей
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {/* Moderation */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Модерация контента
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Каждое желание проходит проверку нашей командой модераторов в течение 24 часов. Мы следим за тем, чтобы платформа оставалась безопасной и доброжелательной.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Защита данных
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ваши персональные данные и контакты защищены. Контактная информация видна только авторизованным пользователям, которые готовы исполнить желание.
                </p>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Прозрачность
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Мы четко показываем статус каждого желания и предоставляем обратную связь на всех этапах. Вы всегда знаете, что происходит с вашим желанием.
                </p>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Сообщество доброты
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Наша платформа построена на доверии и взаимопомощи. Мы тщательно следим за тем, чтобы взаимодействия между пользователями были безопасными и уважительными.
                </p>
              </div>
            </div>
          </div>

          {/* Kindness */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Ответственность
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Мы призываем всех участников относиться к исполнению желаний ответственно. Если вы взялись помочь — доведите дело до конца. Каждое исполненное желание — это настоящее чудо.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Остались вопросы?
          </h3>
          <p className="text-gray-600 mb-6">
            Мы всегда рады помочь. Свяжитесь с нами, если у вас возникли вопросы или проблемы.
          </p>
          <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105">
            Связаться с поддержкой
          </button>
        </div>
      </div>
    </div>
  );
}
