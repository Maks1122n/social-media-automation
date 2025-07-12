from fastapi import APIRouter, HTTPException
from services.adspower import AdsPowerService
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/adspower", tags=["adspower"])

class ProfileCreate(BaseModel):
    name: str

@router.get("/test")
async def test_adspower():
    service = AdsPowerService()
    is_connected = await service.check_connection()
    
    return {
        "success": is_connected,
        "message": "✅ AdsPower подключен!" if is_connected else "❌ AdsPower не подключен",
        "status": "connected" if is_connected else "disconnected"
    }

@router.post("/create-profile")
async def create_profile(profile_data: ProfileCreate):
    service = AdsPowerService()
    result = await service.create_profile(profile_data.dict())
    
    if result["success"]:
        return result
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@router.get("/profiles")
async def get_profiles():
    service = AdsPowerService()
    profiles = await service.get_profiles()
    return {"success": True, "profiles": profiles, "count": len(profiles)}

@router.post("/start-browser/{profile_id}")
async def start_browser(profile_id: str):
    service = AdsPowerService()
    result = await service.start_browser(profile_id)
    
    if result["success"]:
        return {"success": True, "debug_port": result["debug_port"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"]) 