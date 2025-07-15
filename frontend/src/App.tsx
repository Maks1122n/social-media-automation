import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Activity, Users, Video, Zap, TrendingUp, Settings, Bell, Menu, X, LogOut,
  Play, Pause, Plus, Upload, Filter, Search, Eye, Edit, Trash2, Download,
  Globe, Shield, Brain, Cpu, Database, Monitor, Smartphone, RefreshCw,
  ChevronDown, ChevronRight, MoreHorizontal, Star, Heart, Share, Calendar,
  Clock, AlertCircle, CheckCircle, XCircle, Loader, ArrowUp, ArrowDown,
  Instagram, Youtube, Hash, MessageSquare, Image, Music, Palette,
  Target, BarChart3, Timer, Shuffle, Camera, Folder, Link, MousePointer
} from 'lucide-react';
import { apiClient } from './config/api';
import LoginForm from './LoginForm';

// 🎨 СОВРЕМЕННАЯ ДИЗАЙН СИСТЕМА
const theme = {
  colors: {
    bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155', card: 'rgba(30, 41, 59, 0.8)' },
    accent: { blue: '#3b82f6', purple: '#8b5cf6', green: '#10b981', orange: '#f59e0b', red: '#ef4444' },
    glass: { bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)' },
    text: { primary: '#f8fafc', secondary: '#cbd5e1', muted: '#64748b' }
  }
};

// 🧩 UI КОМПОНЕНТЫ
const Button = ({ variant = 'primary', size = 'md', icon: Icon, children, loading = false, disabled = false, className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 hover:border-slate-500',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg',
    ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white',
    outline: 'border-2 border-slate-600 hover:border-blue-500 text-slate-300 hover:text-blue-400 hover:bg-slate-800'
  };
  const sizes = { sm: 'px-3 py-2 text-sm', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-base', xl: 'px-8 py-4 text-lg' };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} disabled={disabled || loading} onClick={onClick} {...props}>
      {loading ? <Loader className="w-4 h-4 animate-spin" /> : (Icon && <Icon className="w-4 h-4" />)}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = false, glass = false, ...props }) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  const glassClasses = glass ? 'bg-white/10 backdrop-blur-lg border-white/20 shadow-xl' : 'bg-slate-800 border-slate-700 shadow-lg';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/50' : '';
  return <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`} {...props}>{children}</div>;
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = { default: 'bg-slate-700 text-slate-200', success: 'bg-green-600 text-white', warning: 'bg-yellow-600 text-white', danger: 'bg-red-600 text-white', blue: 'bg-blue-600 text-white', purple: 'bg-purple-600 text-white' };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>;
};

const StatusIndicator = ({ status, label }) => {
  const statusConfig = { online: { color: 'bg-green-500', animation: 'animate-pulse' }, offline: { color: 'bg-red-500', animation: '' }, syncing: { color: 'bg-yellow-500', animation: 'animate-bounce' }, idle: { color: 'bg-slate-500', animation: '' } };
  const config = statusConfig[status] || statusConfig.offline;
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} ${config.animation}`} />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
};

// 📊 MOCK DATA (WHITE LABEL - никаких упоминаний внешних сервисов)
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
    { id: 1, type: 'post', account: 'travel_explorer_pro', action: 'Опубликован пост через наш движок', time: '2 мин назад', status: 'success' },
    { id: 2, type: 'account', account: 'food_adventures_daily', action: 'Запущен браузерный профиль', time: '5 мин назад', status: 'success' },
    { id: 3, type: 'automation', account: 'lifestyle_vibes_24', action: 'Автопостинг выполнен успешно', time: '12 мин назад', status: 'success' },
    { id: 4, type: 'error', account: 'tech_innovations_hub', action: 'Ошибка подключения прокси', time: '15 мин назад', status: 'error' }
  ]
};

// 🏠 ГЛАВНОЕ ПРИЛОЖЕНИЕ (WHITE LABEL)
const SocialBotPlatform = () => {
  // Основные состояния
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [globalAutomation, setGlobalAutomation] = useState(false);
  
  // Аутентификация
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Модальные окна
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  const [showAddProxyModal, setShowAddProxyModal] = useState(false);
  const [showPostingSettingsModal, setShowPostingSettingsModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Данные состояния
  const [accounts, setAccounts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    adspowerConnected: false,
    liveduneConnected: false,
    aiServicesActive: false,
    automationQueue: 0
  });
  const [stats, setStats] = useState({
    totalAccounts: 0,
    activeAccounts: 0,
    todayPosts: 0,
    totalReach: 0
  });

  // Функция выхода - УЛУЧШЕННАЯ ВЕРСИЯ с полной очисткой
  const handleLogout = () => {
    console.log('Logout process started');
    
    try {
      // Очищаем ВСЕ данные localStorage
      localStorage.clear();
      
      // Очищаем ВСЕ состояния приложения
      setIsAuthenticated(false);
      setCurrentUser(null);
      setAccounts([]);
      setVideos([]);
      setStats({
        totalAccounts: 0,
        activeAccounts: 0,
        todayPosts: 0,
        totalReach: 0
      });
      setSystemStatus({
        adspowerConnected: false,
        liveduneConnected: false,
        aiServicesActive: false,
        automationQueue: 0
      });
      setLoading(false);
      
      // Принудительно перезагружаем страницу для полной очистки
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      alert('Вы успешно вышли из системы');
      
    } catch (error) {
      console.error('Logout error:', error);
      // В случае ошибки - принудительная перезагрузка
      window.location.reload();
    }
  };

  // Функция проверки токена
  const checkAuthToken = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Можно добавить проверку токена через API
        apiClient.setToken(token);
        setIsAuthenticated(true);
        // TODO: загрузить данные пользователя
      } catch (error) {
        console.error('Invalid token:', error);
        apiClient.removeToken();
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  // Загрузка данных при старте
  useEffect(() => {
    checkAuthToken();
  }, []);

  // Загрузка данных после аутентификации
  useEffect(() => {
    if (isAuthenticated) {
      loadInitialData();
      setupRealTimeUpdates();
    }
  }, [isAuthenticated]);

  // Функция настройки реального времени (заглушка)
  const setupRealTimeUpdates = () => {
    // TODO: Добавить WebSocket или polling для обновлений в реальном времени
    console.log('Setting up real-time updates...');
  };

  // 📊 ЗАГРУЗКА ДАННЫХ (MOCK ВЕРСИЯ - БЕЗ ОШИБОК)
  const loadInitialData = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      console.log('Loading initial data (MOCK mode)');
      
      // MOCK данные для аккаунтов
      const mockAccounts = [
        {
          id: 1,
          username: 'socialbot_demo_1',
          platform: 'INSTAGRAM',
          status: 'ACTIVE',
          postsPerDay: 3,
          followers: 1250,
          lastPost: '2 часа назад'
        },
        {
          id: 2,
          username: 'socialbot_youtube',
          platform: 'YOUTUBE', 
          status: 'ACTIVE',
          postsPerDay: 1,
          followers: 850,
          lastPost: '1 день назад'
        },
        {
          id: 3,
          username: 'demo_tiktok',
          platform: 'TIKTOK',
          status: 'PAUSED',
          postsPerDay: 2,
          followers: 2100,
          lastPost: '3 дня назад'
        }
      ];
      
      setAccounts(mockAccounts);
      
      // MOCK данные для статистики
      setStats({
        totalAccounts: mockAccounts.length,
        activeAccounts: mockAccounts.filter(acc => acc.status === 'ACTIVE').length,
        todayPosts: 15,
        totalReach: 48500
      });
      
      // MOCK статус систем
      setSystemStatus({
        adspowerConnected: true,
        liveduneConnected: false,
        aiServicesActive: true,
        automationQueue: 5
      });
      
      console.log('✅ Initial data loaded successfully (MOCK)');
      
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 ПРОВЕРКА ПОДКЛЮЧЕНИЯ К СЕРВИСАМ (MOCK ВЕРСИЯ)
  const checkServiceConnections = async () => {
    console.log('Checking service connections (MOCK)');
    
    // MOCK проверка без реальных запросов
    setSystemStatus(prev => ({
      ...prev,
      adspowerConnected: Math.random() > 0.5,
      liveduneConnected: Math.random() > 0.5,
      aiServicesActive: Math.random() > 0.5
    }));
  };

  // 📝 СОЗДАНИЕ АККАУНТА (MOCK ВЕРСИЯ)
  const handleBulkCreateAccounts = async (accountData) => {
    try {
      setLoading(true);
      console.log('Creating account (MOCK):', accountData);
      
      // MOCK создание аккаунта
      const newAccount = {
        id: accounts.length + 1,
        username: accountData.username || 'new_account',
        platform: accountData.platform?.toUpperCase() || 'INSTAGRAM',
        status: 'ACTIVE',
        postsPerDay: accountData.postsPerDay || 3,
        followers: Math.floor(Math.random() * 1000),
        lastPost: 'Только что'
      };
      
      // Добавляем к существующим
      setAccounts(prev => [...prev, newAccount]);
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        totalAccounts: prev.totalAccounts + 1,
        activeAccounts: prev.activeAccounts + 1
      }));
      
      alert(`✅ Аккаунт ${newAccount.username} успешно создан! (MOCK режим)`);
      return true;
      
    } catch (error) {
      console.error('Error creating account:', error);
      alert('❌ Ошибка создания аккаунта: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Симуляция реального времени
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        automationQueue: Math.floor(Math.random() * 20) + 5
      }));
    }, 3000);
    
    // Убран handleClickOutside для showUserMenu - теперь не нужен
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // 🔹 МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ АККАУНТА (WHITE LABEL)
  const AddAccountModal = () => {
    const [formData, setFormData] = useState({
      platform: 'INSTAGRAM',
      username: '',
      password: '',
      proxy: '',
      postsPerDay: 3,
      intervalHours: 4
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      if (!formData.username || !formData.password) {
        alert('❌ Заполните обязательные поля');
        return;
      }

      try {
        setLoading(true);
        const success = await handleBulkCreateAccounts(formData);
        if (success) {
          setShowAddAccountModal(false);
          setFormData({
            platform: 'INSTAGRAM',
            username: '',
            password: '',
            proxy: '',
            postsPerDay: 3,
            intervalHours: 4
          });
        }
      } catch (error) {
        console.error('Submit error:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
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
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, platform: 'INSTAGRAM' }))}
                    className={`p-4 border-2 rounded-xl flex items-center gap-3 transition-colors ${
                      formData.platform === 'INSTAGRAM' 
                        ? 'border-pink-500 bg-pink-500/10' 
                        : 'border-slate-600 bg-slate-800 hover:border-pink-500'
                    }`}
                  >
                    <Instagram className="w-6 h-6 text-pink-500" />
                    <span className="text-white font-medium">Instagram</span>
                  </button>
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, platform: 'YOUTUBE' }))}
                    className={`p-4 border-2 rounded-xl flex items-center gap-3 transition-colors ${
                      formData.platform === 'YOUTUBE' 
                        ? 'border-red-500 bg-red-500/10' 
                        : 'border-slate-600 bg-slate-800 hover:border-red-500'
                    }`}
                  >
                    <Youtube className="w-6 h-6 text-red-500" />
                    <span className="text-white font-medium">YouTube</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Имя пользователя *</label>
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="username_example"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Пароль *</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Введите пароль"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Прокси (опционально)</label>
                <input 
                  type="text" 
                  value={formData.proxy}
                  onChange={(e) => setFormData(prev => ({ ...prev, proxy: e.target.value }))}
                  placeholder="IP:PORT:LOGIN:PASSWORD"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Постов в день</label>
                  <input 
                    type="number" 
                    value={formData.postsPerDay}
                    onChange={(e) => setFormData(prev => ({ ...prev, postsPerDay: parseInt(e.target.value) || 3 }))}
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Интервал (часы)</label>
                  <input 
                    type="number" 
                    value={formData.intervalHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, intervalHours: parseInt(e.target.value) || 4 }))}
                    min="1"
                    max="24"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddAccountModal(false)}>
                Отмена
              </Button>
              <Button 
                variant="primary" 
                className="flex-1" 
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                Создать аккаунт
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // 🔹 МОДАЛЬНОЕ ОКНО НАСТРОЕК ПОСТИНГА (WHITE LABEL)
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
                      <p className="text-slate-400 text-sm">Наш алгоритм безопасности</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Ротация прокси</p>
                      <p className="text-slate-400 text-sm">Автоматическая смена IP</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">ИИ-генерация контента</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Умные описания</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Трендовые хештеги</span>
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
              alert('✅ Настройки автопостинга сохранены в нашей системе!');
              setShowPostingSettingsModal(false);
            }}>
              Сохранить настройки
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // 🔹 МЕНЮ ПОЛЬЗОВАТЕЛЯ (WHITE LABEL) - ПОЛНАЯ ЗАМЕНА
  const UserMenu = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Обработчик кликов вне меню
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (isOpen && !event.target.closest('.relative')) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
      <div className="relative">
        {/* Кнопка-триггер для открытия меню */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
          <span className="text-white">Администратор</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Выпадающее меню */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50">
            <div className="p-4 border-b border-slate-600">
              <p className="text-white font-semibold">Администратор</p>
              <p className="text-slate-400 text-sm">{user?.email || 'admin@socialbot.com'}</p>
            </div>
            
            <div className="p-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                Настройки платформы
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <Shield className="w-4 h-4" />
                Безопасность системы
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                <Database className="w-4 h-4" />
                Резервные копии
              </button>
              
              <hr className="my-2 border-slate-600" />
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Выйти из системы
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 📱 АДАПТИВНОЕ МОДАЛЬНОЕ ОКНО
  const ResponsiveModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full sm:max-w-lg bg-slate-800 border border-slate-700 rounded-t-2xl sm:rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
              <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 📱 МОБИЛЬНАЯ ФОРМА ДОБАВЛЕНИЯ АККАУНТА
  const AddAccountModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      platform: 'instagram',
      username: '',
      password: '',
      postsPerDay: 3
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
      // Сброс формы
      setFormData({
        platform: 'instagram',
        username: '',
        password: '',
        postsPerDay: 3
      });
    };

    return (
      <ResponsiveModal isOpen={isOpen} onClose={onClose} title="Добавить аккаунт">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Платформа */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Платформа
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['instagram', 'youtube', 'tiktok'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, platform }))}
                  className={`p-3 rounded-xl border text-center transition-all touch-manipulation ${
                    formData.platform === platform
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className="text-xs font-medium capitalize">{platform}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none text-base touch-manipulation"
              placeholder="your_username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none text-base touch-manipulation"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Posts per day */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Постов в день: {formData.postsPerDay}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.postsPerDay}
              onChange={(e) => setFormData(prev => ({ ...prev, postsPerDay: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium touch-manipulation"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium touch-manipulation"
            >
              Создать
            </button>
          </div>
        </form>
      </ResponsiveModal>
    );
  };

  // 📱 МОБИЛЬНЫЕ КАРТОЧКИ АККАУНТОВ
  const MobileAccountCard = ({ account, onStatusChange }) => {
    const platformColors = {
      INSTAGRAM: 'from-pink-600 to-purple-600',
      YOUTUBE: 'from-red-600 to-red-700',
      TIKTOK: 'from-black to-gray-800'
    };

    const statusColors = {
      ACTIVE: 'text-green-400 bg-green-400/20',
      PAUSED: 'text-yellow-400 bg-yellow-400/20',
      ERROR: 'text-red-400 bg-red-400/20'
    };

    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${platformColors[account.platform]} rounded-lg flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">
                {account.platform.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">{account.username}</h3>
              <p className="text-slate-400 text-xs">{account.platform}</p>
            </div>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[account.status]}`}>
            {account.status === 'ACTIVE' ? 'Активен' : 
             account.status === 'PAUSED' ? 'Пауза' : 'Ошибка'}
          </span>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{account.followers || 0}</div>
            <div className="text-xs text-slate-400">Подписчики</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{account.postsPerDay}</div>
            <div className="text-xs text-slate-400">Постов/день</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">2ч</div>
            <div className="text-xs text-slate-400">Последний</div>
          </div>
        </div>

        {/* Действия */}
        <div className="flex gap-2">
          <button
            onClick={() => onStatusChange(account.id, account.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors touch-manipulation ${
              account.status === 'ACTIVE'
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {account.status === 'ACTIVE' ? 'Пауза' : 'Запустить'}
          </button>
          <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors touch-manipulation">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // 📱 АДАПТИВНЫЕ КНОПКИ БЫСТРЫХ ДЕЙСТВИЙ
  const QuickActions = ({ onAddAccount, onUploadContent, onStartAutomation }) => {
    const actions = [
      {
        title: 'Запустить автопостинг',
        subtitle: 'Активировать все аккаунты',
        icon: Play,
        onClick: onStartAutomation,
        color: 'from-blue-600 to-purple-600',
        primary: true
      },
      {
        title: 'Добавить аккаунт',
        subtitle: 'Новый социальный профиль',
        icon: Plus,
        onClick: onAddAccount,
        color: 'from-green-600 to-emerald-600'
      },
      {
        title: 'Загрузить контент',
        subtitle: 'Видео и изображения',
        icon: Upload,
        onClick: onUploadContent,
        color: 'from-orange-600 to-red-600'
      }
    ];

    return (
      <div className="grid gap-3 sm:gap-4">
        {/* Главная кнопка - на всю ширину */}
        <button
          onClick={actions[0].onClick}
          className={`w-full bg-gradient-to-r ${actions[0].color} hover:scale-[1.02] active:scale-[0.98] text-white p-4 lg:p-6 rounded-xl lg:rounded-2xl transition-all shadow-lg touch-manipulation`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <actions[0].icon className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className="text-left">
              <div className="font-bold text-base lg:text-lg">{actions[0].title}</div>
              <div className="text-sm lg:text-base opacity-90">{actions[0].subtitle}</div>
            </div>
          </div>
        </button>

        {/* Второстепенные кнопки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {actions.slice(1).map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`bg-gradient-to-r ${action.color} hover:scale-[1.02] active:scale-[0.98] text-white p-4 rounded-xl transition-all touch-manipulation`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80">{action.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 📱 СПИСОК АККАУНТОВ
  const AccountsList = ({ accounts, onStatusChange }) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg lg:text-xl font-bold text-white">Аккаунты</h2>
          <button className="lg:hidden bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg touch-manipulation">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {accounts.map((account) => (
            <MobileAccountCard 
              key={account.id} 
              account={account} 
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </div>
    );
  };

  // 📊 АДАПТИВНЫЕ КАРТОЧКИ СТАТИСТИКИ
  const StatsGrid = ({ stats }) => {
    const statsCards = [
      {
        title: 'Всего аккаунтов',
        value: stats.totalAccounts,
        change: '+12%',
        icon: Users,
        color: 'blue'
      },
      {
        title: 'Активные',
        value: stats.activeAccounts,
        change: '+8%',
        icon: Activity,
        color: 'green'
      },
      {
        title: 'Постов сегодня',
        value: stats.todayPosts,
        change: '+24%',
        icon: Video,
        color: 'purple'
      },
      {
        title: 'Общий охват',
        value: stats.totalReach?.toLocaleString() || '0',
        change: '+18%',
        icon: Eye,
        color: 'orange'
      }
    ];

    const colorClasses = {
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      purple: 'from-purple-600 to-purple-700',
      orange: 'from-orange-600 to-orange-700'
    };

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${colorClasses[card.color]} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xs lg:text-sm text-green-400 font-medium">
                {card.change}
              </span>
            </div>
            
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {card.value}
              </p>
              <p className="text-xs lg:text-sm text-slate-400">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 📱 МОБИЛЬНЫЙ HEADER
  const MobileHeader = ({ sidebarOpen, setSidebarOpen, currentUser, onLogout }) => {
    return (
      <header className="lg:hidden bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Кнопка меню */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-700 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Логотип */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold">SocialBot</span>
          </div>

          {/* Пользователь */}
          <UserMenu user={currentUser} onLogout={onLogout} />
        </div>
      </header>
    );
  };

  // 📱 АДАПТИВНОЕ БОКОВОЕ МЕНЮ (MOBILE-FIRST)
  const AdaptiveSidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
    const menuItems = [
      { id: 'dashboard', icon: BarChart3, label: 'Центр управления', count: null },
      { id: 'accounts', icon: Users, label: 'Аккаунты', count: accounts.length },
      { id: 'content', icon: Video, label: 'Контент', count: 3 },
      { id: 'analytics', icon: BarChart3, label: 'Аналитика', badge: 'Pro' },
      { id: 'settings', icon: Settings, label: 'Настройки', count: null }
    ];

    return (
      <>
        {/* Мобильный overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 lg:w-64 xl:w-72
          bg-slate-800 border-r border-slate-700
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">SocialBot</h1>
                <p className="text-xs text-slate-400">Автоматизация</p>
              </div>
            </div>
            
            {/* Мобильная кнопка закрытия */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Навигация */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false); // Закрываем меню на мобильном
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                  ${currentPage === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                
                {item.count && (
                  <span className="ml-auto bg-slate-600 text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
                
                {item.badge && (
                  <span className="ml-auto bg-purple-600 text-xs px-2 py-1 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Автопостинг тумблер */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Автопостинг</span>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${globalAutomation ? 'bg-green-600' : 'bg-slate-600'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${globalAutomation ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                {globalAutomation ? 'Активно • 5 в очереди' : 'Остановлено'}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const navigation = [
    { id: 'dashboard', name: 'Центр управления', icon: BarChart3, badge: null },
    { id: 'accounts', name: 'Аккаунты', icon: Users, badge: accounts.length },
    { id: 'content', name: 'Контент', icon: Video, badge: 3 },
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

  // 👤 КОМПОНЕНТ КАРТОЧКИ АККАУНТА (WHITE LABEL)
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
          <Button variant="ghost" size="sm" onClick={() => alert('🌐 Запуск браузера через наш движок для ' + account.username)}>
            <Globe className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert('🔄 Смена IP через нашу систему для ' + account.username)}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert('⚙️ Настройки аккаунта ' + account.username)}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  // 🎬 КОМПОНЕНТ КАРТОЧКИ ВИДЕО (WHITE LABEL)
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
            ИИ
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
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert('👁️ Предпросмотр видео...')}>
            <Eye className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert('✏️ Редактирование через наш ИИ...')}>
            <Edit className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => alert('🚀 Публикация через нашу систему...')}>
            <Share className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );

  // 📊 DASHBOARD PAGE (WHITE LABEL)
  const DashboardPage = () => (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Всего аккаунтов"
          value={stats.totalAccounts}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          change="+12%"
          trend="up"
          onClick={() => setCurrentPage('accounts')}
        />
        <StatCard
          title="Активно сейчас"
          value={stats.activeAccounts}
          icon={Activity}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          change="+5%"
          trend="up"
        />
        <StatCard
          title="Постов сегодня"
          value={stats.todayPosts}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          change="+23%"
          trend="up"
        />
        <StatCard
          title="Общий охват"
          value="0"
          icon={Eye}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          change="+8%"
          trend="up"
        />
      </div>

      {/* System Status (WHITE LABEL) */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Monitor className="w-6 h-6" />
          Статус наших систем
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatusIndicator status={systemStatus.browserEngine} label="Браузерный движок" />
          <StatusIndicator status={systemStatus.analyticsEngine} label="Система аналитики" />
          <StatusIndicator status={systemStatus.aiGenerator} label="ИИ-генератор" />
          <div className="flex items-center gap-2">
            <Loader className="w-4 h-4 text-blue-400 animate-spin" />
            <span className="text-sm text-slate-300">Очередь: {systemStatus.automationQueue} задач</span>
          </div>
        </div>
      </Card>

      {/* Quick Actions (WHITE LABEL) */}
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
              alert(globalAutomation ? '⏹️ Остановка нашей системы автопостинга...' : '▶️ Запуск нашей системы автопостинга...');
            }}
          >
            {globalAutomation ? 'Остановить автопостинг' : 'Запустить автопостинг'}
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

      {/* Recent Activity (WHITE LABEL) */}
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

  // 👥 ACCOUNTS PAGE (WHITE LABEL)
  const AccountsPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Управление аккаунтами</h1>
          <p className="text-slate-400 mt-1">Полный контроль через нашу браузерную систему</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter}>
            Фильтры
          </Button>
          <Button variant="outline" icon={RefreshCw} onClick={() => alert('🔄 Синхронизация всех профилей через наш движок...')}>
            Синхронизировать
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowAddAccountModal(true)}>
            Добавить аккаунт
          </Button>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.length > 0 ? (
          accounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Нет аккаунтов</h3>
            <p className="text-slate-400 mb-6">Добавьте свой первый аккаунт для начала работы</p>
            <Button variant="primary" icon={Plus} onClick={() => setShowAddAccountModal(true)}>
              Добавить первый аккаунт
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // 🎬 CONTENT PAGE (WHITE LABEL)
  const ContentPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Библиотека контента</h1>
          <p className="text-slate-400 mt-1">Управление видео и ИИ-генерация контента</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Brain} onClick={() => alert('🤖 Запуск нашего ИИ-генератора идей...')}>
            ИИ Идеи
          </Button>
          <Button variant="primary" icon={Upload} onClick={() => alert('📁 Загрузка файлов в нашу систему...')}>
            Загрузить контент
          </Button>
        </div>
      </div>

      {/* AI Generator Panel (WHITE LABEL) */}
      <Card className="p-6" glass>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400" />
          Наш ИИ-генератор контента
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="justify-start p-6 h-auto flex-col items-start gap-2"
            onClick={() => alert('💡 Генерация идей через наш ИИ...')}
          >
            <div className="flex items-center gap-2 text-yellow-400">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Идеи контента</span>
            </div>
            <p className="text-slate-400 text-sm text-left">Генерация вирусных идей нашим ИИ</p>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="justify-start p-6 h-auto flex-col items-start gap-2"
            onClick={() => alert('📝 Генерация описаний через наш ИИ...')}
          >
            <div className="flex items-center gap-2 text-green-400">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Умные описания</span>
            </div>
            <p className="text-slate-400 text-sm text-left">Создание описаний нашим ИИ</p>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="justify-start p-6 h-auto flex-col items-start gap-2"
            onClick={() => alert('🏷️ Генерация хештегов через наш ИИ...')}
          >
            <div className="flex items-center gap-2 text-purple-400">
              <Hash className="w-5 h-5" />
              <span className="font-semibold">Трендовые хештеги</span>
            </div>
            <p className="text-slate-400 text-sm text-left">Подбор хештегов нашим ИИ</p>
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

  // ⚡ AUTOMATION PAGE (WHITE LABEL)
  const AutomationPage = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Автопостинг</h1>
          <p className="text-slate-400 mt-1">Автоматическое размещение через нашу систему</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="danger" 
            icon={AlertCircle}
            onClick={() => {
              setGlobalAutomation(false);
              alert('🛑 Экстренная остановка нашей системы автопостинга!');
            }}
          >
            Остановить все
          </Button>
          <Button variant="primary" icon={Settings} onClick={() => setShowPostingSettingsModal(true)}>
            Настройки системы
          </Button>
        </div>
      </div>

      {/* Главный переключатель (WHITE LABEL) */}
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
            Наша система автопостинга {globalAutomation ? 'активна' : 'остановлена'}
          </h2>
          <p className="text-slate-400 mb-6">
            {globalAutomation 
              ? 'Видео автоматически публикуются через нашу платформу'
              : 'Нажмите для запуска нашей системы автопостинга'
            }
          </p>
          <Button 
            variant={globalAutomation ? "danger" : "success"}
            size="xl"
            icon={globalAutomation ? Pause : Play}
            onClick={() => {
              setGlobalAutomation(!globalAutomation);
              alert(globalAutomation ? '⏹️ Остановка нашей системы...' : '▶️ Запуск нашей системы...');
            }}
          >
            {globalAutomation ? 'Остановить нашу систему' : 'Запустить нашу систему'}
          </Button>
        </div>
      </Card>
    </div>
  );

  // 📊 ANALYTICS PAGE (WHITE LABEL)
  const AnalyticsPage = () => (
    <div className="text-center py-20">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
        <TrendingUp className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">Наша система аналитики</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Подключаем нашу собственную систему аналитики для детального анализа
      </p>
      <Button variant="primary" size="lg" onClick={() => alert('🔧 Настройка нашей системы аналитики...')}>
        Настроить аналитику
      </Button>
    </div>
  );

  // ⚙️ SETTINGS PAGE (WHITE LABEL)
  const SettingsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Настройки платформы</h1>
        <p className="text-slate-400 mt-1">Конфигурация наших систем</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <Card className="p-6" glass>
          <h3 className="font-semibold text-white mb-4">Разделы настроек</h3>
          <nav className="space-y-2">
            {[
              { name: 'Основные', icon: Settings, active: true },
              { name: 'Наши системы', icon: Link },
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

        {/* Settings Content (WHITE LABEL) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6" glass>
            <h3 className="text-lg font-semibold text-white mb-4">Наши системы</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Браузерный движок</p>
                    <p className="text-sm text-slate-400">Наша система управления профилями</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusIndicator status="online" label="Подключен" />
                  <Button variant="outline" size="sm" onClick={() => alert('🧪 Тестирование нашего браузерного движка...')}>
                    Тест
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Система аналитики</p>
                    <p className="text-sm text-slate-400">Наш сбор и анализ метрик</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusIndicator status="syncing" label="Синхронизация" />
                  <Button variant="outline" size="sm" onClick={() => alert('📊 Настройка нашей аналитики...')}>
                    Настроить
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">ИИ-генератор</p>
                    <p className="text-sm text-slate-400">Наша система создания контента</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusIndicator status="online" label="Активен" />
                  <Button variant="outline" size="sm" onClick={() => alert('🤖 Тестирование нашего ИИ...')}>
                    Тест
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6" glass>
            <h3 className="text-lg font-semibold text-white mb-4">Диагностика платформы</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => alert('🔍 Запуск диагностики наших систем...')}>
                <Activity className="w-4 h-4" />
                Диагностика
              </Button>
              <Button variant="outline" onClick={() => alert('💾 Создание резервной копии...')}>
                <Database className="w-4 h-4" />
                Резервная копия
              </Button>
              <Button variant="outline" onClick={() => alert('🧹 Очистка кэша наших систем...')}>
                <RefreshCw className="w-4 h-4" />
                Очистить кэш
              </Button>
              <Button variant="outline" onClick={() => alert('📤 Экспорт настроек платформы...')}>
                <Download className="w-4 h-4" />
                Экспорт настроек
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  // 🔐 КОМПОНЕНТ ВХОДА В СИСТЕМУ
  const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Валидация
      if (!formData.email || !formData.password) {
        alert('Пожалуйста, заполните все поля');
        return;
      }

      if (formData.password.length < 6) {
        alert('Пароль должен быть не менее 6 символов');
        return;
      }

      setLoading(true);

      try {
        let result;
        console.log('Отправляем запрос:', { isLogin, email: formData.email });
        
        if (isLogin) {
          result = await apiClient.login(formData.email, formData.password);
          console.log('Login result:', result);
        } else {
          result = await apiClient.register(formData.email, formData.password);
          console.log('Register result:', result);
        }

        if (result.user && result.token) {
          setCurrentUser(result.user);
          setIsAuthenticated(true);
          alert(`✅ ${isLogin ? 'Вход выполнен' : 'Регистрация прошла'} успешно!`);
        } else {
          throw new Error('Неверный ответ сервера');
        }
        
      } catch (error) {
        console.error('Auth error:', error);
        alert(`❌ Ошибка ${isLogin ? 'входа' : 'регистрации'}: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const toggleMode = () => {
      setIsLogin(!isLogin);
      // Очищаем форму при переключении
      setFormData({ email: '', password: '' });
    };

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8" glass>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SocialBot</h1>
            <p className="text-slate-400">{isLogin ? 'Вход в систему' : 'Создание аккаунта'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Пароль</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Минимум 6 символов"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              disabled={loading || !formData.email || !formData.password}
            >
              {loading ? 'Обработка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={toggleMode}
              disabled={loading}
              className="text-blue-400 hover:text-blue-300 text-sm disabled:opacity-50"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>

          {/* Debug информация в development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-slate-800 rounded-lg text-xs text-slate-400">
              <p>Debug: {isLogin ? 'Login mode' : 'Register mode'}</p>
              <p>Backend: {apiClient.baseURL}</p>
              <p>Form data: {JSON.stringify(formData)}</p>
            </div>
          )}
        </Card>
      </div>
    );
  };

  // 🔄 ЗАГРУЗОЧНЫЙ ЭКРАН
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  // 🔐 ЭКРАН ВХОДА
  if (!isAuthenticated) {
    return <LoginForm onSuccess={(user) => {
      console.log('Login success:', user);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }} />;
  }

  // 📱 Функция для изменения статуса аккаунта
  const handleAccountStatusChange = (accountId, newStatus) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === accountId ? { ...acc, status: newStatus } : acc
    ));
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Мобильный header */}
      <MobileHeader 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex">
        {/* Адаптивное боковое меню */}
        <AdaptiveSidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Основной контент */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-6 xl:p-8">
            {/* Статистика */}
            <StatsGrid stats={stats} />

            {/* Быстрые действия */}
            <div className="mb-6">
              <QuickActions
                onAddAccount={() => setShowAddAccountModal(true)}
                onUploadContent={() => alert('Загрузка контента (в разработке)')}
                onStartAutomation={() => setGlobalAutomation(!globalAutomation)}
              />
            </div>

            {/* Контент страницы */}
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'accounts' && (
              <AccountsList 
                accounts={accounts}
                onStatusChange={handleAccountStatusChange}
              />
            )}
            {currentPage === 'content' && <ContentPage />}
            {currentPage === 'automation' && <AutomationPage />}
            {currentPage === 'analytics' && <AnalyticsPage />}
            {currentPage === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>

      {/* Модальные окна */}
      <AddAccountModal
        isOpen={showAddAccountModal}
        onClose={() => setShowAddAccountModal(false)}
        onSubmit={handleBulkCreateAccounts}
      />
      {showPostingSettingsModal && <PostingSettingsModal />}
    </div>
  );
};

export default SocialBotPlatform; 