import { StarBackground } from './StarBackground';
import { Upload, Video, Phone, Mail, Send, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface WishCreationScreenProps {
  onBack: () => void;
  onSubmit: (wish: {
    title: string;
    description: string;
    ageCategory: string;
    contactPhone: string;
    contactTelegram: string;
    contactEmail: string;
  }) => void;
}

export function WishCreationScreen({ onBack, onSubmit }: WishCreationScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ageCategory, setAgeCategory] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTelegram, setContactTelegram] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      ageCategory,
      contactPhone,
      contactTelegram,
      contactEmail,
    });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col px-4 py-8">
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
            Загадать желание
          </h2>
          <div className="w-20"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video section */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800">
                Запиши или загрузи видео
              </h3>
            </div>

            <div className="bg-gray-50 rounded-2xl aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
              {!hasVideo ? (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-2">Нажмите, чтобы загрузить видео</p>
                  <p className="text-sm text-gray-400">или запишите видео-сообщение (до 2 минут)</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecording(!isRecording);
                      setHasVideo(true);
                    }}
                    className="mt-4 bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-colors"
                  >
                    {isRecording ? 'Остановить запись' : 'Начать запись'}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <Video className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">Видео загружено</p>
                  <button
                    type="button"
                    onClick={() => setHasVideo(false)}
                    className="mt-3 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Изменить
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              💡 Расскажите о своей мечте искренне — это поможет людям понять и откликнуться
            </p>
          </div>

          {/* Wish details */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">О желании</h3>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Название желания *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Мечтаю о велосипеде"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Расскажите подробнее *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опишите свою мечту, почему это важно для вас..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all resize-none"
                required
              />
            </div>

            {/* Age category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Возрастная категория
              </label>
              <select
                value={ageCategory}
                onChange={(e) => setAgeCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              >
                <option value="">Выберите категорию</option>
                <option value="0-6 лет">0-6 лет</option>
                <option value="7-12 лет">7-12 лет</option>
                <option value="13-17 лет">13-17 лет</option>
                <option value="18-30 лет">18-30 лет</option>
                <option value="30-60 лет">30-60 лет</option>
                <option value="60+">60+</option>
              </select>
            </div>
          </div>

          {/* Contact details */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-5">
            <div className="flex items-start gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Контактные данные</h3>
                <p className="text-sm text-gray-500 mt-1">
                  🔒 Контакты видны только авторизованным исполнителям
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Телефон</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+7 (XXX) XXX-XX-XX"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                />
              </div>
            </div>

            {/* Telegram */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Telegram</label>
              <input
                type="text"
                value={contactTelegram}
                onChange={(e) => setContactTelegram(e.target.value)}
                placeholder="@username"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold text-lg py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Отправить на модерацию
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              💙 Модерация обычно занимает до 24 часов. Мы проверяем все желания, чтобы платформа оставалась безопасной.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
