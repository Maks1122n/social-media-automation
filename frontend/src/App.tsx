import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Play, Pause, Upload, Settings, Users, Video, Calendar, 
  TrendingUp, AlertCircle, CheckCircle, Clock, Instagram, 
  Youtube, Eye, Download, Plus, Trash2, Edit, Filter,
  RefreshCw, Globe, Smartphone, Shield, Activity, Brain,
  Folder, Hash, MessageSquare, Image, Music, Zap, Target,
  BarChart3, Cpu, Database, Link, Monitor, MousePointer, 
  Timer, Shuffle, Camera, Palette, Search, Bell, Menu,
  X, ChevronDown, Star, Heart, Share, MoreHorizontal,
  User, LogOut, CreditCard, HelpCircle, Wifi, WifiOff
} from 'lucide-react';
import axios from 'axios';

// 🎨 СОВРЕМЕННАЯ ТЕМНАЯ ТЕМА
const THEME = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6', 
    accent: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#0f172a',
    surface: '#1e293b',
    card: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#475569'
  },
  glassmorphism: 'backdrop-blur-lg bg-white/5 border border-white/10',
  gradient: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600'
};

// 🧩 СОВРЕМЕННЫЕ UI КОМПОНЕНТЫ
const Button = ({ variant = 'primary', size = 'md', children, icon: Icon, disabled = false, className = '', ...props }) => {
  const baseStyles = 'font-medium rounded-xl transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 active:scale-95';
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-500/25',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500 shadow-lg',
    success: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-500/25',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white focus:ring-red-500 shadow-lg shadow-red-500/25',
    outline: 'border border-slate-600 hover:bg-slate-700 text-slate-300 focus:ring-indigo-500',
    ghost: 'hover:bg-slate-700/50 text-slate-300 focus:ring-slate-500'
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer';
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`} disabled={disabled} {...props}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = false, glass = false, ...props }) => {
  const baseStyles = glass ? THEME.glassmorphism : 'bg-slate-800 border border-slate-700';
  const hoverEffect = hover ? 'hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1' : '';
  return (
    <div className={`${baseStyles} rounded-2xl ${hoverEffect} transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// 🎭 МОДАЛЬНЫЕ ОКНА
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card glass className={`relative ${sizes[size]} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
};

// 📊 MOCK DATA
const mockData = {
  stats: { totalAccounts: 24, activeAccounts: 18, postsToday: 47, totalReach: 156840, engagement: 4.2 },
  accounts: [
    { id: 1, username: 'travel_explorer_pro', platform: 'instagram', status: 'active', followers: '24.5K', engagement: '6.2%', postsToday: 3, maxPosts: 5, lastPost: '2 часа назад', niche: 'Путешествия', proxy: 'US-Mobile-1' },
    { id: 2, username: 'food_adventures_daily', platform: 'youtube', status: 'active', followers: '12.1K', engagement: '4.8%', postsToday: 1, maxPosts: 3, lastPost: '4 часа назад', niche: 'Еда', proxy: 'UK-Mobile-2' },
    { id: 3, username: 'lifestyle_vibes_24', platform: 'instagram', status: 'paused', followers: '8.7K', engagement: '5.1%', postsToday: 0, maxPosts: 4, lastPost: '1 день назад', niche: 'Лайфстайл', proxy: 'DE-Mobile-3' },
    { id: 4, username: 'tech_reviews_hub', platform: 'youtube', status: 'active', followers: '31.2K', engagement: '7.1%', postsToday: 2, maxPosts: 4, lastPost: '1 час назад', niche: 'Технологии', proxy: 'FR-Mobile-4' },
    { id: 5, username: 'fitness_motivation_daily', platform: 'instagram', status: 'active', followers: '18.7K', engagement: '5.8%', postsToday: 4, maxPosts: 6, lastPost: '30 минут назад', niche: 'Фитнес', proxy: 'CA-Mobile-5' }
  ],
  videos: [
    { id: 1, filename: 'sunset_beach_vibes.mp4', duration: '0:15', size: '2.3 MB', status: 'ready', uploadDate: '2 часа назад' },
    { id: 2, filename: 'cooking_pasta_recipe.mp4', duration: '0:28', size: '4.1 MB', status: 'scheduled', uploadDate: '5 часов назад' },
    { id: 3, filename: 'morning_routine_tips.mp4', duration: '0:22', size: '3.2 MB', status: 'posted', uploadDate: '1 день назад' },
    { id: 4, filename: 'tech_review_phone.mp4', duration: '1:45', size: '12.8 MB', status: 'ready', uploadDate: '3 часа назад' },
    { id: 5, filename: 'workout_at_home.mp4', duration: '0:35', size: '6.7 MB', status: 'processing', uploadDate: '1 час назад' }
  ],
  chartData: [
    { name: 'Пн', posts: 45, reach: 12000, engagement: 520 },
    { name: 'Вт', posts: 52, reach: 15200, engagement: 680 },
    { name: 'Ср', posts: 38, reach: 9800, engagement: 440 },
    { name: 'Чт', posts: 61, reach: 18400, engagement: 820 },
    { name: 'Пт', posts: 55, reach: 16800, engagement: 750 },
    { name: 'Сб', posts: 67, reach: 21200, engagement: 950 },
    { name: 'Вс', posts: 43, reach: 13600, engagement: 580 }
  ]
};

// 🏠 ГЛАВНАЯ КОМПОНЕНТА
const SocialBotPlatform = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAutoPosting, setIsAutoPosting] = useState(false);
  const [apiStatus, setApiStatus] = useState({ connected: false, loading: true });
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProxySettings, setShowProxySettings] = useState(false);
  const [showPostingConfig, setShowPostingConfig] = useState(false);

  // Проверка подключения к API
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await axios.get('https://social-media-automation-va4y.onrender.com/api/health');
        setApiStatus({ connected: true, loading: false });
      } catch (error) {
        setApiStatus({ connected: false, loading: false });
      }
    };
    checkAPI();
  }, []);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, badge: null },
    { id: 'accounts', name: 'Аккаунты', icon: Users, badge: mockData.accounts.length },
    { id: 'content', name: 'Контент', icon: Video, badge: mockData.videos.length },
    { id: 'autopost', name: 'Автопостинг', icon: Zap, badge: isAutoPosting ? 'ON' : 'OFF' },
    { id: 'analytics', name: 'Аналитика', icon: TrendingUp, badge: null },
    { id: 'settings', name: 'Настройки', icon: Settings, badge: null }
  ];

  // 📊 СТАТИСТИЧЕСКИЕ КАРТОЧКИ
  const StatCard = ({ title, value, icon: Icon, color, change, trend }) => (
    <Card className="p-6 group" hover glass>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-3 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {change}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </Card>
  );

  // 👤 КАРТОЧКА АККАУНТА
  const AccountCard = ({ account }) => (
    <Card className="p-6 group" hover glass>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              {account.platform === 'instagram' ? <Instagram className="w-6 h-6 text-white" /> : <Youtube className="w-6 h-6 text-white" />}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
              account.status === 'active' ? 'bg-emerald-500' : account.status === 'paused' ? 'bg-amber-500' : 'bg-red-500'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{account.username}</h3>
            <p className="text-sm text-slate-400">{account.niche}</p>
          </div>
        </div>
        <Badge variant={account.status === 'active' ? 'success' : account.status === 'paused' ? 'warning' : 'error'}>
          {account.status === 'active' ? 'Активен' : account.status === 'paused' ? 'Пауза' : 'Ошибка'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-slate-700/50 rounded-xl">
          <p className="text-slate-400 text-xs">Подписчики</p>
          <p className="font-bold text-white text-lg">{account.followers}</p>
        </div>
        <div className="text-center p-3 bg-slate-700/50 rounded-xl">
          <p className="text-slate-400 text-xs">Вовлеченность</p>
          <p className="font-bold text-white text-lg">{account.engagement}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <div className="text-sm">
          <span className="text-slate-400">Постов: </span>
          <span className="text-white font-medium">{account.postsToday}/{account.maxPosts}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Settings className="w-4 h-4" /></Button>
        </div>
      </div>
    </Card>
  );

  // 🎬 КАРТОЧКА ВИДЕО
  const VideoCard = ({ video }) => (
    <Card className="overflow-hidden group" hover glass>
      <div className="relative">
        <div className="w-full h-32 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
          <Video className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={video.status === 'ready' ? 'blue' : video.status === 'scheduled' ? 'warning' : video.status === 'posted' ? 'success' : 'purple'}>
            {video.status === 'ready' ? 'Готов' : video.status === 'scheduled' ? 'Запланирован' : video.status === 'posted' ? 'Опубликован' : 'Обработка'}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs px-2 py-1 rounded-lg">
          {video.duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-white text-sm mb-2 truncate">{video.filename}</h3>
        <div className="flex justify-between text-xs text-slate-400 mb-4">
          <span>{video.size}</span>
          <span>{video.uploadDate}</span>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1"><Eye className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" className="flex-1"><Download className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" className="flex-1"><Trash2 className="w-4 h-4" /></Button>
        </div>
      </div>
    </Card>
  );

  // 📱 СТРАНИЦЫ
  const DashboardPage = () => (
    <div className="space-y-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Добро пожаловать в SocialBot Platform</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${THEME.glassmorphism}`}>
            <div className={`w-2 h-2 rounded-full ${apiStatus.connected ? 'bg-emerald-500' : 'bg-red-500'} ${apiStatus.loading ? 'animate-pulse' : ''}`} />
            <span className="text-sm text-slate-300">
              {apiStatus.loading ? 'Проверка...' : apiStatus.connected ? 'API подключен' : 'API недоступен'}
            </span>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Всего аккаунтов" 
          value={mockData.stats.totalAccounts} 
          icon={Users} 
          color="bg-gradient-to-r from-blue-500 to-cyan-500" 
          change="+12%" 
          trend="up" 
        />
        <StatCard 
          title="Активные аккаунты" 
          value={mockData.stats.activeAccounts} 
          icon={CheckCircle} 
          color="bg-gradient-to-r from-emerald-500 to-teal-500" 
          change="+5%" 
          trend="up" 
        />
        <StatCard 
          title="Постов сегодня" 
          value={mockData.stats.postsToday} 
          icon={TrendingUp} 
          color="bg-gradient-to-r from-purple-500 to-pink-500" 
          change="+23%" 
          trend="up" 
        />
        <StatCard 
          title="Общий охват" 
          value={`${(mockData.stats.totalReach / 1000).toFixed(1)}K`} 
          icon={Eye} 
          color="bg-gradient-to-r from-orange-500 to-red-500" 
          change="+8%" 
          trend="up" 
        />
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-6">Активность за неделю</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '12px',
                  color: '#f1f5f9'
                }}
              />
              <Area type="monotone" dataKey="posts" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-6">Охват аудитории</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '12px',
                  color: '#f1f5f9'
                }}
              />
              <Line type="monotone" dataKey="reach" stroke="#06b6d4" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-semibold text-white mb-6">Быстрые действия</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="primary" size="lg" icon={Plus} onClick={() => setShowAddAccount(true)}>
            Добавить аккаунт
          </Button>
          <Button variant="secondary" size="lg" icon={Upload}>
            Загрузить контент
          </Button>
          <Button variant="success" size="lg" icon={Play}>
            Запустить автопостинг
          </Button>
        </div>
      </Card>
    </div>
  );

  const AccountsPage = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Аккаунты</h1>
          <p className="text-slate-400 mt-1">Управление социальными аккаунтами</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter}>Фильтр</Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowAddAccount(true)}>
            Добавить аккаунт
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.accounts.map(account => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      {/* Статистика аккаунтов */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-semibold text-white mb-6">Статистика аккаунтов</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">
              {mockData.accounts.filter(a => a.status === 'active').length}
            </div>
            <div className="text-slate-400 text-sm mt-1">Активных аккаунтов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">
              {mockData.accounts.filter(a => a.status === 'paused').length}
            </div>
            <div className="text-slate-400 text-sm mt-1">На паузе</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">
              {mockData.accounts.reduce((sum, a) => sum + a.postsToday, 0)}
            </div>
            <div className="text-slate-400 text-sm mt-1">Постов сегодня</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const ContentPage = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Контент</h1>
          <p className="text-slate-400 mt-1">Библиотека медиа-файлов</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter}>Фильтр</Button>
          <Button variant="secondary" icon={Brain}>AI Генератор</Button>
          <Button variant="primary" icon={Upload}>Загрузить</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockData.videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* AI Генератор */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-semibold text-white mb-4">AI Генератор контента</h3>
        <p className="text-slate-400 mb-6">Создавайте уникальный контент с помощью искусственного интеллекта</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="primary" icon={Brain} size="lg">
            Генерировать текст
          </Button>
          <Button variant="secondary" icon={Image} size="lg">
            Создать изображение
          </Button>
        </div>
      </Card>
    </div>
  );

  const AutoPostPage = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Автопостинг</h1>
          <p className="text-slate-400 mt-1">Автоматическая публикация контента</p>
        </div>
      </div>

      {/* Главная кнопка автопостинга */}
      <Card className="p-8 text-center" glass>
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
            isAutoPosting ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-slate-600 to-slate-700'
          }`}>
            {isAutoPosting ? <Play className="w-12 h-12 text-white" /> : <Pause className="w-12 h-12 text-white" />}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Автопостинг {isAutoPosting ? 'ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН'}
          </h2>
          <p className="text-slate-400">
            {isAutoPosting ? 'Система автоматически публикует контент' : 'Нажмите для запуска автоматической публикации'}
          </p>
        </div>
        
        <Button 
          variant={isAutoPosting ? 'danger' : 'success'} 
          size="lg" 
          icon={isAutoPosting ? Pause : Play}
          onClick={() => setIsAutoPosting(!isAutoPosting)}
          className="text-xl px-8 py-4"
        >
          {isAutoPosting ? 'ОСТАНОВИТЬ' : 'ЗАПУСТИТЬ'}
        </Button>
      </Card>

      {/* Настройки автопостинга */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-4">Настройки публикации</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Интервал между постами</span>
              <span className="text-white font-medium">2-4 часа</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Максимум постов в день</span>
              <span className="text-white font-medium">6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Активные часы</span>
              <span className="text-white font-medium">9:00 - 22:00</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6" onClick={() => setShowPostingConfig(true)}>
            Настроить
          </Button>
        </Card>

        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-4">Прокси настройки</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Активных прокси</span>
              <span className="text-emerald-400 font-medium">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Ротация прокси</span>
              <span className="text-white font-medium">Включена</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Статус подключения</span>
              <Badge variant="success">Подключено</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6" onClick={() => setShowProxySettings(true)}>
            Управление прокси
          </Button>
        </Card>
      </div>

      {/* Статистика автопостинга */}
      {isAutoPosting && (
        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-6">Статистика автопостинга</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">47</div>
              <div className="text-slate-400 text-sm">Постов сегодня</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">156K</div>
              <div className="text-slate-400 text-sm">Охват</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">4.2%</div>
              <div className="text-slate-400 text-sm">Вовлеченность</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">98%</div>
              <div className="text-slate-400 text-sm">Успешность</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const AnalyticsPage = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Аналитика</h1>
          <p className="text-slate-400 mt-1">Детальная статистика и отчеты</p>
        </div>
      </div>

      <Card className="p-12 text-center" glass>
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Аналитика в разработке</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Мы работаем над созданием мощной системы аналитики для отслеживания эффективности ваших аккаунтов
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="primary" icon={Bell}>
            Уведомить о готовности
          </Button>
          <Button variant="outline" icon={HelpCircle}>
            Узнать больше
          </Button>
        </div>
      </Card>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Настройки</h1>
          <p className="text-slate-400 mt-1">Системные настройки платформы</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-4">Общие настройки</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Уведомления</span>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Автосохранение</span>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Темная тема</span>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6" glass>
          <h3 className="text-xl font-semibold text-white mb-4">Безопасность</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full" icon={Shield}>
              Изменить пароль
            </Button>
            <Button variant="outline" className="w-full" icon={Smartphone}>
              Двухфакторная аутентификация
            </Button>
            <Button variant="outline" className="w-full" icon={Activity}>
              История активности
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6" glass>
        <h3 className="text-xl font-semibold text-white mb-4">API Интеграции</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-700/50 rounded-xl">
            <h4 className="font-medium text-white mb-2">AdsPower</h4>
            <p className="text-sm text-slate-400 mb-3">Управление браузерами</p>
            <Badge variant="success">Подключено</Badge>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-xl">
            <h4 className="font-medium text-white mb-2">LiveDune</h4>
            <p className="text-sm text-slate-400 mb-3">Аналитика постов</p>
            <Badge variant="warning">Настройка</Badge>
          </div>
          <div className="p-4 bg-slate-700/50 rounded-xl">
            <h4 className="font-medium text-white mb-2">AI Services</h4>
            <p className="text-sm text-slate-400 mb-3">Генерация контента</p>
            <Badge variant="error">Не подключено</Badge>
          </div>
        </div>
      </Card>
    </div>
  );

  // Рендер страниц
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'accounts': return <AccountsPage />;
      case 'content': return <ContentPage />;
      case 'autopost': return <AutoPostPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Фоновый градиент */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pointer-events-none" />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <Card className="h-full rounded-none" glass>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SocialBot</h1>
                <p className="text-xs text-slate-400">Platform v2.0</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge variant={currentPage === item.id ? 'default' : 'blue'} className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Card className="rounded-none border-0 border-b border-slate-700" glass>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden text-slate-400 hover:text-white transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                  <Globe className="w-4 h-4" />
                  <span>Москва, Россия</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4" />
                  <span>{new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {apiStatus.connected ? (
                    <Wifi className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm text-slate-400">
                    {apiStatus.connected ? 'Онлайн' : 'Оффлайн'}
                  </span>
                </div>
                
                <button className="relative text-slate-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm">Пользователь</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                        <User className="w-4 h-4" />
                        Профиль
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                        <CreditCard className="w-4 h-4" />
                        Подписка
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                        <Settings className="w-4 h-4" />
                        Настройки
                      </button>
                      <hr className="my-2 border-slate-700" />
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Page Content */}
        <main className="p-6">
          {renderPage()}
        </main>
      </div>

      {/* Модальные окна */}
      <Modal
        isOpen={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        title="Добавить новый аккаунт"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Платформа</label>
              <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500">
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Facebook</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Имя пользователя</label>
              <input
                type="text"
                placeholder="username"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Пароль</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Прокси</label>
              <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500">
                <option>US-Mobile-1</option>
                <option>UK-Mobile-2</option>
                <option>DE-Mobile-3</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ниша</label>
            <input
              type="text"
              placeholder="Например: Путешествия, Еда, Технологии"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1">
              Добавить аккаунт
            </Button>
            <Button variant="outline" onClick={() => setShowAddAccount(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showProxySettings}
        onClose={() => setShowProxySettings(false)}
        title="Настройки прокси"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Тип прокси</label>
              <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500">
                <option>HTTP</option>
                <option>SOCKS5</option>
                <option>Mobile</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Страна</label>
              <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500">
                <option>США</option>
                <option>Великобритания</option>
                <option>Германия</option>
                <option>Канада</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Прокси-сервер</label>
            <input
              type="text"
              placeholder="ip:port:username:password"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
            <label className="text-sm text-slate-300">Автоматическая ротация прокси</label>
          </div>
          
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1">
              Сохранить настройки
            </Button>
            <Button variant="outline" onClick={() => setShowProxySettings(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showPostingConfig}
        onClose={() => setShowPostingConfig(false)}
        title="Настройки автопостинга"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Интервал между постами</label>
              <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500">
                <option>1-2 часа</option>
                <option>2-4 часа</option>
                <option>4-6 часов</option>
                <option>6-8 часов</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Максимум постов в день</label>
              <input
                type="number"
                defaultValue="6"
                min="1"
                max="20"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Начало активности</label>
              <input
                type="time"
                defaultValue="09:00"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Конец активности</label>
              <input
                type="time"
                defaultValue="22:00"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" defaultChecked />
              <label className="text-sm text-slate-300">Публиковать в выходные</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" defaultChecked />
              <label className="text-sm text-slate-300">Случайные интервалы</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
              <label className="text-sm text-slate-300">Остановить при ошибках</label>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1">
              Сохранить настройки
            </Button>
            <Button variant="outline" onClick={() => setShowPostingConfig(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SocialBotPlatform; 