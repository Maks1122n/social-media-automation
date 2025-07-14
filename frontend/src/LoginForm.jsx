import React, { useState } from 'react';
import { Activity } from 'lucide-react';

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log('LoginForm render:', { email, password, isLogin, loading });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submit:', { email, password, isLogin });
    
    if (!email || !password) {
      alert('Заполните все поля!');
      return;
    }

    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }
    
    setLoading(true);
    
    try {
      const url = `http://localhost:3000/auth/${isLogin ? 'login' : 'register'}`;
      console.log('Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (response.ok && result.token) {
        localStorage.setItem('authToken', result.token);
        alert('✅ Успешно!');
        onSuccess(result.user || { email, id: 1 });
      } else {
        throw new Error(result.error || 'Ошибка сервера');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('❌ Ошибка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    console.log('Toggle mode from', isLogin, 'to', !isLogin);
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
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
              value={email}
              onChange={(e) => {
                console.log('Email change:', e.target.value);
                setEmail(e.target.value);
              }}
              placeholder="test@example.com"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log('Password change:', e.target.value);
                setPassword(e.target.value);
              }}
              placeholder="123456"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Обработка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleToggle}
            disabled={loading}
            className="text-blue-400 hover:text-blue-300 text-sm disabled:opacity-50"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
        
        {/* Расширенная debug информация */}
        <div className="mt-4 p-3 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-600">
          <p><strong>🔍 DEBUG INFO:</strong></p>
          <p>Mode: <span className="text-blue-400">{isLogin ? 'Login' : 'Register'}</span></p>
          <p>Email: "<span className="text-green-400">{email}</span>"</p>
          <p>Password: "<span className="text-green-400">{password}</span>"</p>
          <p>Loading: <span className="text-yellow-400">{loading.toString()}</span></p>
          <p>Backend: <span className="text-purple-400">http://localhost:3000</span></p>
          <p>Frontend: <span className="text-purple-400">http://localhost:3002</span></p>
          <p>Timestamp: <span className="text-gray-400">{new Date().toLocaleTimeString()}</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 