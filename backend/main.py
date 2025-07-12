from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import uvicorn

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
os.makedirs("../uploads", exist_ok=True)
os.makedirs("../logs", exist_ok=True)

# Статические файлы
app.mount("/uploads", StaticFiles(directory="../uploads"), name="uploads")

# Импорт роутеров
from adspower_api import router as adspower_router
app.include_router(adspower_router)

@app.get("/")
async def root():
    return {
        "message": "Social Media Automation API работает!",
        "version": "1.0.0",
        "status": "🚀 Готов к работе!"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "Все системы работают нормально ✅"
    }

if __name__ == "__main__":
    print("🚀 Запускаем сервер...")
    print("📍 Адрес: http://localhost:8000")
    print("📖 Документация: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 