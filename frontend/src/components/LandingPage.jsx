import React, { useState } from 'react';
import { Activity, Play, Users, Zap, Shield, TrendingUp, ArrowRight, Eye, Star } from 'lucide-react';

const LandingPage = ({ onLogin, onDemo }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' или 'register'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onLogin(formData.email, formData.password, authMode === 'register');
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* МОБИЛЬНАЯ ВЕРСИЯ */}
        <div className="lg:hidden">
          <div className="p-6 pt-12">
            {/* Мобильный hero */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse-slow">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                SocialBot
              </h1>
              <p className="text-lg text-blue-200/80 mb-6">Автоматизация социальных медиа</p>
              
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                Автоматизируйте
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}постинг{" "}
                </span>
                в соцсетях
              </h2>
              
              <p className="text-lg text-slate-300 mb-6">
                ИИ создает контент, система публикует автоматически
              </p>

              {/* Мобильные особенности */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Zap, text: 'ИИ-контент' },
                  { icon: Users, text: '100+ аккаунтов' },
                  { icon: Shield, text: 'Безопасно' },
                  { icon: TrendingUp, text: 'Быстрый рост' }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                    style={{ 
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <span className="text-sm text-slate-200 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Социальные доказательства */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-slate-900" />
                    ))}
                  </div>
                  <span className="text-slate-300 text-sm">2,500+ пользователей</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-slate-300 text-sm">4.9/5</span>
                </div>
              </div>

              {/* Мобильная CTA кнопка */}
              <button
                onClick={onDemo}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold text-lg mb-6 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl"
              >
                <Play className="w-5 h-5" />
                Попробовать демо
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Мобильная форма */}
            <AuthCard 
              authMode={authMode}
              setAuthMode={setAuthMode}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>

        {/* DESKTOP ВЕРСИЯ */}
        <div className="hidden lg:flex min-h-screen">
          {/* ЛЕВАЯ ЧАСТЬ - HERO БЛОК */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="max-w-2xl">
              {/* Логотип и название */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    SocialBot
                  </h1>
                  <p className="text-lg text-blue-200/80">Автоматизация социальных медиа</p>
                </div>
              </div>

              {/* Главный заголовок */}
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Автоматизируйте
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}постинг{" "}
                </span>
                в соцсетях
              </h2>

              {/* Описание */}
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Управляйте десятками аккаунтов Instagram, YouTube и TikTok из одного интерфейса. 
                ИИ создает контент, система публикует автоматически, вы получаете результат.
              </p>

              {/* Особенности */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Zap, text: 'ИИ-генерация контента' },
                  { icon: Users, text: 'Управление 100+ аккаунтами' },
                  { icon: Shield, text: 'Безопасная автоматизация' },
                  { icon: TrendingUp, text: 'Рост в 10 раз быстрее' }
                ].map((feature, index) => (
                  <AnimatedFeature key={index} feature={feature} index={index} />
                ))}
              </div>

              {/* Социальное доказательство */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-slate-900" />
                    ))}
                  </div>
                  <span className="text-slate-300 text-sm ml-2">2,500+ пользователей</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-slate-300 text-sm ml-1">4.9/5 рейтинг</span>
                </div>
              </div>

              {/* CTA кнопка демо */}
              <button
                onClick={onDemo}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl animate-gradient"
              >
                <Play className="w-6 h-6" />
                Попробовать демо
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ - ФОРМА АВТОРИЗАЦИИ */}
          <div className="w-full lg:w-96 xl:w-[480px] flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <AuthCard 
                authMode={authMode}
                setAuthMode={setAuthMode}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент анимированных особенностей
const AnimatedFeature = ({ feature, index }) => {
  return (
    <div 
      className="flex items-center gap-3 text-slate-200 transform transition-all duration-500 hover:scale-105"
      style={{ 
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-blue-400/20">
        <feature.icon className="w-5 h-5 text-blue-400" />
      </div>
      <span className="font-medium">{feature.text}</span>
    </div>
  );
};

// Компонент карточки авторизации
const AuthCard = ({ authMode, setAuthMode, formData, setFormData, onSubmit, loading }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      {/* Заголовок карточки */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          {authMode === 'login' ? 'Добро пожаловать!' : 'Создать аккаунт'}
        </h3>
        <p className="text-slate-300">
          {authMode === 'login' 
            ? 'Войдите для управления автоматизацией' 
            : 'Начните автоматизировать социальные медиа'
          }
        </p>
      </div>

      {/* Форма */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Email адрес
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all focus-ring"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Пароль
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all focus-ring"
            required
            minLength={6}
          />
        </div>

        {authMode === 'register' && (
          <div className="bg-blue-600/20 border border-blue-400/30 rounded-xl p-4">
            <p className="text-sm text-blue-200">
              ✨ Бесплатно 14 дней, затем от $99/месяц
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !formData.email || !formData.password}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Обработка...
            </div>
          ) : (
            authMode === 'login' ? 'Войти в систему' : 'Создать аккаунт'
          )}
        </button>
      </form>

      {/* Переключение режима */}
      <div className="text-center mt-6">
        <button
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          className="text-blue-300 hover:text-blue-200 transition-colors"
        >
          {authMode === 'login' 
            ? 'Нет аккаунта? Зарегистрироваться' 
            : 'Уже есть аккаунт? Войти'
          }
        </button>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>Безопасно</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            <span>Быстро</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>2500+ клиентов</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 