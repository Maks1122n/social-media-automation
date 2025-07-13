import requests
import logging
from typing import Dict, List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AdsPowerService:
    def __init__(self):
        self.base_url = "http://local.adspower.net:50325"
        
    async def check_connection(self) -> bool:
        try:
            response = requests.get(f"{self.base_url}/status", timeout=5)
            logger.info("✅ AdsPower подключен успешно!")
            return response.status_code == 200
        except Exception as e:
            logger.error(f"❌ Ошибка подключения к AdsPower: {e}")
            return False
    
    async def create_profile(self, profile_data: Dict) -> Dict:
        endpoint = f"{self.base_url}/api/v1/user/create"
        
        payload = {
            "name": profile_data.get("name", "test_profile"),
            "domain_name": "instagram.com",
            "group_id": "0",
            "platform": "instagram",
            "fingerprint_config": {
                "automatic_timezone": True,
                "timezone": "auto",
                "language": ["en-US", "en"],
                "screen_resolution": "1366_768"
            }
        }
        
        try:
            logger.info(f"🔄 Создаем профиль: {profile_data.get('name')}")
            response = requests.post(endpoint, json=payload, timeout=30)
            result = response.json()
            
            if result.get("code") == 0:
                profile_id = result["data"]["id"]
                logger.info(f"✅ Профиль создан! ID: {profile_id}")
                return {
                    "success": True,
                    "profile_id": profile_id,
                    "message": "Профиль создан успешно!"
                }
            else:
                return {
                    "success": False,
                    "error": result.get("msg", "Неизвестная ошибка")
                }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def start_browser(self, profile_id: str) -> Dict:
        endpoint = f"{self.base_url}/api/v1/browser/start"
        payload = {"user_id": profile_id, "headless": False}
        
        try:
            response = requests.post(endpoint, json=payload, timeout=30)
            result = response.json()
            
            if result.get("code") == 0:
                return {
                    "success": True,
                    "debug_port": result["data"]["debug_port"]
                }
            else:
                return {"success": False, "error": result.get("msg")}
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def get_profiles(self) -> List[Dict]:
        endpoint = f"{self.base_url}/api/v1/user/list"
        try:
            response = requests.get(endpoint, timeout=10)
            result = response.json()
            return result.get("data", {}).get("list", []) if result.get("code") == 0 else []
        except:
            return [] 