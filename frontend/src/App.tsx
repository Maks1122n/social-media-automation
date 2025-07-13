import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Activity, Users, Video, Zap, TrendingUp, Settings, Bell, Menu, X,
  Play, Pause, Plus, Upload, Filter, Search, Eye, Edit, Trash2, Download,
  Globe, Shield, Brain, Cpu, Database, Monitor, Smartphone, RefreshCw,
  ChevronDown, ChevronRight, MoreHorizontal, Star, Heart, Share, Calendar,
  Clock, AlertCircle, CheckCircle, XCircle, Loader, ArrowUp, ArrowDown,
  Instagram, Youtube, Hash, MessageSquare, Image, Music, Palette,
  Target, BarChart3, Timer, Shuffle, Camera, Folder, Link, MousePointer
} from 'lucide-react';

// 🎨 СОВРЕМЕННАЯ ДИЗАЙН СИСТЕМА
const theme = {
  colors: {
    // Dark theme base
    bg: {
      primary: '#0f172a',
      secondary: '#1e293b', 
      tertiary: '#334155',
      card: 'rgba(30, 41, 59, 0.8)'
    },
    // Neon accents
    accent: {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      green: '#10b981',
      orange: '#f59e0b',
      red: '#ef4444'
    },
    // Glass effects
    glass: {
      bg: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)'
    },
    // Text
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#64748b'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  }
};

// 🧩 БАЗОВЫЕ UI КОМПОНЕНТЫ
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  children, 
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 hover:border-slate-500',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg',
    ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white',
    outline: 'border-2 border-slate-600 hover:border-blue-500 text-slate-300 hover:text-blue-400 hover:bg-slate-800'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = false, glass = false, ...props }) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  const glassClasses = glass 
    ? 'bg-white/10 backdrop-blur-lg border-white/20 shadow-xl' 
    : 'bg-slate-800 border-slate-700 shadow-lg';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/50' : '';
  
  return (
    <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    danger: 'bg-red-600 text-white',
    blue: 'bg-blue-600 text-white',
    purple: 'bg-purple-600 text-white'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const StatusIndicator = ({ status, label }) => {
  const statusConfig = {
    online: { color: 'bg-green-500', animation: 'animate-pulse' },
    offline: { color: 'bg-red-500', animation: '' },
    syncing: { color: 'bg-yellow-500', animation: 'animate-bounce' },
    idle: { color: 'bg-slate-500', animation: '' }
  };
  
  const config = statusConfig[status] || statusConfig.offline;
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} ${config.animation}`} />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
};

// 📊 MOCK DATA (расширенные данные)
const mockData = {
  stats: {
    totalAccounts: 48,
    activeAccounts: 36,
    todayPosts: 127,
    totalReach: 2847650,
    totalEngagement: 8.4,
    dailyGrowth: 2.3,
    revenue: 15420
  },
  
  accounts: [
    {
      id: 1,
      username: 'travel_explorer_pro',
      platform: 'instagram',
      status: 'active',
      avatar: '🏝️',
      followers: '47.2K',
      engagement: '8.4%',
      postsToday: 5,
      maxPosts: 8,
      lastPost: '12 мин назад',
      proxy: 'USA-Mobile-NY',
      dailyGrowth: '+247',
      browserStatus: 'running'
    },
    {
      id: 2,
      username: 'food_adventures_daily',
      platform: 'youtube',
      status: 'active',
      avatar: '🍜',
      followers: '23.8K',
      engagement: '6.7%',
      postsToday: 2,
      maxPosts: 4,
      lastPost: '1 час назад',
      proxy: 'UK-Mobile-LON',
      dailyGrowth: '+156',
      browserStatus: 'stopped'
    },
    {
      id: 3,
      username: 'lifestyle_vibes_24',
      platform: 'instagram',
      status: 'paused',
      avatar: '✨',
      followers: '18.5K',
      engagement: '9.1%',
      postsToday: 0,
      maxPosts: 6,
      lastPost: '3 часа назад',
      proxy: 'DE-Mobile-BER',
      dailyGrowth: '+89',
      browserStatus: 'stopped'
    },
    {
      id: 4,
      username: 'tech_innovations_hub',
      platform: 'youtube',
      status: 'active',
      avatar: '💻',
      followers: '34.1K',
      engagement: '7.2%',
      postsToday: 3,
      maxPosts: 5,
      lastPost: '45 мин назад',
      proxy: 'CA-Mobile-TOR',
      dailyGrowth: '+203',
      browserStatus: 'running'
    }
  ],
  
  videos: [
    {
      id: 1,
      filename: 'tropical_sunset_paradise.mp4',
      title: 'Невероятный закат на Мальдивах',
      duration: '0:24',
      size: '4.2 MB',
      status: 'ready',
      uploadDate: '2 часа назад',
      category: 'travel',
      hashtags: ['#мальдивы', '#закат', '#путешествия'],
      aiGenerated: true,
      performance: { views: 15420, likes: 1240, comments: 89 }
    },
    {
      id: 2,
      filename: 'cooking_ramen_masterclass.mp4',
      title: 'Секреты идеального рамена',
      duration: '0:38',
      size: '6.8 MB',
      status: 'scheduled',
      uploadDate: '5 часов назад',
      category: 'food',
      hashtags: ['#рамен', '#кулинария', '#рецепт'],
      aiGenerated: true,
      scheduledFor: '18:00'
    },
    {
      id: 3,
      filename: 'morning_routine_optimization.mp4',
      title: 'Утренняя рутина для продуктивности',
      duration: '0:31',
      size: '5.1 MB',
      status: 'posted',
      uploadDate: '1 день назад',
      category: 'lifestyle',
      hashtags: ['#утро', '#продуктивность', '#мотивация'],
      aiGenerated: false,
      performance: { views: 8340, likes: 670, comments: 45 }
    }
  ],
  
  automationRules: [
    {
      id: 1,
      name: 'Утренний постинг Travel',
      enabled: true,
      accounts: 8,
      schedule: '09:00 - 11:00',
      postsPerDay: 3,
      lastRun: '09:30',
      successRate: 94,
      status: 'running'
    },
    {
      id: 2,
      name: 'Вечерний контент Food',
      enabled: true,
      accounts: 5,
      schedule: '18:00 - 20:00',
      postsPerDay: 2,
      lastRun: '19:15',
      successRate: 97,
      status: 'running'
    },
    {
      id: 3,
      name: 'Выходные Lifestyle',
      enabled: false,
      accounts: 12,
      schedule: 'Сб-Вс 12:00-15:00',
      postsPerDay: 4,
      lastRun: 'Вчера',
      successRate: 91,
      status: 'paused'
    }
  ],
  
  chartData: [
    { name: 'Пн', posts: 45, reach: 18500, engagement: 890, growth: 156 },
    { name: 'Вт', posts: 52, reach: 22100, engagement: 1240, growth: 203 },
    { name: 'Ср', posts: 38, reach: 16800, engagement: 720, growth: 134 },
    { name: 'Чт', posts: 61, reach: 26400, engagement: 1450, growth: 287 },
    { name: 'Пт', posts: 55, reach: 24200, engagement: 1180, growth: 245 },
    { name: 'Сб', posts: 67, reach: 31500, engagement: 1680, growth: 324 },
    { name: 'Вс', posts: 43, reach: 19900, engagement: 950, growth: 178 }
  ],
  
  recentActivity: [
    { id: 1, type: 'post', account: 'travel_explorer_pro', action: 'Опубликован пост', time: '2 мин назад', status: 'success' },
    { id: 2, type: 'account', account: 'food_adventures_daily', action: 'Запущен браузер', time: '5 мин назад', status: 'success' },
    { id: 3, type: 'automation', account: 'lifestyle_vibes_24', action: 'Правило "Утренний постинг" выполнено', time: '12 мин назад', status: 'success' },
    { id: 4, type: 'error', account: 'tech_innovations_hub', action: 'Ошибка подключения прокси', time: '15 мин назад', status: 'error' }
  ]
};

// 🏠 ГЛАВНОЕ ПРИЛОЖЕНИЕ
const SocialBotPlatform = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalAutomation, setGlobalAutomation] = useState(true);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddProxyModal, setShowAddProxyModal] = useState(false);
  const [showPostingSettingsModal, setShowPostingSettingsModal] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    browserEngine: 'online',
    analyticsEngine: 'syncing',
    aiGenerator: 'online',
    automationQueue: 12
  });

  // Симуляция реального времени
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        automationQueue: Math.floor(Math.random() * 20) + 5
      }));
    }, 3000);
    
    // Закрытие модальных окон по клику вне их
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  // 🔹 МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ АККАУНТА
  const AddAccountModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" glass>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Добавить аккаунт</h2>
            <button 
              onClick={() => setShowAddAccountModal(false)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Платформа</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-pink-500 bg-pink-500/10 rounded-xl flex items-center gap-3 hover:bg-pink-500/20 transition-colors">
                  <Instagram className="w-6 h-6 text-pink-500" />
                  <span className="text-white font-medium">Instagram</span>
                </button>
                <button className="p-4 border-2 border-slate-600 hover:border-red-500 bg-slate-800 rounded-xl flex items-center gap-3 hover:bg-red-500/10 transition-colors">
                  <Youtube className="w-6 h-6 text-red-500" />
                  <span className="text-white font-medium">YouTube</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Имя пользователя</label>
              <input 
                type="text" 
                placeholder="username_example"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Пароль</label>
              <input 
                type="password" 
                placeholder="Введите пароль"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Прокси (опционально)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="IP:PORT:LOGIN:PASSWORD"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
                <Button variant="outline" onClick={() => setShowAddProxyModal(true)}>
                  Выбрать прокси
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Настройки постинга</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Постов в день</label>
                  <input 
                    type="number" 
                    defaultValue="3"
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Интервал (часы)</label>
                  <input 
                    type="number" 
                    defaultValue="4"
                    min="1"
                    max="24"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddAccountModal(false)}>
              Отмена
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => {
              alert('Создание аккаунта и браузерного профиля...');
              setShowAddAccountModal(false);
            }}>
              Добавить аккаунт
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // 🔹 МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ ПРОКСИ
  const AddProxyModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg" glass>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Управление прокси</h2>
            <button 
              onClick={() => setShowAddProxyModal(false)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Добавить прокси</label>
              <textarea 
                placeholder="IP:PORT:LOGIN:PASSWORD&#10;192.168.1.1:8080:user:pass&#10;..."
                rows="4"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-200">Доступные прокси</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {['USA-Mobile-NY (192.168.1.1)', 'UK-Mobile-LON (192.168.1.2)', 'DE-Mobile-BER (192.168.1.3)'].map((proxy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-white text-sm">{proxy}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Выбрать</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddProxyModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => {
              alert('Прокси добавлены!');
              setShowAddProxyModal(false);
            }}>
              Сохранить прокси
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // 🔹 МОДАЛЬНОЕ ОКНО НАСТРОЕК ПОСТИНГА
  const PostingSettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto" glass>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Настройки автопостинга</h2>
            <button 
              onClick={() => setShowPostingSettingsModal(false)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Основные настройки</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Постов в день на аккаунт</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      defaultValue="3"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>1</span>
                      <span className="font-medium text-blue-400">3</span>
                      <span>10</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Интервал между постами</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Минимум (часы)</label>
                        <input 
                          type="number" 
                          defaultValue="2"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Максимум (часы)</label>
                        <input 
                          type="number" 
                          defaultValue="6"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Активные часы</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['09:00', '12:00', '15:00', '18:00', '21:00'].map(time => (
                        <button key={time} className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Безопасность</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Имитация человека</p>
                      <p className="text-slate-400 text-sm">Случайные задержки и движения мыши</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Ротация прокси</p>
                      <p className="text-slate-400 text-sm">Автоматическая смена IP адресов</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Перерывы</p>
                      <p className="text-slate-400 text-sm">Имитация сна и отдыха</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Контент</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">AI описания</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Умные хештеги</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Случайный порядок</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <Button variant="outline" className="flex-1" onClick={() => setShowPostingSettingsModal(false)}>
              Отмена
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => {
              alert('Настройки автопостинга сохранены!');
              setShowPostingSettingsModal(false);
            }}>
              Сохранить настройки
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // 🔹 МЕНЮ ПОЛЬЗОВАТЕЛЯ
  const UserMenu = () => (
    <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 user-menu">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">А</span>
          </div>
          <div>
            <p className="text-white font-medium">Администратор</p>
            <p className="text-slate-400 text-sm">admin@socialbot.com</p>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          Настройки профиля
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Shield className="w-4 h-4" />
          Безопасность
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Database className="w-4 h-4" />
          Резервные копии
        </button>
        <div className="border-t border-slate-700 my-2"></div>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
          <X className="w-4 h-4" />
          Выйти
        </button>
      </div>
    </div>
  );

  const navigation = [
    { id: 'dashboard', name: 'Центр управления', icon: BarChart3, badge: null },
    { id: 'accounts', name: 'Аккаунты', icon: Users, badge: mockData.accounts.length },
    { id: 'content', name: 'Контент', icon: Video, badge: mockData.videos.length },
    { id: 'automation', name: 'Автопостинг', icon: Zap, badge: globalAutomation ? 'Активен' : 'Остановлен' },
    { id: 'analytics', name: 'Аналитика', icon: TrendingUp, badge: 'Pro' },
    { id: 'settings', name: 'Настройки', icon: Settings, badge: null }
  ];

  // 📊 КОМПОНЕНТ СТАТИСТИЧЕСКОЙ КАРТОЧКИ
  const StatCard = ({ title, value, icon: Icon, gradient, change, trend, onClick }) => (
    <Card 
      className="p-6 cursor-pointer group" 
      hover 
      glass 
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {change}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </Card>
  );

  // 👤 КОМПОНЕНТ КАРТОЧКИ АККАУНТА
  const AccountCard = ({ account }) => (
    <Card className="p-6 group" hover glass>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-xl">
              {account.avatar}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
              account.status === 'active' ? 'bg-green-500' : 
              account.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
          </div>
          <div>
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
              {account.username}
            </h3>
            <div className="flex items-center gap-2">
              {account.platform === 'instagram' ? (
                <Instagram className="w-4 h-4 text-pink-500" />
              ) : (
                <Youtube className="w-4 h-4 text-red-500" />
              )}
              <span className="text-slate-400 text-sm">{account.platform}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator 
            status={account.browserStatus === 'running' ? 'online' : 'offline'}
            label=""
          />
          <Badge variant={account.status === 'active' ? 'success' : account.status === 'paused' ? 'warning' : 'danger'}>
            {account.status === 'active' ? 'Активен' : account.status === 'paused' ? 'Пауза' : 'Ошибка'}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-slate-400">Подписчики</p>
          <p className="font-semibold text-white">{account.followers}</p>
        </div>
        <div>
          <p className="text-slate-400">Вовлеченность</p>
          <p className="font-semibold text-green-400">{account.engagement}</p>
        </div>
        <div>
          <p className="text-slate-400">Постов сегодня</p>
          <p className="font-semibold text-white">{account.postsToday}/{account.maxPosts}</p>
        </div>
        <div>
          <p className="text-slate-400">Рост за день</p>
          <p className="font-semibold text-blue-400">{account.dailyGrowth}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-slate-400">{account.proxy}</span>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => alert('Запуск браузера для ' + account.username)}>
            <Globe className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert('Смена IP для ' + account.username)}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert('Настройки аккаунта ' + account.username)}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  // 🎬 КОМПОНЕНТ КАРТОЧКИ ВИДЕО
  const VideoCard = ({ video }) => (
    <Card className="overflow-hidden group" hover glass>
      <div className="relative">
        <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <Video className="w-12 h-12 text-white opacity-80" />
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={
            video.status === 'ready' ? 'blue' : 
            video.status === 'scheduled' ? 'warning' : 'success'
          }>
            {video.status === 'ready' ? 'Готов' : 
             video.status === 'scheduled' ? 'Запланирован' : 'Опубликован'}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
          {video.duration}
        </div>
        {video.aiGenerated && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
            <Brain className="w-3 h-3" />
            AI
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>{video.size}</span>
          <span>{video.uploadDate}</span>
        </div>
        
        {video.hashtags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {video.hashtags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {video.performance && (
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.performance.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {video.performance.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {video.performance.comments}
            </div>
          </div>
        )}
        
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert('Предпросмотр видео...')}>
            <Eye className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert('Редактирование...')}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert('Публикация...')}>
            <Share className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );

  // 📊 DASHBOARD PAGE
  const DashboardPage = () => (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Всего аккаунтов"
          value={mockData.stats.totalAccounts}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          change="+12%"
          trend="up"
          onClick={() => setCurrentPage('accounts')}
        />
        <StatCard
          title="Активно сейчас"
          value={mockData.stats.activeAccounts}
          icon={Activity}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          change="+5%"
          trend="up"
        />
        <StatCard
          title="Постов сегодня"
          value={mockData.stats.todayPosts}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          change="+23%"
          trend="up"
        />
        <StatCard
          title="Общий охват"
          value={`${(mockData.stats.totalReach / 1000000).toFixed(1)}M`}
          icon={Eye}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          change="+8%"
          trend="up"
        />
      </div>

      {/* System Status */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Monitor className="w-6 h-6" />
          Статус системы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatusIndicator status={systemStatus.browserEngine} label="Браузерный движок" />
          <StatusIndicator status={systemStatus.analyticsEngine} label="Система аналитики" />
          <StatusIndicator status={systemStatus.aiGenerator} label="AI-генератор" />
          <div className="flex items-center gap-2">
            <Loader className="w-4 h-4 text-blue-400 animate-spin" />
            <span className="text-sm text-slate-300">Очередь: {systemStatus.automationQueue} задач</span>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Быстрые действия
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            icon={globalAutomation ? Pause : Play}
            className="justify-center py-6"
            onClick={() => {
              setGlobalAutomation(!globalAutomation);
              alert(globalAutomation ? 'Остановка всей автоматизации...' : 'Запуск автоматизации...');
            }}
          >
            {globalAutomation ? 'Остановить автоматизацию' : 'Запустить автоматизацию'}
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            icon={Plus}
            className="justify-center py-6"
            onClick={() => setCurrentPage('accounts')}
          >
            Добавить аккаунт
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            icon={Upload}
            className="justify-center py-6"
            onClick={() => setCurrentPage('content')}
          >
            Загрузить контент
          </Button>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6" glass>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Активность по дням
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="posts" 
                stroke="#3b82f6" 
                fill="url(#blueGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6" glass>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Рост подписчиков
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6" glass>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Последняя активность
        </h3>
        <div className="space-y-3">
          {mockData.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{activity.action}</p>
                <p className="text-slate-400 text-xs">{activity.account}</p>
              </div>
              <span className="text-slate-400 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // 👥 ACCOUNTS PAGE
  const AccountsPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Управление аккаунтами</h1>
          <p className="text-slate-400 mt-1">Полный контроль над вашими социальными профилями</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter}>
            Фильтры
          </Button>
          <Button variant="outline" icon={RefreshCw} onClick={() => alert('Синхронизация всех профилей...')}>
            Синхронизировать
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowAddAccountModal(true)}>
            Добавить аккаунт
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      <Card className="p-4" glass>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-600" />
              <span className="text-slate-300 text-sm">Выбрать все</span>
            </div>
            <div className="h-4 w-px bg-slate-600" />
            <Button variant="ghost" size="sm" icon={Play}>
              Запустить выбранные
            </Button>
            <Button variant="ghost" size="sm" icon={Pause}>
              Приостановить
            </Button>
            <Button variant="ghost" size="sm" icon={RefreshCw}>
              Сменить IP
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Поиск аккаунтов..." 
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.accounts.map(account => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );

  // 🎬 CONTENT PAGE
  const ContentPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Библиотека контента</h1>
          <p className="text-slate-400 mt-1">Управление видео и AI-генерация контента</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Brain} onClick={() => alert('AI генератор идей...')}>
            AI Идеи
          </Button>
          <Button variant="primary" icon={Upload} onClick={() => alert('Загрузка файлов...')}>
            Загрузить контент
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <Card className="p-8 border-2 border-dashed border-slate-600 hover:border-blue-500 transition-colors cursor-pointer" glass>
        <div className="text-center">
          <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Загрузите ваш контент</h3>
          <p className="text-slate-400 mb-6">Перетащите видео файлы сюда или нажмите для выбора</p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => alert('Выбор файлов...')}>
              Выбрать файлы
            </Button>
            <Button variant="secondary" onClick={() => alert('Загрузка папки...')}>
              Загрузить папку
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Generator Panel */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400" />
          AI Генератор контента
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="justify-start p-6 h-auto flex-col items-start gap-2"
            onClick={() => alert('Генерация идей контента...')}
          >
            <div className="flex items-center gap-2 text-yellow-400">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Идеи контента</span>
            </div>
            <p className="text-slate-400 text-sm text-left">Генерация вирусных идей на основе трендов</p>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="justify-start p-6 h-auto flex-col items-start gap-2"
            onClick={() => alert('Генерация описаний...')}
          >
            <div className="flex items-center gap-2 text-green-400">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Умные описания</span>
            </div>
            <p className="text-slate-400 text-sm text-left">Создание цепляющих описаний с призывами к действию</p>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="justify-start p-6 h-auto flex-col items-start gap-2"
            onClick={() => alert('Генерация хештегов...')}
          >
            <div className="flex items-center gap-2 text-purple-400">
              <Hash className="w-5 h-5" />
              <span className="font-semibold">Трендовые хештеги</span>
            </div>
            <p className="text-slate-400 text-sm text-left">Подбор актуальных хештегов для максимального охвата</p>
          </Button>
        </div>
      </Card>

      {/* Content Library */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockData.videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );

  // ⚡ AUTOMATION PAGE
  const AutomationPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Автопостинг</h1>
          <p className="text-slate-400 mt-1">Автоматическое размещение видео во всех аккаунтах</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="danger" 
            icon={AlertCircle}
            onClick={() => {
              setGlobalAutomation(false);
              alert('Экстренная остановка всех постингов!');
            }}
          >
            Остановить все
          </Button>
          <Button variant="primary" icon={Settings} onClick={() => setShowPostingSettingsModal(true)}>
            Настройки автопостинга
          </Button>
        </div>
      </div>

      {/* Главный переключатель */}
      <Card className="p-8" glass>
        <div className="text-center">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
            globalAutomation ? 'bg-green-600' : 'bg-slate-600'
          } transition-colors`}>
            {globalAutomation ? (
              <Play className="w-12 h-12 text-white" />
            ) : (
              <Pause className="w-12 h-12 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Автопостинг {globalAutomation ? 'активен' : 'остановлен'}
          </h2>
          <p className="text-slate-400 mb-6">
            {globalAutomation 
              ? 'Видео автоматически публикуются во всех активных аккаунтах'
              : 'Нажмите для запуска автоматического постинга'
            }
          </p>
          <Button 
            variant={globalAutomation ? "danger" : "success"}
            size="xl"
            icon={globalAutomation ? Pause : Play}
            onClick={() => {
              setGlobalAutomation(!globalAutomation);
              alert(globalAutomation ? 'Остановка автопостинга...' : 'Запуск автопостинга...');
            }}
          >
            {globalAutomation ? 'Остановить автопостинг' : 'Запустить автопостинг'}
          </Button>
        </div>
      </Card>

      {/* Статистика в реальном времени */}
      <Card className="p-6" glass>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Статистика постинга
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{systemStatus.automationQueue}</p>
            <p className="text-slate-400 text-sm">Видео в очереди</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-600 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">127</p>
            <p className="text-slate-400 text-sm">Опубликовано сегодня</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-yellow-600 rounded-2xl flex items-center justify-center">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-slate-400 text-sm">Публикуется сейчас</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-red-600 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">2</p>
            <p className="text-slate-400 text-sm">Ошибки</p>
          </div>
        </div>
      </Card>

      {/* Активные аккаунты */}
      <Card className="p-6" glass>
        <h3 className="text-lg font-semibold text-white mb-4">Активные аккаунты в автопостинге</h3>
        <div className="space-y-3">
          {mockData.accounts.filter(account => account.status === 'active').map(account => (
            <div key={account.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-sm">
                  {account.avatar}
                </div>
                <div>
                  <p className="text-white font-medium">{account.username}</p>
                  <p className="text-slate-400 text-sm">Следующий пост через 2 часа</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white text-sm">{account.postsToday}/{account.maxPosts}</p>
                  <p className="text-slate-400 text-xs">постов сегодня</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Быстрые действия */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center cursor-pointer hover:bg-slate-700/50 transition-colors" glass onClick={() => setCurrentPage('content')}>
          <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Загрузить видео</h3>
          <p className="text-slate-400 text-sm">Добавить новые видео для автопостинга</p>
        </Card>
        
        <Card className="p-6 text-center cursor-pointer hover:bg-slate-700/50 transition-colors" glass onClick={() => setCurrentPage('accounts')}>
          <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Управление аккаунтами</h3>
          <p className="text-slate-400 text-sm">Добавить или настроить аккаунты</p>
        </Card>
        
        <Card className="p-6 text-center cursor-pointer hover:bg-slate-700/50 transition-colors" glass onClick={() => setShowPostingSettingsModal(true)}>
          <Settings className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Настройки</h3>
          <p className="text-slate-400 text-sm">Настроить частоту и время постинга</p>
        </Card>
      </div>
    </div>
  );

  // 📊 ANALYTICS PAGE
  const AnalyticsPage = () => (
    <div className="text-center py-20">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
        <TrendingUp className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Глубокая аналитика</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Подключаем систему аналитики для детального анализа производительности ваших аккаунтов
      </p>
      <Button variant="primary" size="lg" onClick={() => alert('Подключение системы аналитики...')}>
        Настроить аналитику
      </Button>
    </div>
  );

  // ⚙️ SETTINGS PAGE
  const SettingsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Настройки системы</h1>
        <p className="text-slate-400 mt-1">Конфигурация платформы и интеграций</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <Card className="p-6" glass>
          <h3 className="font-semibold text-white mb-4">Разделы настроек</h3>
          <nav className="space-y-2">
            {[
              { name: 'Основные', icon: Settings, active: true },
              { name: 'Интеграции', icon: Link },
              { name: 'Безопасность', icon: Shield },
              { name: 'Уведомления', icon: Bell },
              { name: 'Резервные копии', icon: Database }
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6" glass>
            <h3 className="text-lg font-semibold text-white mb-4">Системные интеграции</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Браузерный движок</p>
                    <p className="text-sm text-slate-400">Управление браузерными профилями</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusIndicator status="online" label="Подключен" />
                  <Button variant="outline" size="sm" onClick={() => alert('Тестирование браузерного движка...')}>
                    Тест
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Система аналитики</p>
                    <p className="text-sm text-slate-400">Сбор и анализ метрик</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusIndicator status="syncing" label="Синхронизация" />
                  <Button variant="outline" size="sm" onClick={() => alert('Настройка аналитики...')}>
                    Настроить
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">AI-генератор</p>
                    <p className="text-sm text-slate-400">Создание контента с помощью ИИ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusIndicator status="online" label="Активен" />
                  <Button variant="outline" size="sm" onClick={() => alert('Тестирование AI...')}>
                    Тест
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6" glass>
            <h3 className="text-lg font-semibold text-white mb-4">Системная диагностика</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => alert('Запуск полной диагностики...')}>
                <Activity className="w-4 h-4" />
                Диагностика системы
              </Button>
              <Button variant="outline" onClick={() => alert('Создание резервной копии...')}>
                <Database className="w-4 h-4" />
                Резервное копирование
              </Button>
              <Button variant="outline" onClick={() => alert('Очистка кэша...')}>
                <RefreshCw className="w-4 h-4" />
                Очистить кэш
              </Button>
              <Button variant="outline" onClick={() => alert('Экспорт настроек...')}>
                <Download className="w-4 h-4" />
                Экспорт настроек
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">SocialBot</h1>
                <p className="text-xs text-slate-400">Платформа автоматизации</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-slate-700 transition-colors ${
                currentPage === item.id ? 'bg-slate-700 text-blue-400 border-r-2 border-blue-400' : 'text-slate-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge variant="blue" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {navigation.find(nav => nav.id === currentPage)?.name || 'SocialBot'}
                </h1>
                <p className="text-sm text-slate-400">Добро пожаловать в центр управления</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${globalAutomation ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
                <span className="text-sm text-slate-300">
                  {globalAutomation ? 'Автопостинг активен' : 'Автопостинг остановлен'}
                </span>
              </div>
              
              <button className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-sm font-bold">А</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">Администратор</p>
                    <p className="text-xs text-slate-400">Полный доступ</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showUserMenu && <UserMenu />}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'accounts' && <AccountsPage />}
          {currentPage === 'content' && <ContentPage />}
          {currentPage === 'automation' && <AutomationPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>

        {/* Модальные окна */}
        {showAddAccountModal && <AddAccountModal />}
        {showAddProxyModal && <AddProxyModal />}
        {showPostingSettingsModal && <PostingSettingsModal />}

        {/* Footer */}
        <footer className="bg-slate-800 border-t border-slate-700 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span>SocialBot Platform v2.0</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Все системы работают</span>
              </div>
              <span>•</span>
              <span>Последнее обновление: сейчас</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <button className="hover:text-white transition-colors">Техподдержка</button>
              <button className="hover:text-white transition-colors">Документация</button>
              <button className="hover:text-white transition-colors">API</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SocialBotPlatform; 