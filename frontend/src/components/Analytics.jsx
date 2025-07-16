import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Eye, Heart, 
  Share2, MessageCircle, MapPin, Calendar,
  Filter, Download, RefreshCw, Shield, AlertTriangle,
  Zap, Star, Target, Globe, Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    overview: {
      totalFollowers: 62070,
      followersChange: 8,
      totalReach: 145000,
      reachChange: 12,
      avgEngagement: 5.2,
      engagementChange: 3,
      totalPosts: 156,
      postsChange: 23,
      followersChart: [
        { date: '01', followers: 58000 },
        { date: '05', followers: 59200 },
        { date: '10', followers: 60100 },
        { date: '15', followers: 61000 },
        { date: '20', followers: 61800 },
        { date: '25', followers: 62070 },
        { date: '30', followers: 62070 }
      ],
      engagementChart: [
        { date: '01', engagement: 4.2 },
        { date: '05', engagement: 4.8 },
        { date: '10', engagement: 5.1 },
        { date: '15', engagement: 4.9 },
        { date: '20', engagement: 5.3 },
        { date: '25', engagement: 5.2 },
        { date: '30', engagement: 5.2 }
      ],
      platformStats: [
        { name: 'Instagram', accounts: 2, followers: 28200, reach: 85000, engagement: 4.1 },
        { name: 'YouTube', accounts: 1, followers: 8700, reach: 35000, engagement: 5.8 },
        { name: 'TikTok', accounts: 1, followers: 25100, reach: 25000, engagement: 7.2 }
      ]
    },
    audience: {
      ageGender: [
        { name: '18-24 М', value: 25 },
        { name: '18-24 Ж', value: 35 },
        { name: '25-34 М', value: 15 },
        { name: '25-34 Ж', value: 20 },
        { name: '35+ М', value: 3 },
        { name: '35+ Ж', value: 2 }
      ],
      geography: [
        { name: 'США', percentage: 35, flag: '🇺🇸' },
        { name: 'Канада', percentage: 18, flag: '🇨🇦' },
        { name: 'Великобритания', percentage: 15, flag: '🇬🇧' },
        { name: 'Германия', percentage: 12, flag: '🇩🇪' },
        { name: 'Франция', percentage: 8, flag: '🇫🇷' },
        { name: 'Австралия', percentage: 6, flag: '🇦🇺' },
        { name: 'Россия', percentage: 4, flag: '🇷🇺' },
        { name: 'Другие', percentage: 2, flag: '🌍' }
      ],
      activity: [
        { hour: 0, activity: 15 }, { hour: 1, activity: 8 }, { hour: 2, activity: 5 },
        { hour: 3, activity: 3 }, { hour: 4, activity: 2 }, { hour: 5, activity: 4 },
        { hour: 6, activity: 12 }, { hour: 7, activity: 25 }, { hour: 8, activity: 35 },
        { hour: 9, activity: 45 }, { hour: 10, activity: 50 }, { hour: 11, activity: 55 },
        { hour: 12, activity: 60 }, { hour: 13, activity: 58 }, { hour: 14, activity: 52 },
        { hour: 15, activity: 48 }, { hour: 16, activity: 55 }, { hour: 17, activity: 65 },
        { hour: 18, activity: 85 }, { hour: 19, activity: 92 }, { hour: 20, activity: 88 },
        { hour: 21, activity: 78 }, { hour: 22, activity: 45 }, { hour: 23, activity: 25 }
      ],
      bestHours: ['18:00', '19:00', '20:00']
    },
    content: {
      topContent: [
        { id: 1, title: 'Trending Dance Challenge', account: 'tiktok_dance', platform: 'TikTok', date: '2 дня назад', engagement_rate: 8.5, views: 145000 },
        { id: 2, title: 'Tech Review iPhone 15', account: 'youtube_tech', platform: 'YouTube', date: '1 день назад', engagement_rate: 6.2, views: 89000 },
        { id: 3, title: 'Fashion Outfit Ideas', account: 'instagram_fashion', platform: 'Instagram', date: '3 дня назад', engagement_rate: 4.8, views: 67000 },
        { id: 4, title: 'Quick Recipe Tutorial', account: 'insta_food', platform: 'Instagram', date: '1 день назад', engagement_rate: 4.1, views: 52000 },
        { id: 5, title: 'Morning Motivation', account: 'tiktok_dance', platform: 'TikTok', date: '4 дня назад', engagement_rate: 7.9, views: 48000 }
      ]
    },
    risks: {
      securityScore: 85,
      securityEvents: [
        { type: 'success', message: 'Система безопасности обновила токены доступа', account: 'instagram_fashion', timestamp: '2 минуты назад' },
        { type: 'info', message: 'Автоматическая смена IP-адреса выполнена', account: 'youtube_tech', timestamp: '15 минут назад' },
        { type: 'warning', message: 'Достигнут 80% лимита запросов API', account: 'tiktok_dance', timestamp: '1 час назад', action: 'Настроить' },
        { type: 'success', message: 'Проверка безопасности профилей завершена', timestamp: '2 часа назад' },
        { type: 'info', message: 'Резервное копирование данных выполнено', timestamp: '6 часов назад' }
      ]
    }
  });

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'audience', label: 'Аудитория', icon: Users },
    { id: 'content', label: 'Контент', icon: Eye },
    { id: 'risks', label: 'Безопасность', icon: Shield }
  ];

  const timeRanges = [
    { id: '7days', label: '7 дней' },
    { id: '30days', label: '30 дней' },
    { id: '90days', label: '3 месяца' },
    { id: '1year', label: '1 год' }
  ];

  const loadAnalytics = async () => {
    setLoading(true);
    // Симуляция загрузки
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const exportReport = async () => {
    alert('📊 Отчет экспортируется в PDF...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок с анимацией */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center animate-pulse">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Аналитика и отчеты
          </h1>
          <p className="text-slate-400 mt-1">
            Полный анализ эффективности от ИИ-системы
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Период */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
          
          {/* Обновить */}
          <button
            onClick={loadAnalytics}
            className="p-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-all hover:scale-105"
            title="Обновить данные"
          >
            <RefreshCw className={`w-5 h-5 text-slate-300 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          {/* Экспорт */}
          <button
            onClick={exportReport}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-all transform hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Экспорт отчета
          </button>
        </div>
      </div>

      {/* Навигация по вкладкам с анимацией */}
      <div className="flex gap-1 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all text-sm font-medium transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Контент вкладок */}
      {loading ? (
        <AnalyticsSkeleton />
      ) : (
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab data={data.overview} />}
          {activeTab === 'audience' && <AudienceTab data={data.audience} />}
          {activeTab === 'content' && <ContentTab data={data.content} />}
          {activeTab === 'risks' && <RisksTab data={data.risks} />}
        </div>
      )}
    </div>
  );
};

// Компонент вкладки "Обзор"
const OverviewTab = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Основные KPI с анимацией */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Общие подписчики"
          value={data.totalFollowers?.toLocaleString() || 0}
          change={data.followersChange || 0}
          icon={Users}
          color="from-blue-500 to-cyan-500"
        />
        <KPICard
          title="Общий охват"
          value={`${Math.round((data.totalReach || 0) / 1000)}K`}
          change={data.reachChange || 0}
          icon={Eye}
          color="from-emerald-500 to-teal-500"
        />
        <KPICard
          title="Средний ER"
          value={`${data.avgEngagement || 0}%`}
          change={data.engagementChange || 0}
          icon={Heart}
          color="from-violet-500 to-purple-500"
        />
        <KPICard
          title="Публикаций"
          value={data.totalPosts || 0}
          change={data.postsChange || 0}
          icon={BarChart3}
          color="from-pink-500 to-rose-500"
        />
      </div>

      {/* Платформы с анимацией */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          Статистика по платформам
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(data.platformStats || []).map((platform, index) => (
            <div key={platform.name} className="bg-slate-700/30 rounded-xl p-4 hover:bg-slate-700/50 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-white">{platform.name}</span>
                <span className="text-sm text-slate-400">{platform.accounts} аккаунтов</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Подписчики:</span>
                  <span className="text-white font-medium">{platform.followers?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Охват:</span>
                  <span className="text-white font-medium">{platform.reach?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">ER:</span>
                  <span className="text-emerald-400 font-medium">{platform.engagement}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент вкладки "Аудитория"
const AudienceTab = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* География с анимацией */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            География аудитории
          </h3>
          <div className="space-y-3">
            {(data.geography || []).slice(0, 8).map((country, index) => (
              <div key={country.name} className="flex items-center justify-between hover:bg-slate-700/30 rounded-lg p-2 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-slate-300">{country.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(country.percentage / (data.geography[0]?.percentage || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-medium w-12 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Активность по времени */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Активность аудитории по часам
        </h3>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
          <div className="flex items-center gap-2 text-blue-200">
            <Target className="w-4 h-4" />
            <span className="text-sm">
              <strong>Рекомендация ИИ:</strong> Лучшее время для публикации - 
              {(data.bestHours || []).join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент вкладки "Контент"
const ContentTab = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Топ контент */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Топ-10 самых эффективных публикаций
        </h3>
        <div className="space-y-3">
          {(data.topContent || []).map((post, index) => (
            <div key={post.id} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all group hover:scale-[1.02]">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-slate-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white truncate">
                  {post.title || 'Без названия'}
                </h4>
                <p className="text-sm text-slate-400">
                  @{post.account} • {post.platform} • {post.date}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-400 animate-pulse">
                  {post.engagement_rate}%
                </div>
                <div className="text-sm text-slate-400">
                  {post.views?.toLocaleString()} просмотров
                </div>
              </div>
              
              <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
                <Eye className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент вкладки "Безопасность"
const RisksTab = ({ data }) => {
  const securityScore = data.securityScore || 85;
  const events = data.securityEvents || [];
  
  return (
    <div className="space-y-6">
      {/* Общая безопасность */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Общая безопасность системы
            </h3>
            
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-2xl font-bold text-white">{securityScore}</div>
                  <div className="text-xs text-slate-400">из 100</div>
                </div>
              </div>
            </div>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              securityScore >= 80 ? 'bg-emerald-500/20 text-emerald-300' :
              securityScore >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              <Shield className="w-4 h-4" />
              {securityScore >= 80 ? 'Отличная защита' :
               securityScore >= 60 ? 'Хорошая защита' : 'Требует внимания'}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Статус компонентов системы
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Система безопасности профилей', status: 'healthy', details: 'Все профили защищены' },
                { name: 'Сетевая защита', status: 'healthy', details: 'Безопасные соединения активны' },
                { name: 'API подключения', status: 'warning', details: 'Instagram: лимит 80%' },
                { name: 'Мониторинг активности', status: 'healthy', details: 'Автоматический контроль активен' },
              ].map(component => (
                <div key={component.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      component.status === 'healthy' ? 'bg-emerald-500' :
                      component.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <div className="font-medium text-white">{component.name}</div>
                      <div className="text-sm text-slate-400">{component.details}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    component.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-300' :
                    component.status === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {component.status === 'healthy' ? 'Работает' :
                     component.status === 'warning' ? 'Внимание' : 'Ошибка'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Журнал событий */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Журнал событий безопасности
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                event.type === 'success' ? 'bg-emerald-500/20' :
                event.type === 'warning' ? 'bg-yellow-500/20' :
                event.type === 'error' ? 'bg-red-500/20' : 'bg-blue-500/20'
              }`}>
                {event.type === 'success' ? <Shield className="w-4 h-4 text-emerald-400" /> :
                 event.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-400" /> :
                 event.type === 'error' ? <AlertTriangle className="w-4 h-4 text-red-400" /> :
                 <Shield className="w-4 h-4 text-blue-400" />}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-white">{event.message}</div>
                <div className="text-sm text-slate-400">
                  {event.account && `@${event.account} • `}
                  {event.timestamp}
                </div>
              </div>
              
              {event.action && (
                <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  {event.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент KPI карточки
const KPICard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all hover:scale-[1.02]">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`text-sm font-medium animate-pulse ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </div>
    </div>
    
    <div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </div>
  </div>
);

// Скелетон загрузки
const AnalyticsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 bg-slate-700 rounded-2xl" />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="h-80 bg-slate-700 rounded-2xl" />
      <div className="h-80 bg-slate-700 rounded-2xl" />
    </div>
  </div>
);

export default Analytics; 