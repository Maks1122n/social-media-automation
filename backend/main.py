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
        "status": "✅ Готов к работе!",
        "python_version": "3.13 compatible"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "Все системы работают нормально ✅"
    }

# Простой тест эндпоинт
@app.get("/api/test")
async def test_endpoint():
    return {
        "success": True,
        "message": "Тест прошел успешно! 🎉",
        "backend": "FastAPI работает",
        "database": "Готово к подключению"
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Запускаем сервер...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 