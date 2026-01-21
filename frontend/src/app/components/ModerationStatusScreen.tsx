import { StarBackground } from './StarBackground';
import { Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { WishStatus } from '../types';

interface ModerationStatusScreenProps {
  onBack: () => void;
  status: WishStatus;
  rejectionReason?: string;
}

export function ModerationStatusScreen({
  onBack,
  status,
  rejectionReason,
}: ModerationStatusScreenProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>На главную</span>
        </button>

        {/* Status card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {status === 'moderation' && (
            <>
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-12 h-12 text-yellow-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                На модерации
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ваше желание отправлено на проверку
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 text-left space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Что происходит?</span>
                </p>
                <p className="text-gray-600">
                  Наша команда модераторов проверяет ваше видео, чтобы убедиться, что оно соответствует правилам платформы и безопасно для всех участников.
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Обычное время проверки:</span> до 24 часов
                </p>
                <p className="text-gray-500 text-sm">
                  Вы получите уведомление, когда ваше желание будет опубликовано.
                </p>
              </div>
            </>
          )}

          {status === 'published' && (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Опубликовано! 🎉
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ваше желание прошло модерацию и теперь доступно в ленте
              </p>
              <div className="bg-green-50 rounded-2xl p-6 text-left space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Что дальше?</span>
                </p>
                <p className="text-gray-600">
                  Теперь люди, которые хотят помогать, смогут увидеть ваше желание. Когда кто-то захочет его исполнить, мы отправим вам уведомление.
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Ваши контакты</span> будут доступны только авторизованным пользователям, которые нажмут кнопку "Исполнить желание".
                </p>
              </div>
              <button
                onClick={onBack}
                className="mt-6 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
              >
                Вернуться на главную
              </button>
            </>
          )}

          {status === 'rejected' && (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Не прошло модерацию
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                К сожалению, ваше желание не было одобрено
              </p>
              <div className="bg-red-50 rounded-2xl p-6 text-left space-y-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Причина:</span>
                </p>
                <p className="text-gray-700">
                  {rejectionReason || 'Не указана'}
                </p>
                <div className="border-t border-red-200 my-4 pt-4">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Что можно сделать?</span>
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Учтите замечания модератора</li>
                    <li>Перезапишите видео или исправьте описание</li>
                    <li>Отправьте желание повторно</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={onBack}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-full transition-all"
                >
                  На главную
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105"
                >
                  Попробовать снова
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
