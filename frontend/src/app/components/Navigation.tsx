import { User, UserRole } from '../types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  user: User | null;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function Navigation({ user, currentScreen, onNavigate, onLogout }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center md:hidden"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 pt-20">
            <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="py-6 space-y-2">
              <button
                onClick={() => {
                  onNavigate('main');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-100 transition-colors text-gray-700"
              >
                Главная
              </button>

              <button
                onClick={() => {
                  onNavigate('profile');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-100 transition-colors text-gray-700"
              >
                Профиль
              </button>

              {user.role === 'исполнитель' && (
                <button
                  onClick={() => {
                    onNavigate('performer-dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-100 transition-colors text-gray-700"
                >
                  Мои дела
                </button>
              )}

              {user.role === 'модератор' && (
                <button
                  onClick={() => {
                    onNavigate('moderation-panel');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-100 transition-colors text-gray-700"
                >
                  Модерация
                </button>
              )}
            </nav>

            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="w-full mt-auto bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-2xl transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </>
  );
}
