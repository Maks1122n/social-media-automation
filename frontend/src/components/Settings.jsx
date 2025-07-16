import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Save, Check, X, 
  Key, Bell, Users, Shield, Zap, Globe,
  Mail, MessageCircle, Slack, Eye, EyeOff,
  Plus, Trash2, Edit, RefreshCw
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('publishing');
  const [settings, setSettings] = useState({
    publishing: {
      dailyLimit: 30,
      randomOffset: 15,
      minInterval: 120,
      autoSchedule: true
    },
    integrations: {
      instagram: { connected: true, status: 'healthy' },
      youtube: { connected: true, status: 'healthy' },
      tiktok: { connected: false, status: 'disconnected' },
      ai: { connected: true, status: 'healthy', usage: 78 }
    },
    notifications: {
      email: true,
      telegram: false,
      slack: false,
      types: {
        success: true,
        errors: true,
        limits: true,
        updates: false
      }
    },
    team: [
      { id: 1, name: 'Demo User', email: 'demo@socialbot.com', role: 'Admin', avatar: 'D' },
      { id: 2, name: 'Manager', email: 'manager@socialbot.com', role: 'Manager', avatar: 'M' }
    ]
  });
  
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState({});

  const sections = [
    { id: 'publishing', label: 'Публикации', icon: Zap },
    { id: 'integrations', label: 'Интеграции', icon: Globe },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'team', label: 'Команда', icon: Users },
    { id: 'security', label: 'Безопасность', icon: Shield }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Симуляция сохранения
    setTimeout(() => {
      setSaving(false);
      alert('✅ Настройки успешно сохранены!');
    }, 1000);
  };

  const testConnection = async (service) => {
    alert(`🔄 Проверка подключения ${service}...`);
    setTimeout(() => {
      alert(`✅ Подключение ${service} работает корректно!`);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center animate-pulse">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            Настройки системы
          </h1>
          <p className="text-slate-400 mt-1">
            Конфигурация и управление SocialBot
          </p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Сохранить изменения
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Навигация */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 space-y-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Контент */}
        <div className="lg:col-span-3">
          {activeSection === 'publishing' && <PublishingSection settings={settings} setSettings={setSettings} />}
          {activeSection === 'integrations' && <IntegrationsSection settings={settings} setSettings={setSettings} testConnection={testConnection} />}
          {activeSection === 'notifications' && <NotificationsSection settings={settings} setSettings={setSettings} />}
          {activeSection === 'team' && <TeamSection settings={settings} setSettings={setSettings} />}
          {activeSection === 'security' && <SecuritySection />}
        </div>
      </div>
    </div>
  );
};

// Секция публикаций
const PublishingSection = ({ settings, setSettings }) => {
  const updatePublishingSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      publishing: { ...prev.publishing, [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          Настройки публикации
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Лимит постов в день
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={settings.publishing.dailyLimit}
              onChange={(e) => updatePublishingSettings('dailyLimit', parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              Максимальное количество постов в день для безопасности
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Случайное смещение (минуты)
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={settings.publishing.randomOffset}
              onChange={(e) => updatePublishingSettings('randomOffset', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0 мин</span>
              <span className="font-medium">±{settings.publishing.randomOffset} мин</span>
              <span>60 мин</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Минимальный интервал между постами (минуты)
            </label>
            <input
              type="number"
              min="30"
              max="1440"
              value={settings.publishing.minInterval}
              onChange={(e) => updatePublishingSettings('minInterval', parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Автоматическое планирование</div>
              <div className="text-sm text-slate-400">ИИ-система сама выберет лучшее время</div>
            </div>
            <button
              onClick={() => updatePublishingSettings('autoSchedule', !settings.publishing.autoSchedule)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.publishing.autoSchedule ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                settings.publishing.autoSchedule ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Секция интеграций
const IntegrationsSection = ({ settings, setSettings, testConnection }) => {
  const [showKeys, setShowKeys] = useState({});

  const integrations = [
    { id: 'instagram', name: 'Instagram Business', icon: '📸', color: 'from-pink-500 to-rose-500' },
    { id: 'youtube', name: 'YouTube Channel', icon: '🎥', color: 'from-red-500 to-red-600' },
    { id: 'tiktok', name: 'TikTok Creator', icon: '🎵', color: 'from-slate-800 to-slate-900' },
    { id: 'ai', name: 'ИИ-система', icon: '🤖', color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          Подключенные сервисы
        </h3>
        
        <div className="space-y-4">
          {integrations.map(integration => {
            const config = settings.integrations[integration.id];
            return (
              <div key={integration.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${integration.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                    {integration.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">{integration.name}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        config?.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'
                      }`} />
                      <span className="text-slate-400">
                        {config?.connected ? 'Подключено' : 'Отключено'}
                      </span>
                      {integration.id === 'ai' && config?.connected && (
                        <span className="text-slate-400">• Использовано: {config.usage}%</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => testConnection(integration.name)}
                    className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                    title="Проверить подключение"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-300" />
                  </button>
                  
                  {config?.connected ? (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Активно</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-400">
                      <X className="w-4 h-4" />
                      <span className="text-sm">Отключено</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Секция уведомлений
const NotificationsSection = ({ settings, setSettings }) => {
  const updateNotificationSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const updateNotificationTypes = (type, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        types: { ...prev.notifications.types, [type]: value }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-400" />
          Каналы уведомлений
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-medium text-white">Email</div>
                <div className="text-sm text-slate-400">Уведомления на почту</div>
              </div>
            </div>
            <button
              onClick={() => updateNotificationSettings('email', !settings.notifications.email)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                settings.notifications.email ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                settings.notifications.email ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-medium text-white">Telegram</div>
                <div className="text-sm text-slate-400">Мгновенные уведомления</div>
              </div>
            </div>
            <button
              onClick={() => updateNotificationSettings('telegram', !settings.notifications.telegram)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                settings.notifications.telegram ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                settings.notifications.telegram ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Slack className="w-5 h-5 text-purple-400" />
              <div>
                <div className="font-medium text-white">Slack</div>
                <div className="text-sm text-slate-400">Командные уведомления</div>
              </div>
            </div>
            <button
              onClick={() => updateNotificationSettings('slack', !settings.notifications.slack)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                settings.notifications.slack ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                settings.notifications.slack ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Типы уведомлений
        </h3>
        
        <div className="space-y-3">
          {[
            { key: 'success', label: 'Успешные публикации', icon: Check, color: 'text-emerald-400' },
            { key: 'errors', label: 'Ошибки и проблемы', icon: X, color: 'text-red-400' },
            { key: 'limits', label: 'Лимиты и ограничения', icon: Shield, color: 'text-yellow-400' },
            { key: 'updates', label: 'Обновления системы', icon: RefreshCw, color: 'text-blue-400' }
          ].map(type => {
            const Icon = type.icon;
            return (
              <div key={type.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${type.color}`} />
                  <span className="text-white">{type.label}</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.types[type.key]}
                  onChange={(e) => updateNotificationTypes(type.key, e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded border-slate-600 bg-slate-700 focus:ring-blue-500"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Секция команды
const TeamSection = ({ settings, setSettings }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    if (inviteEmail) {
      alert(`✉️ Приглашение отправлено на ${inviteEmail}`);
      setInviteEmail('');
      setShowInviteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Участники команды
          </h3>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Пригласить
          </button>
        </div>
        
        <div className="space-y-3">
          {settings.team.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {member.avatar}
                </div>
                <div>
                  <div className="font-medium text-white">{member.name}</div>
                  <div className="text-sm text-slate-400">{member.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs ${
                  member.role === 'Admin' ? 'bg-red-500/20 text-red-300' :
                  member.role === 'Manager' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-slate-500/20 text-slate-300'
                }`}>
                  {member.role}
                </div>
                
                <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-slate-400" />
                </button>
                
                {member.role !== 'Admin' && (
                  <button className="p-2 hover:bg-red-600/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модал приглашения */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Пригласить участника</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email адрес
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleInvite}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Отправить приглашение
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Секция безопасности
const SecuritySection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Безопасность системы
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="font-medium text-white">Система защиты активна</div>
                <div className="text-sm text-emerald-300">Все компоненты работают корректно</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-medium text-white mb-2">Защищенные соединения</div>
              <div className="text-sm text-slate-400">SSL/TLS шифрование для всех API</div>
            </div>
            
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-medium text-white mb-2">Мониторинг активности</div>
              <div className="text-sm text-slate-400">24/7 контроль всех операций</div>
            </div>
            
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-medium text-white mb-2">Резервное копирование</div>
              <div className="text-sm text-slate-400">Автоматическое сохранение данных</div>
            </div>
            
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-medium text-white mb-2">Обновления безопасности</div>
              <div className="text-sm text-slate-400">Регулярные патчи и улучшения</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
