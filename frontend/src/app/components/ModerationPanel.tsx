import { StarBackground } from './StarBackground';
import { ArrowLeft, Play, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Wish, WishStatus } from '../types';
import { useState } from 'react';

interface ModerationPanelProps {
  onBack: () => void;
  wishes: Wish[];
  onApprove: (wishId: string) => void;
  onReject: (wishId: string, reason: string) => void;
}

export function ModerationPanel({
  onBack,
  wishes,
  onApprove,
  onReject,
}: ModerationPanelProps) {
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const moderationWishes = wishes.filter((wish) => wish.status === 'moderation');

  const handleReject = () => {
    if (selectedWish && rejectionReason.trim()) {
      onReject(selectedWish.id, rejectionReason);
      setShowRejectModal(false);
      setSelectedWish(null);
      setRejectionReason('');
    }
  };

  const getStatusBadge = (status: WishStatus) => {
    switch (status) {
      case 'moderation':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            На модерации
          </div>
        );
      case 'published':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Опубликовано
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            Отклонено
          </div>
        );
      default:
        return null;
    }
  };

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
            Панель модерации
          </h2>
          <div className="w-20"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
            <p className="text-3xl font-bold text-yellow-700 mb-1">
              {moderationWishes.length}
            </p>
            <p className="text-sm text-yellow-600">На модерации</p>
          </div>
          
          <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
            <p className="text-3xl font-bold text-green-700 mb-1">
              {wishes.filter((w) => w.status === 'published').length}
            </p>
            <p className="text-sm text-green-600">Опубликовано</p>
          </div>
          
          <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
            <p className="text-3xl font-bold text-red-700 mb-1">
              {wishes.filter((w) => w.status === 'rejected').length}
            </p>
            <p className="text-sm text-red-600">Отклонено</p>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <p className="text-3xl font-bold text-blue-700 mb-1">
              {wishes.length}
            </p>
            <p className="text-sm text-blue-600">Всего</p>
          </div>
        </div>

        {/* Content */}
        {moderationWishes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              Нет желаний на модерации
            </p>
            <p className="text-gray-400">
              Новые желания появятся здесь автоматически
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {moderationWishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  {/* Video preview */}
                  <div className="space-y-3">
                    <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={wish.videoUrl}
                        alt={wish.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-700 ml-1" />
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(wish.status)}
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {wish.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{wish.description}</p>
                      
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Автор:</span>
                          <span className="font-semibold text-gray-700">
                            {wish.userName}
                          </span>
                        </div>
                        
                        {wish.ageCategory && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Возраст:</span>
                            <span className="font-semibold text-gray-700">
                              {wish.ageCategory}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Создано:</span>
                          <span className="font-semibold text-gray-700">
                            {new Date(wish.createdAt).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact info */}
                    <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                      <p className="text-sm font-semibold text-gray-700">
                        Контактная информация:
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        {wish.contactPhone && (
                          <p>Телефон: {wish.contactPhone}</p>
                        )}
                        {wish.contactTelegram && (
                          <p>Telegram: {wish.contactTelegram}</p>
                        )}
                        {wish.contactEmail && (
                          <p>Email: {wish.contactEmail}</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {wish.status === 'moderation' && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => onApprove(wish.id)}
                          className="flex-1 bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Одобрить
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWish(wish);
                            setShowRejectModal(true);
                          }}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-5 h-5" />
                          Отклонить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedWish && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Отклонить желание
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Пожалуйста, укажите причину отклонения. Это поможет автору понять, что нужно исправить.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Например: видео не соответствует правилам платформы..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-300 transition-all resize-none mb-6"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedWish(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-2xl transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
