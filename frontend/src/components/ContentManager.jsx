import React, { useState, useEffect, useCallback } from 'react';
import { 
  Upload, Play, Image, Video, Calendar, Send, 
  Sparkles, Clock, CheckCircle, AlertCircle, 
  Instagram, Youtube, Heart, MoreVertical, Trash2,
  Download, Edit, Copy, Eye, TrendingUp, Zap,
  Star, Target, Wand2, Share2
} from 'lucide-react';

const ContentManager = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      filename: 'morning_motivation.mp4',
      title: 'Утренняя мотивация',
      description: 'Вдохновляющий ролик для начала дня',
      duration: 45,
      size: 25600000,
      status: 'READY',
      platforms: ['INSTAGRAM', 'TIKTOK'],
      aiGenerated: true
    },
    {
      id: 2,
      filename: 'cooking_tutorial.mp4',
      title: 'Кулинарный мастер-класс',
      description: 'Быстрый рецепт пасты',
      duration: 60,
      size: 38400000,
      status: 'QUEUED',
      platforms: ['INSTAGRAM', 'YOUTUBE'],
      aiGenerated: false
    },
    {
      id: 3,
      filename: 'tech_review.mp4',
      title: 'Обзор новинок техники',
      description: 'Последние гаджеты 2024',
      duration: 90,
      size: 52800000,
      status: 'PUBLISHED',
      platforms: ['YOUTUBE'],
      aiGenerated: true
    }
  ]);
  
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [todayStats, setTodayStats] = useState({ published: 28, limit: 50 });
  const [processingAI, setProcessingAI] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = async (files) => {
    setUploading(true);
    
    // Симуляция загрузки
    setTimeout(() => {
      const newVideos = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        filename: file.name,
        title: file.name.replace('.mp4', ''),
        description: 'Обработка ИИ-системой...',
        duration: Math.floor(Math.random() * 60) + 30,
        size: file.size,
        status: 'PROCESSING',
        platforms: [],
        aiGenerated: false
      }));
      
      setVideos(prev => [...prev, ...newVideos]);
      setUploading(false);
      
      // Симуляция обработки
      setTimeout(() => {
        setVideos(prev => prev.map(v => 
          newVideos.find(nv => nv.id === v.id) 
            ? { ...v, status: 'READY', description: 'Готово к публикации' }
            : v
        ));
      }, 3000);
    }, 2000);
  };

  const generateDescriptions = async () => {
    if (selectedVideos.length === 0) {
      alert('Выберите видео для генерации описаний');
      return;
    }

    setProcessingAI(true);
    
    setTimeout(() => {
      setVideos(prev => prev.map(v => 
        selectedVideos.includes(v.id)
          ? { 
              ...v, 
              description: 'Описание сгенерировано ИИ-системой на основе анализа контента',
              aiGenerated: true 
            }
          : v
      ));
      setProcessingAI(false);
      alert('✨ ИИ-система сгенерировала описания для выбранных видео!');
    }, 3000);
  };

  const publishNow = async () => {
    if (selectedVideos.length === 0) {
      alert('Выберите видео для публикации');
      return;
    }

    setVideos(prev => prev.map(v => 
      selectedVideos.includes(v.id)
        ? { ...v, status: 'QUEUED' }
        : v
    ));
    
    alert('🚀 Видео добавлены в очередь публикации!');
    setSelectedVideos([]);
    
    // Симуляция публикации
    setTimeout(() => {
      setVideos(prev => prev.map(v => 
        selectedVideos.includes(v.id)
          ? { ...v, status: 'PUBLISHED' }
          : v
      ));
    }, 5000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок с анимацией */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center animate-pulse">
              <Video className="w-6 h-6 text-white" />
            </div>
            Фабрика контента
          </h1>
          <p className="text-slate-400 mt-1">
            Загружайте, обрабатывайте и публикуйте контент с помощью ИИ-системы
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-400">Опубликовано сегодня</div>
            <div className="text-2xl font-bold text-white">
              {todayStats.published} / {todayStats.limit}
            </div>
          </div>
        </div>
      </div>

      {/* Зона загрузки с анимацией */}
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          dragActive 
            ? 'border-blue-400 bg-blue-400/10 scale-105' 
            : 'border-slate-600 hover:border-slate-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all ${
            dragActive ? 'bg-blue-500 scale-110' : 'bg-slate-700 hover:scale-105'
          }`}>
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {dragActive ? 'Отпустите для загрузки' : 'Загрузите ваши видео'}
            </h3>
            <p className="text-slate-400 mb-4">
              ИИ-система автоматически обработает и оптимизирует контент
            </p>
            
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all transform hover:scale-105"
            >
              <Video className="w-5 h-5" />
              Выбрать видео
            </label>
          </div>
          
          <div className="text-sm text-slate-500">
            Поддерживаемые форматы: MP4, MOV, AVI, MKV • Макс. 500MB
          </div>
        </div>
      </div>

      {/* Индикатор загрузки */}
      {uploading && (
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-200">ИИ-система обрабатывает ваш контент...</span>
          </div>
        </div>
      )}

      {/* Инструменты с анимацией */}
      {videos.length > 0 && (
        <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <span className="text-slate-300">
              {selectedVideos.length} выбрано из {videos.length}
            </span>
            
            {selectedVideos.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVideos([])}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Сбросить
                </button>
                <button
                  onClick={() => setSelectedVideos(videos.map(v => v.id))}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Выбрать все
                </button>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={generateDescriptions}
              disabled={selectedVideos.length === 0 || processingAI}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              {processingAI ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ИИ работает...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Генерация ИИ
                </>
              )}
            </button>
            
            <button
              onClick={publishNow}
              disabled={selectedVideos.length === 0}
              className="flex items-center gap-2 border border-emerald-600 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
              Опубликовать сейчас
            </button>
          </div>
        </div>
      )}

      {/* Список видео */}
      <div className="space-y-4">
        {videos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            selected={selectedVideos.includes(video.id)}
            onSelect={(selected) => {
              if (selected) {
                setSelectedVideos([...selectedVideos, video.id]);
              } else {
                setSelectedVideos(selectedVideos.filter(id => id !== video.id));
              }
            }}
          />
        ))}
        
        {videos.length === 0 && !uploading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Начните создавать контент
            </h3>
            <p className="text-slate-400">
              Загрузите первое видео и позвольте ИИ-системе создать магию
            </p>
          </div>
        )}
      </div>

      {/* Прогресс план на сегодня */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            План публикаций на сегодня
          </h3>
          <span className="text-sm text-slate-400">
            {todayStats.published} / {todayStats.limit} постов
          </span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
            style={{ width: `${Math.min((todayStats.published / todayStats.limit) * 100, 100)}%` }}
          />
        </div>
        
        <div className="mt-2 text-sm text-slate-400">
          {todayStats.limit - todayStats.published > 0 
            ? `Осталось ${todayStats.limit - todayStats.published} постов до дневного лимита`
            : 'Дневной лимит достигнут'
          }
        </div>
      </div>
    </div>
  );
};

// Карточка видео с анимацией
const VideoCard = ({ video, selected, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'INSTAGRAM': return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'YOUTUBE': return <Youtube className="w-4 h-4 text-red-400" />;
      case 'TIKTOK': return <Heart className="w-4 h-4 text-white" />;
      default: return <Video className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusColor = () => {
    switch (video.status) {
      case 'PROCESSING': return 'bg-yellow-500';
      case 'READY': return 'bg-emerald-500';
      case 'QUEUED': return 'bg-blue-500';
      case 'PUBLISHED': return 'bg-purple-500';
      case 'ERROR': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusText = () => {
    switch (video.status) {
      case 'PROCESSING': return 'Обработка ИИ';
      case 'READY': return 'Готово';
      case 'QUEUED': return 'В очереди';
      case 'PUBLISHED': return 'Опубликовано';
      case 'ERROR': return 'Ошибка';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur-xl border rounded-xl p-4 transition-all hover:scale-[1.01] ${
      selected ? 'border-blue-500 bg-blue-500/10 shadow-lg' : 'border-slate-700/50 hover:border-slate-600'
    }`}>
      <div className="flex items-center gap-4">
        {/* Чекбокс */}
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
          className="w-5 h-5 text-blue-600 rounded border-slate-600 bg-slate-700 focus:ring-blue-500"
        />

        {/* Превью с анимацией */}
        <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-slate-400" />
        </div>

        {/* Информация о видео */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-white truncate">
              {video.title || video.filename}
            </h3>
            <div className={`px-2 py-1 rounded-full text-xs text-white flex items-center gap-1 ${getStatusColor()}`}>
              {video.status === 'PROCESSING' && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
              {getStatusText()}
            </div>
            {video.aiGenerated && (
              <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                <Sparkles className="w-3 h-3" />
                ИИ
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
            <span>{video.duration}с</span>
            <span>{(video.size / 1024 / 1024).toFixed(1)}MB</span>
          </div>

          <p className="text-sm text-slate-300 line-clamp-2">
            {video.description}
          </p>
        </div>

        {/* Платформы */}
        <div className="flex gap-2">
          {video.platforms?.length > 0 ? (
            video.platforms.map(platform => (
              <div
                key={platform}
                className="w-8 h-8 bg-slate-700/50 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all"
                title={platform}
              >
                {getPlatformIcon(platform)}
              </div>
            ))
          ) : (
            <div className="text-slate-400 text-sm">
              Платформы не выбраны
            </div>
          )}
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
            <div className="absolute right-0 top-10 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 min-w-[160px]">
              <button
                onClick={() => {
                  alert('👁️ Предпросмотр видео');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 first:rounded-t-lg"
              >
                <Eye className="w-4 h-4" />
                Предпросмотр
              </button>
              <button
                onClick={() => {
                  alert('📝 Редактирование описания');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                <Edit className="w-4 h-4" />
                Редактировать
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(video.filename);
                  alert('✅ Ссылка скопирована');
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                <Copy className="w-4 h-4" />
                Копировать ссылку
              </button>
              <hr className="border-slate-700" />
              <button
                onClick={() => {
                  if (confirm('Удалить видео?')) {
                    alert('🗑️ Видео удалено');
                  }
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 last:rounded-b-lg"
              >
                <Trash2 className="w-4 h-4" />
                Удалить видео
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager; 