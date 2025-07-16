# ТЕХНИЧЕСКОЕ ЗАДАНИЕ: Исправление системы аутентификации SocialBot

## 🎯 **ЦЕЛЬ**
Настроить **полностью работающую систему регистрации и входа** для SocialBot, чтобы пользователи могли:
1. Регистрироваться с email/паролем
2. Входить по своим данным  
3. Получать реальную авторизацию (не demo режим)

## 🔍 **ТЕКУЩЕЕ СОСТОЯНИЕ**

### ✅ **Что работает:**
- ✅ Frontend развернут: https://socialbot-frontend.onrender.com
- ✅ Backend развернут: https://socialbot-backend.onrender.com
- ✅ Health check работает: `/health` возвращает статус OK
- ✅ PostgreSQL база данных настроена на Render
- ✅ Demo режим работает (кнопка "Демо-тур")

### ❌ **Что НЕ работает:**
- ❌ **Регистрация**: возвращает 500 Internal Server Error
- ❌ **Вход**: возвращает 500 Internal Server Error  
- ❌ **Реальная аутентификация**: пользователи не могут войти по своим данным

### 🔧 **Диагностика:**
```bash
# Тест показал:
node test-auth.js
# Health: ✅ OK
# Registration: ❌ 500 Internal Server Error 
# Login: ❌ 500 Internal Server Error
```

## 📋 **ЗАДАЧИ ДЛЯ ИСПРАВЛЕНИЯ**

### **1. Диагностика Backend (Приоритет: КРИТИЧЕСКИЙ)**

**Проблема:** Backend возвращает 500 ошибки при аутентификации
**Причина:** Скорее всего проблемы с Prisma/PostgreSQL на продакшене

**Действия:**
```bash
# 1.1 Проверить логи Render backend сервиса
# 1.2 Убедиться что Prisma schema применилась корректно
# 1.3 Проверить переменные окружения DATABASE_URL
# 1.4 Проверить что миграции прошли успешно
```

### **2. Исправление Prisma конфигурации**

**Файлы для проверки:**
- `backend/prisma/schema.prisma` - должен использовать PostgreSQL
- `render.yaml` - должен содержать команды миграций
- `backend/package.json` - скрипты для продакшена

**Ожидаемый schema.prisma для продакшена:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN  
  PREMIUM
  ENTERPRISE
}
```

### **3. Исправление API endpoints**

**Файл:** `backend/src/app.js`

**Проверить endpoints:**
- `POST /auth/register` - должен создавать пользователей в PostgreSQL
- `POST /auth/login` - должен проверять пароли с bcrypt
- Обработка ошибок - должна возвращать корректные статусы

**Ожидаемое поведение:**
```javascript
// Регистрация
POST /auth/register
Body: { "email": "user@example.com", "password": "123456" }
Response: { "success": true, "token": "jwt_token", "user": {...} }

// Вход  
POST /auth/login
Body: { "email": "user@example.com", "password": "123456" }
Response: { "success": true, "token": "jwt_token", "user": {...} }
```

### **4. Исправление Frontend**

**Файлы для проверки:**
- `frontend/src/App.tsx` - логика аутентификации
- `frontend/src/config/api.js` - URL backend'а

**Убедиться что:**
- ✅ Убрана mock логика
- ✅ API URL = `https://socialbot-backend.onrender.com`  
- ✅ Правильная обработка ответов от backend
- ✅ Сохранение JWT токенов в localStorage

### **5. Тестирование deployment**

**render.yaml должен содержать:**
```yaml
buildCommand: cd backend && npm install && npx prisma generate && npx prisma db push && npm run db:seed
startCommand: cd backend && npm start
```

## 📝 **ОЖИДАЕМЫЙ РЕЗУЛЬТАТ**

### **Сценарий 1: Регистрация нового пользователя**
1. Пользователь открывает https://socialbot-frontend.onrender.com
2. Нажимает "Регистрация"
3. Вводит email: `test@example.com`, пароль: `123456`
4. ✅ Получает сообщение "Регистрация успешна"
5. ✅ Автоматически входит в систему
6. ✅ Попадает на dashboard

### **Сценарий 2: Вход существующего пользователя**  
1. Пользователь уже зарегистрировался
2. Открывает сайт снова
3. Нажимает "Вход"
4. Вводит свои email/пароль
5. ✅ Успешно входит в систему
6. ✅ Видит свои данные

### **Сценарий 3: Неверные данные**
1. Пользователь вводит неверный пароль
2. ✅ Получает ошибку "Неверный email или пароль"
3. ✅ НЕ может войти в систему

## 🧪 **КРИТЕРИИ ПРИЕМКИ**

**Тест 1: Продакшн API**
```bash
node test-auth.js
# Ожидаемый результат:
# ✅ Health check: OK
# ✅ Registration: 201 Created, получен token
# ✅ Wrong login: 401 Unauthorized
```

**Тест 2: Frontend на продакшене**
- ✅ Регистрация работает
- ✅ Вход работает  
- ✅ Неверные данные отклоняются
- ✅ Demo режим по-прежнему работает

**Тест 3: База данных**
```sql
-- В PostgreSQL должны создаваться записи:
SELECT * FROM users WHERE email = 'test@example.com';
-- Результат: пользователь найден с хешированным паролем
```

## 🔧 **ТЕХНИЧЕСКИЕ ДЕТАЛИ**

### **Environment Variables (Render):**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://... (автоматически от Render)
JWT_SECRET=... (автоматически сгенерирован)
```

### **Prisma Commands для отладки:**
```bash
# Локально для тестирования:
npx prisma db push
npx prisma generate  
npm run db:seed

# Проверка схемы:
npx prisma studio
```

### **Структура ответов API:**
```javascript
// Успешная регистрация/вход:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "clxx...",
    "email": "user@example.com",
    "role": "USER"
  }
}

// Ошибка:
{
  "success": false, 
  "error": "User already exists" | "Invalid credentials" | "Validation error"
}
```

## 🚀 **ПЛАН ВЫПОЛНЕНИЯ**

1. **[КРИТИЧНО]** Исправить backend API endpoints
2. **[КРИТИЧНО]** Проверить Prisma миграции на Render
3. **[ВАЖНО]** Протестировать через `test-auth.js`
4. **[ВАЖНО]** Проверить frontend интеграцию
5. **[ФИНАЛ]** Полное тестирование на продакшене

## 📞 **РЕЗУЛЬТАТ**

После выполнения пользователь должен иметь возможность:
- ✅ Зарегистрироваться с любым email
- ✅ Войти по своим данным 
- ✅ Получить полный доступ к системе
- ✅ НЕ использовать demo режим для реальной работы

**Система должна работать как полноценная SaaS платформа с реальной аутентификацией.** 