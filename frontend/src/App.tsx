import React, { useState, useEffect } from 'react';
import { 
  Activity, BarChart3, Users, Video, TrendingUp, Settings, 
  Menu, X, Bell, Plus, Upload, Play, Eye, LogOut, Shield,
  Instagram, Youtube, MessageCircle, Calendar, Target,
  ChevronRight, Zap, Clock, DollarSign
} from 'lucide-react';

// МОБИЛЬНЫЕ КОМПОНЕНТЫ

// Полноэкранный мобильный layout
const MobileOptimizedLayout = ({ 
  currentPage, 
  setCurrentPage, 
  globalAutomation, 
  setGlobalAutomation,
  showAddAccountModal,
  setShowAddAccountModal,
  accounts,
  stats,
  currentUser,
  handleLogout 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* МОБИЛЬНЫЙ HEADER - всегда видимый */}
      <header className="lg:hidden sticky top-0 z-30 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Гамбургер меню */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-700 text-white active:scale-95 transition-transform"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Центральный логотип */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">SocialBot</span>
          </div>

          {/* Уведомления + профиль */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 active:scale-95 transition-transform">
              <Bell className="w-5 h-5" />
            </button>
            <UserMenuMobile currentUser={currentUser} handleLogout={handleLogout} />
          </div>
        </div>
      </header>

      {/* МОБИЛЬНОЕ БОКОВОЕ МЕНЮ - полноэкранный overlay */}
      {sidebarOpen && (
        <>
          {/* Затемнение */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Меню */}
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-slate-800 lg:hidden transform transition-transform duration-300">
            <MobileSidebar 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              globalAutomation={globalAutomation}
              onClose={() => setSidebarOpen(false)} 
            />
          </div>
        </>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="pb-safe">
        <MobileMainContent 
          currentPage={currentPage}
          stats={stats}
          accounts={accounts}
          globalAutomation={globalAutomation}
          setGlobalAutomation={setGlobalAutomation}
          setShowAddAccountModal={setShowAddAccountModal}
        />
      </main>

      {/* НИЖНЯЯ НАВИГАЦИЯ для мобильных */}
      <BottomNavigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* МОДАЛЬНЫЕ ОКНА */}
      {showAddAccountModal && (
        <ResponsiveModal onClose={() => setShowAddAccountModal(false)}>
          <AddAccountModal onClose={() => setShowAddAccountModal(false)} />
        </ResponsiveModal>
      )}
    </div>
  );
};

// Полноэкранное боковое меню
const MobileSidebar = ({ currentPage, setCurrentPage, globalAutomation, onClose }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Центр управления', count: null },
    { id: 'accounts', icon: Users, label: 'Аккаунты', count: 4 },
    { id: 'content', icon: Video, label: 'Контент', count: 3 },
    { id: 'analytics', icon: TrendingUp, label: 'Аналитика', badge: 'Pro' },
    { id: 'settings', icon: Settings, label: 'Настройки', count: null }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-800">
      {/* Шапка меню */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700 pt-safe">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SocialBot</h1>
            <p className="text-sm text-slate-400">Автоматизация</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 active:scale-95 transition-transform"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Навигация */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentPage(item.id);
              onClose();
            }}
            className={`
              w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all active:scale-95
              ${currentPage === item.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }
            `}
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            <span className="font-medium text-lg">{item.label}</span>
            
            {item.count && (
              <span className="ml-auto bg-slate-600 text-sm px-3 py-1 rounded-full">
                {item.count}
              </span>
            )}
            
            {item.badge && (
              <span className="ml-auto bg-purple-600 text-sm px-3 py-1 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Статус автопостинга */}
      <div className="p-4 border-t border-slate-700 pb-safe">
        <div className="bg-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold text-lg">Автопостинг</span>
            <div className={`w-14 h-8 rounded-full relative transition-colors ${globalAutomation ? 'bg-green-600' : 'bg-slate-600'}`}>
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 shadow-md transition-transform ${globalAutomation ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            {globalAutomation ? 'Активно • 5 в очереди' : 'Остановлено'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Основной контент для мобильных
const MobileMainContent = ({ 
  currentPage, 
  stats, 
  accounts, 
  globalAutomation, 
  setGlobalAutomation, 
  setShowAddAccountModal 
}) => {
  switch (currentPage) {
    case 'dashboard':
      return (
        <div className="space-y-6">
          <MobileStatsGrid stats={stats} />
          <MobileQuickActions 
            globalAutomation={globalAutomation}
            setGlobalAutomation={setGlobalAutomation}
            setShowAddAccountModal={setShowAddAccountModal}
          />
          <MobileRecentActivity />
        </div>
      );
    case 'accounts':
      return <MobileAccountsList accounts={accounts} setShowAddAccountModal={setShowAddAccountModal} />;
    case 'content':
      return <MobileContentManager />;
    case 'analytics':
      return <MobileAnalytics />;
    case 'settings':
      return <MobileSettings />;
    default:
      return <MobileStatsGrid stats={stats} />;
  }
};

// Большие карточки статистики для мобильных
const MobileStatsGrid = ({ stats }) => {
  const statsCards = [
    {
      title: 'Всего аккаунтов',
      value: stats.totalAccounts,
      change: '+12%',
      icon: Users,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Активно сейчас',
      value: stats.activeAccounts,
      change: '+5%',
      icon: Activity,
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'Постов сегодня',
      value: stats.todayPosts,
      change: '+23%',
      icon: Video,
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'Общий охват',
      value: stats.totalReach?.toLocaleString() || '0',
      change: '+8%',
      icon: Eye,
      color: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* На мобильном: 2x2 сетка с большими карточками */}
      <div className="grid grid-cols-2 gap-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-5 border border-slate-700 min-h-[120px] flex flex-col justify-between active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-400 font-semibold">
                {card.change}
              </span>
            </div>
            
            <div>
              <p className="text-3xl font-bold text-white mb-1">
                {card.value}
              </p>
              <p className="text-sm text-slate-400 leading-tight">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Touch-friendly кнопки действий
const MobileQuickActions = ({ globalAutomation, setGlobalAutomation, setShowAddAccountModal }) => {
  return (
    <div className="p-4 space-y-4">
      {/* Главная кнопка автопостинга */}
      <button
        onClick={() => setGlobalAutomation(!globalAutomation)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-6 rounded-2xl transition-all shadow-lg active:scale-95"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Play className="w-8 h-8" />
          </div>
          <div className="text-left">
            <div className="font-bold text-xl mb-1">
              {globalAutomation ? 'Остановить автопостинг' : 'Запустить автопостинг'}
            </div>
            <div className="text-lg opacity-90">
              {globalAutomation ? 'Приостановить все аккаунты' : 'Активировать все аккаунты'}
            </div>
          </div>
        </div>
      </button>

      {/* Второстепенные кнопки */}
      <div className="space-y-3">
        <button
          onClick={() => setShowAddAccountModal(true)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5 rounded-xl transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Добавить аккаунт</div>
              <div className="text-sm opacity-80">Новый социальный профиль</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => alert('Загрузка контента')}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white p-5 rounded-xl transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Загрузить контент</div>
              <div className="text-sm opacity-80">Видео и изображения</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

// Нижняя навигация как в нативных приложениях
const BottomNavigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Главная' },
    { id: 'accounts', icon: Users, label: 'Аккаунты' },
    { id: 'content', icon: Video, label: 'Контент' },
    { id: 'analytics', icon: TrendingUp, label: 'Аналитика' },
    { id: 'settings', icon: Settings, label: 'Еще' }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 pb-safe">
      <div className="flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`
              flex-1 flex flex-col items-center py-3 px-2 transition-colors active:scale-95
              ${currentPage === item.id 
                ? 'text-blue-400' 
                : 'text-slate-400 hover:text-slate-300'
              }
            `}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
            {currentPage === item.id && (
              <div className="w-4 h-1 bg-blue-400 rounded-full mt-1" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

// Компактное меню пользователя для мобильных
const UserMenuMobile = ({ currentUser, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold active:scale-95 transition-transform"
      >
        A
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-600 rounded-2xl shadow-xl z-50">
            <div className="p-4 border-b border-slate-600">
              <p className="text-white font-semibold text-lg">Администратор</p>
              <p className="text-slate-400">admin@socialbot.com</p>
            </div>
            
            <div className="p-2">
              <button className="w-full flex items-center gap-4 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors active:scale-95">
                <Settings className="w-5 h-5" />
                <span className="text-lg">Настройки</span>
              </button>
              
              <button className="w-full flex items-center gap-4 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors active:scale-95">
                <Shield className="w-5 h-5" />
                <span className="text-lg">Безопасность</span>
              </button>
              
              <hr className="my-2 border-slate-600" />
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-colors active:scale-95"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg">Выйти</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Мобильные дополнительные компоненты
const MobileRecentActivity = () => (
  <div className="p-4">
    <h3 className="text-xl font-bold text-white mb-4">Последняя активность</h3>
    <div className="space-y-3">
      {[
        { platform: 'Instagram', action: 'Опубликован пост', time: '2 мин назад', icon: Instagram },
        { platform: 'YouTube', action: 'Загружено видео', time: '15 мин назад', icon: Youtube },
        { platform: 'TikTok', action: 'Новый комментарий', time: '1 час назад', icon: MessageCircle }
      ].map((activity, i) => (
        <div key={i} className="bg-slate-800 rounded-xl p-4 flex items-center gap-4">
          <activity.icon className="w-8 h-8 text-blue-400" />
          <div className="flex-1">
            <p className="text-white font-medium">{activity.platform}</p>
            <p className="text-slate-400 text-sm">{activity.action}</p>
          </div>
          <span className="text-slate-500 text-xs">{activity.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const MobileAccountsList = ({ accounts, setShowAddAccountModal }) => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">Аккаунты</h2>
      <button
        onClick={() => setShowAddAccountModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl active:scale-95 transition-transform"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {accounts.map((account) => (
        <div key={account.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${account.platform === 'instagram' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : account.platform === 'youtube' ? 'bg-red-600' : 'bg-slate-600'} rounded-xl flex items-center justify-center`}>
              {account.platform === 'instagram' && <Instagram className="w-8 h-8 text-white" />}
              {account.platform === 'youtube' && <Youtube className="w-8 h-8 text-white" />}
              {account.platform === 'tiktok' && <MessageCircle className="w-8 h-8 text-white" />}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{account.username}</h3>
              <p className="text-slate-400 capitalize">{account.platform}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${account.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm text-slate-400 capitalize">{account.status}</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MobileContentManager = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold text-white mb-6">Контент</h2>
    <div className="text-center py-20">
      <Video className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <p className="text-slate-400 text-lg">Менеджер контента в разработке</p>
    </div>
  </div>
);

const MobileAnalytics = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold text-white mb-6">Аналитика</h2>
    <div className="text-center py-20">
      <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <p className="text-slate-400 text-lg">Аналитика в разработке</p>
    </div>
  </div>
);

const MobileSettings = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold text-white mb-6">Настройки</h2>
    <div className="text-center py-20">
      <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <p className="text-slate-400 text-lg">Настройки в разработке</p>
    </div>
  </div>
);

// Responsive модальное окно
const ResponsiveModal = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md mx-4 lg:mx-0 bg-slate-800 rounded-t-2xl lg:rounded-2xl border border-slate-600 animate-slide-up lg:animate-fade-in">
        {children}
      </div>
    </div>
  );
};

// Форма добавления аккаунта
const AddAccountModal = ({ onClose }) => {
  const [platform, setPlatform] = useState('instagram');
  const [username, setUsername] = useState('');
  const [postFrequency, setPostFrequency] = useState(3);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-purple-600 to-pink-600' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-600 to-red-700' },
    { id: 'tiktok', name: 'TikTok', icon: MessageCircle, color: 'from-gray-800 to-black' }
  ];

  return (
    <div className="p-6 pb-safe">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Добавить аккаунт</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 active:scale-95 transition-transform"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Выбор платформы */}
        <div>
          <label className="block text-white font-medium mb-3 text-lg">Платформа</label>
          <div className="grid grid-cols-3 gap-3">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`
                  p-4 rounded-xl border-2 transition-all active:scale-95
                  ${platform === p.id 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : 'border-slate-600 bg-slate-700/50'
                  }
                `}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${p.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-sm font-medium">{p.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Имя пользователя */}
        <div>
          <label className="block text-white font-medium mb-3 text-lg">Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            className="w-full p-4 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 text-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Частота постов */}
        <div>
          <label className="block text-white font-medium mb-3 text-lg">
            Постов в день: {postFrequency}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={postFrequency}
            onChange={(e) => setPostFrequency(parseInt(e.target.value))}
            className="w-full mobile-slider"
          />
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 p-4 bg-slate-700 text-white rounded-xl font-medium text-lg active:scale-95 transition-transform"
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className="flex-1 p-4 bg-blue-600 text-white rounded-xl font-medium text-lg active:scale-95 transition-transform"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

// DESKTOP КОМПОНЕНТЫ (упрощенные для экономии места)
const DesktopLayout = ({ 
  currentPage, 
  setCurrentPage, 
  globalAutomation, 
  setGlobalAutomation,
  showAddAccountModal,
  setShowAddAccountModal,
  accounts,
  stats,
  currentUser,
  handleLogout 
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Desktop Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SocialBot</h1>
              <p className="text-sm text-slate-400">Автоматизация</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Панель управления' },
              { id: 'accounts', icon: Users, label: 'Аккаунты' },
              { id: 'content', icon: Video, label: 'Контент' },
              { id: 'analytics', icon: TrendingUp, label: 'Аналитика' },
              { id: 'settings', icon: Settings, label: 'Настройки' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentPage === item.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Панель управления</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold"
              >
                A
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Desktop content here - simplified for space */}
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">Desktop версия (упрощена для экономии места)</p>
          </div>
        </main>
      </div>

      {/* Desktop Modals */}
      {showAddAccountModal && (
        <ResponsiveModal onClose={() => setShowAddAccountModal(false)}>
          <AddAccountModal onClose={() => setShowAddAccountModal(false)} />
        </ResponsiveModal>
      )}
    </div>
  );
};

// ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
const SocialBotPlatform = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [globalAutomation, setGlobalAutomation] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({ email: 'admin@socialbot.com' });

  // Определяем мобильное устройство
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Данные
  const stats = {
    totalAccounts: 4,
    activeAccounts: 2,
    todayPosts: 12,
    totalReach: 15420
  };

  const accounts = [
    { id: 1, platform: 'instagram', username: '@fashion_brand', status: 'active' },
    { id: 2, platform: 'youtube', username: 'TechReview Channel', status: 'active' },
    { id: 3, platform: 'tiktok', username: '@viral_content', status: 'paused' },
    { id: 4, platform: 'instagram', username: '@lifestyle_blog', status: 'active' }
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Если пользователь не авторизован
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Вход в SocialBot</h1>
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-medium text-lg"
          >
            Демо вход
          </button>
        </div>
      </div>
    );
  }

  // Мобильная версия
  if (isMobile) {
    return (
      <MobileOptimizedLayout 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        globalAutomation={globalAutomation}
        setGlobalAutomation={setGlobalAutomation}
        showAddAccountModal={showAddAccountModal}
        setShowAddAccountModal={setShowAddAccountModal}
        accounts={accounts}
        stats={stats}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
    );
  }

  // Desktop версия
  return (
    <DesktopLayout 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      globalAutomation={globalAutomation}
      setGlobalAutomation={setGlobalAutomation}
      showAddAccountModal={showAddAccountModal}
      setShowAddAccountModal={setShowAddAccountModal}
      accounts={accounts}
      stats={stats}
      currentUser={currentUser}
      handleLogout={handleLogout}
    />
  );
};

export default SocialBotPlatform; 