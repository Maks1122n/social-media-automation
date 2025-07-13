from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Создаем приложение FastAPI
app = FastAPI(
    title="Social Media Automation",
    description="Автоматизация постинга в социальные сети",
    version="1.0.0"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем папки
os.makedirs("uploads", exist_ok=True)
os.makedirs("logs", exist_ok=True)

@app.get("/")
async def root():
    return {
        "message": "🚀 Social Media Automation API работает!",
        "version": "1.0.0",
        "status": "✅ SUCCESS! НАКОНЕЦ-ТО ЗАРАБОТАЛО!",
        "python_version": "3.13.4",
        "fastapi_version": "0.115.0"
    }

@app.get("/api/health")
async def health_check():
    import sys
    return {
        "status": "healthy",
        "message": "🎉 Все системы работают! MVP запущен!",
        "python": sys.version,
        "platform": "Render"
    }

@app.get("/api/test")
async def test_endpoint():
    return {
        "success": True,
        "message": "🎉 ТЕСТ ПРОШЕЛ! API РАБОТАЕТ!",
        "backend": "FastAPI 0.115.0",
        "database": "Готово к подключению",
        "adspower": "Готово к интеграции"
    }

# Простой POST endpoint
@app.post("/api/echo")
async def echo_endpoint(data: dict):
    return {
        "success": True,
        "message": "Echo работает!",
        "received_data": data
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Запускаем Social Media Automation API...")
    print("🎯 Render деплой - версия для Python 3.13")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 