import React, { useState, useEffect } from 'react';
import { 
  Plus, Play, Pause, MoreVertical, Shield, Wifi, 
  Instagram, Youtube, Heart, Eye, Users, Settings,
  Trash2, RefreshCw, Download, AlertCircle, CheckCircle,
  Zap, TrendingUp, Clock, MapPin
} from 'lucide-react';

const AccountsManager = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: 'demo_instagram_fashion',
      platform: 'INSTAGRAM',
      status: 'ACTIVE',
      followers: '15.4K',
      postsToday: 4,
      engagement: 3.2,
      location: 'USA',
      securityScore: 85,
      lastPost: '2 часа назад'
    },
    {
      id: 2,
      username: 'demo_youtube_tech',
      platform: 'YOUTUBE',
      status: 'ACTIVE',
      followers: '8.7K',
      postsToday: 1,
      engagement: 5.8,
      location: 'Canada',
      securityScore: 92,
      lastPost: '1 день назад'
    },
    {
      id: 3,
      username: 'demo_tiktok_dance',
      platform: 'TIKTOK',
      status: 'PAUSED',
      followers: '25.1K',
      postsToday: 0,
      engagement: 7.2,
      location: 'UK',
      securityScore: 78,
      lastPost: '3 дня назад'
    },
    {
      id: 4,
      username: 'demo_insta_food',
      platform: 'INSTAGRAM',
      status: 'ACTIVE',
      followers: '12.8K',
      postsToday: 2,
      engagement: 4.1,
      location: 'USA',
      securityScore: 88,
      lastPost: '5 часов назад'
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAccountAction = async (accountId, action) => {
    const account = accounts.find(a => a.id === accountId);
    
    switch (action) {
      case 'start':
        setAccounts(prev => prev.map(a => 
          a.id === accountId ? { ...a, status: 'ACTIVE' } : a
        ));
        alert('🚀 Аккаунт запущен! Система автоматизации активирована.');
        break;
      case 'pause':
        setAccounts(prev => prev.map(a => 
          a.id === accountId ? { ...a, status: 'PAUSED' } : a
        ));
        alert('⏸️ Автоматизация приостановлена для аккаунта.');
        break;
      case 'refresh':
        alert('🔄 Данные аккаунта обновлены системой безопасности.');
        break;
      case 'delete':
        if (confirm('Удалить аккаунт из системы управления?')) {
          setAccounts(prev => prev.filter(a => a.id !== accountId));
          alert('🗑️ Аккаунт удален из системы.');
        }
        break;
      default:
        break;
    }
  };

  const filteredAccounts = accounts.filter(account => 
    filter === 'all' || account.platform.toLowerCase() === filter
  );

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок с анимацией */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
              <Users className="w-6 h-6 text-white" />
            </div>
            Управление аккаунтами
          </h1>
          <p className="text-slate-400 mt-1">
            {accounts.length} аккаунтов под управлением ИИ-системы
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Добавить аккаунт
        </button>
      </div>

      {/* Фильтры с анимацией */}
      <div className="flex gap-3">
        {[
          { key: 'all', label: 'Все платформы', count: accounts.length },
          { key: 'instagram', label: 'Instagram', count: accounts.filter(a => a.platform === 'INSTAGRAM').length },
          { key: 'youtube', label: 'YouTube', count: accounts.filter(a => a.platform === 'YOUTUBE').length },
          { key: 'tiktok', label: 'TikTok', count: accounts.filter(a => a.platform === 'TIKTOK').length }
        ].map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
              filter === filterOption.key
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>

      {/* Сетка аккаунтов с анимацией */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAccounts.map(account => (
          <AccountCard
            key={account.id}
            account={account}
            onAction={handleAccountAction}
          />
        ))}
      </div>

      {/* Модал добавления */}
      {showAddModal && (
        <AddAccountModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            alert('✅ Аккаунт успешно добавлен в систему!');
          }}
        />
      )}
    </div>
  );
};

// Карточка аккаунта с живой анимацией
const AccountCard = ({ account, onAction }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPlatformIcon = () => {
    switch (account.platform) {
      case 'INSTAGRAM': 
        return <Instagram className="w-4 h-4 text-pink-400 animate-pulse" />;
      case 'YOUTUBE': 
        return <Youtube className="w-4 h-4 text-red-400 animate-pulse" />;
      case 'TIKTOK': 
        return <Heart className="w-4 h-4 text-white animate-pulse" />;
      default: 
        return <Users className="w-4 h-4 text-blue-400 animate-pulse" />;
    }
  };

  const getStatusColor = () => {
    switch (account.status) {
      case 'ACTIVE': return 'bg-emerald-500';
      case 'PAUSED': return 'bg-yellow-500';
      case 'ERROR': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusText = () => {
    switch (account.status) {
      case 'ACTIVE': return 'Активен';
      case 'PAUSED': return 'Пауза';
      case 'ERROR': return 'Ошибка';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all group hover:scale-[1.02] hover:shadow-xl">
      {/* Заголовок карточки */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-lg font-bold text-white">
              {account.username?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
          
          <div>
            <div className="font-semibold text-white">@{account.username}</div>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              {getPlatformIcon()}
              <span className="capitalize">{account.platform?.toLowerCase()}</span>
            </div>
          </div>
        </div>

        {/* Меню действий */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-10 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 min-w-[160px]">
              <button
                onClick={() => {
                  onAction(account.id, 'refresh');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 first:rounded-t-lg"
              >
                <RefreshCw className="w-4 h-4" />
                Обновить данные
              </button>
              <button
                onClick={() => {
                  alert('📊 Настройки лимитов открыты');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                <Settings className="w-4 h-4" />
                Настройки лимитов
              </button>
              <hr className="border-slate-700" />
              <button
                onClick={() => {
                  onAction(account.id, 'delete');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 last:rounded-b-lg"
              >
                <Trash2 className="w-4 h-4" />
                Удалить аккаунт
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Статус и безопасность */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`} />
            <span className="text-sm text-slate-300">{getStatusText()}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">{account.location}</span>
          </div>
        </div>

        {/* Шкала безопасности с анимацией */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-400">Безопасность системы</span>
            <span className="text-white font-medium">{account.securityScore}/100</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${
                account.securityScore >= 80 ? 'bg-emerald-500' :
                account.securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${account.securityScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Статистика с анимацией */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-slate-700/30 rounded-lg p-2 hover:bg-slate-700/50 transition-all">
          <div className="text-lg font-bold text-white">{account.followers}</div>
          <div className="text-xs text-slate-400">Подписчики</div>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-2 hover:bg-slate-700/50 transition-all">
          <div className="text-lg font-bold text-white">{account.postsToday}</div>
          <div className="text-xs text-slate-400">Постов/день</div>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-2 hover:bg-slate-700/50 transition-all">
          <div className="text-lg font-bold text-white">{account.engagement}%</div>
          <div className="text-xs text-slate-400">Вовлечение</div>
        </div>
      </div>

      {/* Кнопки управления */}
      <div className="flex gap-2">
        {account.status === 'ACTIVE' ? (
          <button
            onClick={() => onAction(account.id, 'pause')}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 py-2 rounded-lg transition-all transform hover:scale-105"
          >
            <Pause className="w-4 h-4" />
            <span className="text-sm font-medium">Пауза</span>
          </button>
        ) : (
          <button
            onClick={() => onAction(account.id, 'start')}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 py-2 rounded-lg transition-all transform hover:scale-105"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Запустить</span>
          </button>
        )}
      </div>

      {/* Последняя активность */}
      <div className="mt-3 pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Последний пост:</span>
          <span>{account.lastPost}</span>
        </div>
      </div>
    </div>
  );
};

// Модал добавления аккаунта
const AddAccountModal = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [loading, setLoading] = useState(false);

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram Business',
      icon: <Instagram className="w-8 h-8" />,
      description: 'Reels, Stories, обычные посты',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'youtube',
      name: 'YouTube Channel',
      icon: <Youtube className="w-8 h-8" />,
      description: 'Shorts и длинные видео',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'tiktok',
      name: 'TikTok Creator',
      icon: <Heart className="w-8 h-8" />,
      description: 'Короткие вертикальные видео',
      color: 'from-slate-800 to-slate-900'
    }
  ];

  const handleConnect = async () => {
    setLoading(true);
    // Симуляция подключения
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Добавить аккаунт</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-slate-300 mb-4">Выберите платформу для подключения:</p>
            
            {platforms.map(platform => (
              <button
                key={platform.id}
                onClick={() => {
                  setSelectedPlatform(platform.id);
                  setStep(2);
                }}
                className="w-full p-4 border border-slate-600 rounded-xl hover:border-slate-500 hover:bg-slate-700/50 transition-all text-left transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center text-white`}>
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{platform.name}</div>
                    <div className="text-sm text-slate-400">{platform.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Безопасное подключение
              </h3>
              <p className="text-slate-300 text-sm">
                Система безопасности SocialBot использует официальные API. 
                Ваши данные защищены и не передаются третьим лицам.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleConnect}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all"
              >
                {loading ? 'Подключаем...' : `Подключить ${platforms.find(p => p.id === selectedPlatform)?.name}`}
              </button>
              
              <button
                onClick={() => setStep(1)}
                className="w-full text-slate-400 hover:text-white py-2 transition-colors"
              >
                ← Назад
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsManager; 