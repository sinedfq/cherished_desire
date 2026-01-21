import { StarBackground } from './StarBackground';
import { ArrowLeft, Play, Phone, Mail, Send, Heart } from 'lucide-react';
import { Wish } from '../types';
import { useState } from 'react';

interface WishDetailsScreenProps {
  onBack: () => void;
  wish: Wish;
  onCommit: (wishId: string) => void;
}

export function WishDetailsScreen({ onBack, wish, onCommit }: WishDetailsScreenProps) {
  const [showContacts, setShowContacts] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCommit = () => {
    setShowConfirmModal(false);
    setShowContacts(true);
    onCommit(wish.id);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад к списку</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
              <img
                src={wish.videoUrl}
                alt={wish.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-gray-700 ml-1" />
                </div>
              </div>
              
              {wish.ageCategory && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-gray-700">
                  {wish.ageCategory}
                </div>
              )}
            </div>

            {/* User info */}
            <div className="bg-white rounded-3xl shadow-lg p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                  {wish.userName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{wish.userName}</p>
                  <p className="text-sm text-gray-500">
                    Загадал {new Date(wish.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-6">
            {/* Title and description */}
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {wish.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {wish.description}
              </p>
            </div>

            {/* Contact section */}
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
              {!showContacts ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Готовы исполнить это желание?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    После подтверждения вы получите контактные данные для связи с автором желания.
                  </p>
                  <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">💙 Помните:</span> исполнение желания — это акт доброты и ответственности. Пожалуйста, свяжитесь с автором и доведите дело до конца.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold text-lg py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Я готов(а) исполнить
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Контактные данные
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6">
                    Свяжитесь с автором желания, чтобы обсудить детали:
                  </p>

                  <div className="space-y-4">
                    {wish.contactPhone && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500">Телефон</p>
                          <p className="font-semibold text-gray-800">{wish.contactPhone}</p>
                        </div>
                      </div>
                    )}

                    {wish.contactTelegram && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                        <Send className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500">Telegram</p>
                          <p className="font-semibold text-gray-800">{wish.contactTelegram}</p>
                        </div>
                      </div>
                    )}

                    {wish.contactEmail && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-semibold text-gray-800">{wish.contactEmail}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-2xl">
                    <p className="text-sm text-green-800">
                      ✨ Спасибо, что делаете мир добрее! Желаем вам приятного общения.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-green-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Подтвердите решение
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Вы уверены, что готовы взять на себя ответственность за исполнение этого желания?
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCommit}
                className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-2xl transition-colors"
              >
                Да, я готов(а)
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-2xl transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
