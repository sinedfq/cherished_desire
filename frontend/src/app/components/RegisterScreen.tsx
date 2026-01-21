import { useState } from 'react';
import { StarBackground } from './StarBackground';
import { Mail, Lock, User as UserIcon, ArrowLeft, Phone } from 'lucide-react';
import { UserRole } from '../types';

interface RegisterScreenProps {
  onBack: () => void;
  onRegister: (name: string, email: string, phone: string, password: string, role: UserRole) => void;
  onSwitchToLogin: () => void;
}

export function RegisterScreen({ onBack, onRegister, onSwitchToLogin }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('загадывающий');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    onRegister(name, email, phone, password, role);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center px-4 py-8">
      <StarBackground />

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">ДРИМИ</h1>
          <p className="text-gray-500 text-lg">Создайте аккаунт</p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Имя</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Телефон</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (XXX) XXX-XX-XX"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
            </div>
          </div>

          {/* Role selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Я хочу</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('загадывающий')}
                className={`py-3 px-4 rounded-2xl border-2 transition-all ${
                  role === 'загадывающий'
                    ? 'border-blue-400 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Загадать
              </button>
              <button
                type="button"
                onClick={() => setRole('исполнитель')}
                className={`py-3 px-4 rounded-2xl border-2 transition-all ${
                  role === 'исполнитель'
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Исполнить
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Подтвердите пароль</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] mt-6"
          >
            Зарегистрироваться
          </button>

          {/* Login link */}
          <div className="text-center pt-2">
            <p className="text-gray-600">
              Уже есть аккаунт?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                Войти
              </button>
            </p>
          </div>
        </form>

        {/* Trust message */}
        <div className="mt-6 text-center text-sm text-gray-500 px-4 space-y-2">
          <p>🔒 Регистрация нужна для безопасности и защиты участников</p>
          <p>💙 Мы не передаём ваши данные третьим лицам</p>
        </div>
      </div>
    </div>
  );
}
