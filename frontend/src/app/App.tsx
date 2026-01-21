import { useState } from 'react';
import { MainScreen } from './components/MainScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { WishCreationScreen } from './components/WishCreationScreen';
import { ModerationStatusScreen } from './components/ModerationStatusScreen';
import { WishFeedScreen } from './components/WishFeedScreen';
import { WishDetailsScreen } from './components/WishDetailsScreen';
import { PerformerDashboard } from './components/PerformerDashboard';
import { ProfileScreen } from './components/ProfileScreen';
import { ModerationPanel } from './components/ModerationPanel';
import { TrustAndSafety } from './components/TrustAndSafety';
import { FulfilledGallery } from './components/FulfilledGallery';
import { User, Wish, UserRole, WishStatus } from './types';
import { mockWishes, mockUsers } from './data/mockData';

type Screen =
  | 'main'
  | 'login'
  | 'register'
  | 'zagadat'
  | 'ispolnit'
  | 'wish-details'
  | 'moderation-status'
  | 'performer-dashboard'
  | 'profile'
  | 'moderation-panel'
  | 'trust-and-safety'
  | 'fulfilled-gallery';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wishes, setWishes] = useState<Wish[]>(mockWishes);
  const [selectedWishId, setSelectedWishId] = useState<string | null>(null);
  const [moderationStatus, setModerationStatus] = useState<WishStatus>('moderation');
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const isLoggedIn = currentUser !== null;

  // Navigation handlers
  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // Auth handlers
  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app would verify credentials
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentScreen('main');
    } else {
      alert('Пользователь не найден');
    }
  };

  const handleRegister = (
    name: string,
    email: string,
    phone: string,
    password: string,
    role: UserRole
  ) => {
    // Mock registration - in real app would create user
    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      role,
      wishesCreated: 0,
      wishesFulfilled: 0,
    };
    setCurrentUser(newUser);
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('main');
  };

  // Wish handlers
  const handleWishSubmit = (wishData: {
    title: string;
    description: string;
    ageCategory: string;
    contactPhone: string;
    contactTelegram: string;
    contactEmail: string;
  }) => {
    if (!currentUser) return;

    const newWish: Wish = {
      id: String(Date.now()),
      userId: currentUser.id,
      userName: currentUser.name,
      videoUrl: 'https://images.unsplash.com/photo-1714949308848-d117347154d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwY2hpbGQlMjBoYXBweXxlbnwxfHx8fDE3NjgyMjgxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: wishData.title,
      description: wishData.description,
      ageCategory: wishData.ageCategory,
      status: 'moderation',
      contactPhone: wishData.contactPhone,
      contactTelegram: wishData.contactTelegram,
      contactEmail: wishData.contactEmail,
      createdAt: new Date(),
    };

    setWishes([newWish, ...wishes]);
    setModerationStatus('moderation');
    setCurrentScreen('moderation-status');
  };

  const handleWishClick = (wishId: string) => {
    setSelectedWishId(wishId);
    setCurrentScreen('wish-details');
  };

  const handleCommitToWish = (wishId: string) => {
    // In real app, would update backend
    console.log('Committed to wish:', wishId);
  };

  // Moderation handlers
  const handleApprove = (wishId: string) => {
    setWishes(
      wishes.map((wish) =>
        wish.id === wishId ? { ...wish, status: 'published' as WishStatus } : wish
      )
    );
  };

  const handleReject = (wishId: string, reason: string) => {
    setWishes(
      wishes.map((wish) =>
        wish.id === wishId
          ? { ...wish, status: 'rejected' as WishStatus, rejectionReason: reason }
          : wish
      )
    );
  };

  // Get selected wish
  const selectedWish = wishes.find((w) => w.id === selectedWishId);

  // Get performer's wishes
  const performerActiveWishes = wishes.filter(
    (w) => w.status === 'published' && w.fulfilledBy === currentUser?.id
  );
  const performerFulfilledWishes = wishes.filter(
    (w) => w.status === 'fulfilled' && w.fulfilledBy === currentUser?.id
  );

  return (
    <div className="size-full">
      {currentScreen === 'main' && (
        <MainScreen
          onNavigate={(screen) => {
            if (screen === 'login') {
              setCurrentScreen('login');
            } else if (screen === 'zagadat' || screen === 'ispolnit') {
              if (!isLoggedIn) {
                setCurrentScreen('login');
              } else {
                setCurrentScreen(screen);
              }
            } else if (screen === 'fulfilled-gallery' || screen === 'trust-and-safety') {
              setCurrentScreen(screen);
            }
          }}
          isLoggedIn={isLoggedIn}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen
          onBack={() => setCurrentScreen('main')}
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onBack={() => setCurrentScreen('main')}
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'zagadat' && (
        <WishCreationScreen
          onBack={() => setCurrentScreen('main')}
          onSubmit={handleWishSubmit}
        />
      )}

      {currentScreen === 'moderation-status' && (
        <ModerationStatusScreen
          onBack={() => setCurrentScreen('main')}
          status={moderationStatus}
          rejectionReason={rejectionReason}
        />
      )}

      {currentScreen === 'ispolnit' && (
        <WishFeedScreen
          onBack={() => setCurrentScreen('main')}
          onWishClick={handleWishClick}
          wishes={wishes}
        />
      )}

      {currentScreen === 'wish-details' && selectedWish && (
        <WishDetailsScreen
          onBack={() => setCurrentScreen('ispolnit')}
          wish={selectedWish}
          onCommit={handleCommitToWish}
        />
      )}

      {currentScreen === 'performer-dashboard' && (
        <PerformerDashboard
          onBack={() => setCurrentScreen('main')}
          onWishClick={handleWishClick}
          activeWishes={performerActiveWishes}
          fulfilledWishes={performerFulfilledWishes}
        />
      )}

      {currentScreen === 'profile' && currentUser && (
        <ProfileScreen
          onBack={() => setCurrentScreen('main')}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'moderation-panel' && (
        <ModerationPanel
          onBack={() => setCurrentScreen('main')}
          wishes={wishes}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {currentScreen === 'trust-and-safety' && (
        <TrustAndSafety
          onBack={() => setCurrentScreen('main')}
        />
      )}

      {currentScreen === 'fulfilled-gallery' && (
        <FulfilledGallery
          onBack={() => setCurrentScreen('main')}
          fulfilledWishes={wishes.filter((w) => w.status === 'fulfilled')}
        />
      )}

      {/* Floating navigation */}
      {isLoggedIn && currentScreen !== 'login' && currentScreen !== 'register' && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <button
            onClick={() => setCurrentScreen('profile')}
            className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-white font-bold text-xl"
          >
            {currentUser?.name.charAt(0)}
          </button>

          {currentUser?.role === 'исполнитель' && (
            <button
              onClick={() => setCurrentScreen('performer-dashboard')}
              className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}

          {currentUser?.role === 'модератор' && (
            <button
              onClick={() => setCurrentScreen('moderation-panel')}
              className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}