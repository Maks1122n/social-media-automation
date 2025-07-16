// 🎨 RENDER FORCE DEPLOY - Modern SocialBot Interface
import React, { useState, useEffect } from 'react';
import { 
  Activity, TrendingUp, Users, Zap, Eye, Calendar, 
  Play, ArrowRight, Star, Lightbulb, BarChart3,
  Shield, CheckCircle, AlertTriangle, Clock, Instagram,
  Youtube, Heart, Sparkles, Target, Upload, Settings
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProfiles: 4,
    activeSessions: 3,
    postsToday: 28,
    weeklyReach: 62070
  });
  
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [aiTip, setAiTip] = useState('');
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccounts, setActiveAccounts] = useState([
    { id: 1, name: 'demo_instagram_fashion', platform: 'INSTAGRAM', status: 'active' },
    { id: 2, name: 'demo_youtube_tech', platform: 'YOUTUBE', status: 'active' },
    { id: 3, name: 'demo_tiktok_dance', platform: 'TIKTOK', status: 'active' },
    { id: 4, name: 'demo_insta_food', platform: 'INSTAGRAM', status: 'active' }
  ]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Симуляция загрузки данных
      setTodaySchedule([
        { time: '09:00', status: 'published', content: 'Morning_motivation.mp4', account: 'instagram_fashion' },
        { time: '14:00', status: 'scheduled', content: 'Lunch_recipe.mp4', account: 'insta_food' },
        { time: '18:00', status: 'scheduled', content: 'Evening_workout.mp4', account: 'tiktok_dance' },
        { time: '21:00', status: 'scheduled', content: 'Tech_review.mp4', account: 'youtube_tech' }
      ]);
      
      setAiTip('Ваша аудитория наиболее активна в 18:00-21:00. Рекомендуем перенести 2 поста на это время для увеличения охвата на 23%');
      
      setTopPosts([
        { id: 1, title: 'Trending Dance Challenge', account: 'tiktok_dance', platform: 'TikTok', engagement_rate: 8.5, views: '145K' },
        { id: 2, title: 'Tech Review iPhone 15', account: 'youtube_tech', platform: 'YouTube', engagement_rate: 6.2, views: '89K' },
        { id: 3, title: 'Fashion Outfit Ideas', account: 'instagram_fashion', platform: 'Instagram', engagement_rate: 4.8, views: '67K' }
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addAccount':
        // Перенаправление на страницу добавления аккаунта
        window.location.href = '/accounts';
        break;
      case 'uploadContent':
        // Перенаправление на страницу контента
        window.location.href = '/content';
        break;
      case 'setupTargeting':
        // Перенаправление на настройки
        window.location.href = '/settings';
        break;
      default:
        break;
    }
  };

  const applyAiTip = async () => {
    alert('✨ Совет от ИИ-системы применен! Расписание оптимизировано для максимального охвата.');
    loadDashboardData();
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок с живой анимацией */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
              <Activity className="w-6 h-6 text-white" />
            </div>
            Центр управления
          </h1>
          <p className="text-slate-400 mt-1">Полный контроль над вашей социальной империей</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">SocialBot Engine активен</span>
        </div>
      </div>

      {/* Основные метрики с анимацией */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Всего аккаунтов"
          value={stats.totalProfiles}
          change="+12%"
          color="from-blue-500 to-cyan-500"
          icon={Users}
          subtitle="Под управлением ИИ"
        />
        <MetricCard
          title="Активно сейчас"
          value={stats.activeSessions}
          change="live"
          color="from-emerald-500 to-teal-500"
          icon={Activity}
          subtitle="Автоматизация работает"
        />
        <MetricCard
          title="Постов сегодня"
          value={stats.postsToday}
          change="+23%"
          color="from-violet-500 to-purple-500"
          icon={TrendingUp}
          subtitle="Опубликовано системой"
        />
        <MetricCard
          title="Общий охват"
          value={`${Math.round(stats.weeklyReach / 1000)}K`}
          change="+8%"
          color="from-pink-500 to-rose-500"
          icon={Eye}
          subtitle="Уникальных просмотров"
        />
      </div>

      {/* Быстрые действия с анимированными иконками */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Добавить аккаунт"
          subtitle="Новый социальный профиль"
          icon={Users}
          color="from-blue-500 to-purple-600"
          onClick={() => handleQuickAction('addAccount')}
        />
        <QuickActionCard
          title="Загрузить контент"
          subtitle="Видео и изображения"
          icon={Upload}
          color="from-emerald-500 to-teal-600"
          onClick={() => handleQuickAction('uploadContent')}
        />
        <QuickActionCard
          title="Настроить таргетинг"
          subtitle="Аудитория и расписание"
          icon={Target}
          color="from-orange-500 to-red-600"
          onClick={() => handleQuickAction('setupTargeting')}
        />
      </div>

      {/* Активные аккаунты с живыми иконками */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Активные аккаунты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeAccounts.map((account) => (
            <ActiveAccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ИИ Совет с анимацией */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 animate-bounce">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  Совет от ИИ-аналитика
                </h3>
                <p className="text-slate-300 mb-4">
                  {aiTip}
                </p>
                <button
                  onClick={applyAiTip}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Применить в расписании
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Топ-посты с живой анимацией */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            Топ-посты недели
          </h3>
          
          <div className="space-y-3">
            {topPosts.map((post, index) => (
              <TopPostCard key={post.id} post={post} rank={index + 1} />
            ))}
          </div>
          
          <button className="w-full mt-4 text-center text-slate-400 hover:text-white transition-colors text-sm">
            Посмотреть всю аналитику →
          </button>
        </div>
      </div>
    </div>
  );
};

// Компонент метрики с анимацией
const MetricCard = ({ title, value, change, color, icon: Icon, subtitle }) => (
  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all hover:scale-[1.02] group">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {change === 'live' ? (
        <div className="flex items-center gap-1 text-emerald-400">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium">LIVE</span>
        </div>
      ) : (
        <span className="text-emerald-400 text-sm font-medium animate-pulse">{change}</span>
      )}
    </div>
    
    <div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{subtitle}</div>
    </div>
  </div>
);

// Компонент быстрого действия с анимацией
const QuickActionCard = ({ title, subtitle, icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 bg-gradient-to-r ${color} rounded-xl text-white font-semibold transition-all hover:scale-105 transform hover:shadow-lg group`}
  >
    <div className="flex items-center justify-between">
      <div className="text-left">
        <div className="font-semibold">{title}</div>
        <div className="text-sm opacity-90">{subtitle}</div>
      </div>
      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </div>
  </button>
);

// Карточка активного аккаунта с анимированными иконками
const ActiveAccountCard = ({ account }) => {
  const getPlatformIcon = () => {
    switch (account.platform) {
      case 'INSTAGRAM': 
        return <Instagram className="w-5 h-5 text-pink-400 animate-pulse" />;
      case 'YOUTUBE': 
        return <Youtube className="w-5 h-5 text-red-400 animate-pulse" />;
      case 'TIKTOK': 
        return <Heart className="w-5 h-5 text-white animate-pulse" />;
      default: 
        return <Users className="w-5 h-5 text-blue-400 animate-pulse" />;
    }
  };

  return (
    <div className="bg-slate-700/30 rounded-xl p-4 hover:bg-slate-700/50 transition-all group">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          {getPlatformIcon()}
        </div>
        <div className="flex-1">
          <div className="font-medium text-white text-sm">{account.name}</div>
          <div className="text-xs text-slate-400 capitalize">{account.platform.toLowerCase()}</div>
        </div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

// Карточка топ-поста с анимацией
const TopPostCard = ({ post, rank }) => (
  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all cursor-pointer group">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
        {rank}
      </div>
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-white truncate">
        {post.title}
      </div>
      <div className="text-xs text-slate-400">
        @{post.account} • {post.platform}
      </div>
    </div>
    
    <div className="text-right">
      <div className="text-sm font-bold text-emerald-400 animate-pulse">
        ER {post.engagement_rate}%
      </div>
      <div className="text-xs text-slate-400">
        {post.views} просмотров
      </div>
    </div>
  </div>
);

// Скелетон загрузки
const DashboardSkeleton = () => (
  <div className="p-6 space-y-6 animate-pulse">
    <div className="h-8 bg-slate-700 rounded w-1/3" />
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 bg-slate-700 rounded-2xl" />
      ))}
    </div>
    <div className="h-64 bg-slate-700 rounded-2xl" />
  </div>
);

export default Dashboard; 