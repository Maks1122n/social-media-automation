# 🚀 Social Media Automation Platform

Автоматизация постинга в Instagram и YouTube с интеграцией AdsPower.

## ✨ Возможности
- 🤖 Автоматический постинг в Instagram Reels и YouTube Shorts
- 🛡️ Система анти-бана через AdsPower браузерные профили
- 📱 Управление множественными аккаунтами
- 🎯 Умное планирование и распределение контента
- 🧠 ИИ-генерация описаний и хештегов
- 📊 Аналитика производительности постов

## 🛠️ Технологии
- **Backend:** Python FastAPI
- **Automation:** Selenium + AdsPower API
- **Frontend:** React (в разработке)
- **Deploy:** Render + GitHub

## 🚀 Быстрый старт

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### API Documentation
После запуска: http://localhost:8000/docs

## 📡 API Endpoints
- `GET /` - Статус API
- `GET /api/health` - Проверка здоровья системы
- `GET /api/adspower/test` - Тест подключения AdsPower
- `POST /api/adspower/create-profile` - Создание браузерного профиля
- `GET /api/adspower/profiles` - Список всех профилей
- `POST /api/adspower/start-browser/{profile_id}` - Запуск браузера

## 🔧 Конфигурация
Создай файл `.env` в папке backend:
```env
ADSPOWER_API_URL=http://local.adspower.net:50325
ADSPOWER_API_KEY=your_api_key_here
DEBUG=true
```

## 📱 Планируемые функции
- [ ] React фронтенд с адаптивным дизайном
- [ ] YouTube Shorts автоматизация
- [ ] Система планирования постов
- [ ] Массовая загрузка из папок
- [ ] Аналитика и отчеты

## 👨‍💻 Автор
Создано для автоматизации SMM процессов в арбитражных командах.

---
**⚡ Powered by AdsPower + FastAPI + AI** 