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
  X, ChevronDown, Star, Heart, Share, MoreHorizontal
} from 'lucide-react';
import axios from 'axios';

// 🎨 ДИЗАЙН СИСТЕМА
const THEME = {
  colors: {
    primary: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
    secondary: { 500: '#8b5cf6', 600: '#7c3aed' },
    success: { 500: '#10b981', 600: '#059669' },
    warning: { 500: '#f59e0b', 600: '#d97706' },
    error: { 500: '#ef4444', 600: '#dc2626' }
  }
};

// 🧩 БАЗОВЫЕ UI КОМПОНЕНТЫ
const Button = ({ variant = 'primary', size = 'md', children, icon: Icon, disabled = false, className = '', ...props }) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500'
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`} disabled={disabled} {...props}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = false, ...props }) => {
  const hoverEffect = hover ? 'hover:shadow-md hover:-translate-y-1' : '';
  return <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${hoverEffect} transition-all duration-200 ${className}`} {...props}>{children}</div>;
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800', success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800', error: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800', purple: 'bg-purple-100 text-purple-800'
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>;
};

// 📊 MOCK DATA
const mockData = {
  stats: { totalAccounts: 24, activeAccounts: 18, postsToday: 47, totalReach: 156840, engagement: 4.2 },
  accounts: [
    { id: 1, username: 'travel_explorer_pro', platform: 'instagram', status: 'active', followers: '24.5K', engagement: '6.2%', postsToday: 3, maxPosts: 5, lastPost: '2 часа назад', niche: 'Путешествия', proxy: 'US-Mobile-1' },
    { id: 2, username: 'food_adventures_daily', platform: 'youtube', status: 'active', followers: '12.1K', engagement: '4.8%', postsToday: 1, maxPosts: 3, lastPost: '4 часа назад', niche: 'Еда', proxy: 'UK-Mobile-2' },
    { id: 3, username: 'lifestyle_vibes_24', platform: 'instagram', status: 'paused', followers: '8.7K', engagement: '5.1%', postsToday: 0, maxPosts: 4, lastPost: '1 день назад', niche: 'Лайфстайл', proxy: 'DE-Mobile-3' }
  ],
  videos: [
    { id: 1, filename: 'sunset_beach_vibes.mp4', duration: '0:15', size: '2.3 MB', status: 'ready', uploadDate: '2 часа назад' },
    { id: 2, filename: 'cooking_pasta_recipe.mp4', duration: '0:28', size: '4.1 MB', status: 'scheduled', uploadDate: '5 часов назад' },
    { id: 3, filename: 'morning_routine_tips.mp4', duration: '0:22', size: '3.2 MB', status: 'posted', uploadDate: '1 день назад' }
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
const SocialMediaApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAutoPosting, setIsAutoPosting] = useState(false);
  const [apiStatus, setApiStatus] = useState({ connected: false, loading: true });

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
    { id: 'dashboard', name: 'Панель управления', icon: BarChart3, badge: null },
    { id: 'accounts', name: 'Аккаунты', icon: Users, badge: mockData.accounts.length },
    { id: 'content', name: 'Контент', icon: Video, badge: mockData.videos.length },
    { id: 'automation', name: 'Автоматизация', icon: Zap, badge: '3 активно' },
    { id: 'analytics', name: 'Аналитика', icon: TrendingUp, badge: null },
    { id: 'settings', name: 'Настройки', icon: Settings, badge: null }
  ];

  // Компоненты карточек
  const StatCard = ({ title, value, icon: Icon, color, change, trend }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300" hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {change}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );

  const AccountCard = ({ account }) => (
    <Card className="p-4 hover:shadow-lg transition-all duration-300" hover>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              {account.platform === 'instagram' ? <Instagram className="w-5 h-5 text-white" /> : <Youtube className="w-5 h-5 text-white" />}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              account.status === 'active' ? 'bg-green-500' : account.status === 'paused' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{account.username}</h3>
            <p className="text-sm text-gray-500">{account.niche}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={account.status === 'active' ? 'success' : account.status === 'paused' ? 'warning' : 'error'}>
            {account.status === 'active' ? 'активен' : account.status === 'paused' ? 'пауза' : 'ошибка'}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
        <div><p className="text-gray-500">Подписчики</p><p className="font-medium">{account.followers}</p></div>
        <div><p className="text-gray-500">Вовлеченность</p><p className="font-medium">{account.engagement}</p></div>
        <div><p className="text-gray-500">Постов сегодня</p><p className="font-medium">{account.postsToday}/{account.maxPosts}</p></div>
        <div><p className="text-gray-500">Последний пост</p><p className="font-medium">{account.lastPost}</p></div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">{account.proxy}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Settings className="w-4 h-4" /></Button>
        </div>
      </div>
    </Card>
  );

  const VideoCard = ({ video }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300" hover>
      <div className="relative">
        <div className="w-full h-24 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
          <Video className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={video.status === 'ready' ? 'blue' : video.status === 'scheduled' ? 'warning' : 'success'}>
            {video.status === 'ready' ? 'готов' : video.status === 'scheduled' ? 'запланирован' : 'опубликован'}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 truncate">{video.filename}</h3>
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>{video.size}</span>
          <span>{video.uploadDate}</span>
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="flex-1"><Eye className="w-3 h-3" /></Button>
          <Button variant="ghost" size="sm" className="flex-1"><Download className="w-3 h-3" /></Button>
          <Button variant="ghost" size="sm" className="flex-1"><Trash2 className="w-3 h-3" /></Button>
        </div>
      </div>
    </Card>
  );

  // Страницы
  const DashboardPage = () => (
    <div className="space-y-6">
      {/* API Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${apiStatus.connected ? 'bg-green-500' : 'bg-red-500'} ${apiStatus.loading ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium text-gray-700">
              Статус API: {apiStatus.loading ? 'Проверка...' : apiStatus.connected ? 'Подключен' : 'Не подключен'}
            </span>
          </div>
          <span className="text-xs text-gray-500">https://social-media-automation-va4y.onrender.com</span>
        </div>
      </Card>

      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Всего аккаунтов" value={mockData.stats.totalAccounts} icon={Users} color="bg-blue-500" change="+12%" trend="up" />
        <StatCard title="Активные аккаунты" value={mockData.stats.activeAccounts} icon={CheckCircle} color="bg-green-500" change="+5%" trend="up" />
        <StatCard title="Постов сегодня" value={mockData.stats.postsToday} icon={TrendingUp} color="bg-purple-500" change="+23%" trend="up" />
        <StatCard title="Общий охват" value={`${(mockData.stats.totalReach / 1000).toFixed(1)}K`} icon={Eye} color="bg-orange-500" change="+8%" trend="up" />
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Обзор активности</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="posts" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Тренды вовлеченности</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="justify-center py-4"><Plus className="w-5 h-5" />Добавить аккаунт</Button>
          <Button variant="secondary" className="justify-center py-4"><Upload className="w-5 h-5" />Загрузить видео</Button>
          <Button variant="success" className="justify-center py-4"><Play className="w-5 h-5" />Запустить автоматизацию</Button>
        </div>
      </Card>
    </div>
  );

  const AccountsPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Аккаунты</h1>
          <p className="text-gray-600">Управление аккаунтами социальных сетей</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter}>Фильтр</Button>
          <Button icon={Plus}>Добавить аккаунт</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.accounts.map(account => <AccountCard key={account.id} account={account} />)}
      </div>
    </div>
  );

  const ContentPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Библиотека контента</h1>
          <p className="text-gray-600">Управление видео контентом</p>
        </div>
        <Button icon={Upload}>Загрузить видео</Button>
      </div>

      <Card className="p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Загрузите ваши видео</h3>
          <p className="text-gray-600 mb-4">Перетащите видео файлы сюда или нажмите для выбора</p>
          <Button>Выбрать файлы</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockData.videos.map(video => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );

  const AutomationPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Автоматизация</h1>
          <p className="text-gray-600">Настройка автоматического постинга</p>
        </div>
        <Button variant={isAutoPosting ? "danger" : "success"} icon={isAutoPosting ? Pause : Play} onClick={() => setIsAutoPosting(!isAutoPosting)}>
          {isAutoPosting ? "Остановить автоматизацию" : "Запустить автоматизацию"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Настройки постинга</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Постов в день</label>
              <div className="flex items-center gap-4">
                <input type="range" min="1" max="10" defaultValue="3" className="flex-1" />
                <span className="text-sm text-gray-600 w-8">3</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Часы постинга</label>
              <div className="flex flex-wrap gap-2">
                {['09:00', '12:00', '15:00', '18:00', '21:00'].map(time => (
                  <Badge key={time} variant="blue" className="cursor-pointer hover:bg-blue-200">{time}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Настройки безопасности</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Имитация человеческого поведения</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Ротация прокси</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Случайные задержки</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">SocialBot</h1>
                <p className="text-xs text-gray-500">Автоматизация</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
              currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
            }`}>
              <item.icon className="w-5 h-5" />
              {sidebarOpen && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && <Badge variant="blue" className="text-xs">{item.badge}</Badge>}
                </>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{navigation.find(nav => nav.id === currentPage)?.name}</h1>
                <p className="text-sm text-gray-500">Добро пожаловать! Вот что происходит сегодня.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isAutoPosting ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-600">{isAutoPosting ? 'Автопостинг активен' : 'Автопостинг приостановлен'}</span>
              </div>
              
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">М</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Макс</p>
                  <p className="text-xs text-gray-500">Администратор</p>
                </div>
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
          {(currentPage === 'analytics' || currentPage === 'settings') && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">🚧</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Страница в разработке</h3>
              <p className="text-gray-600">Эта функция будет добавлена в следующей версии</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SocialMediaApp; 