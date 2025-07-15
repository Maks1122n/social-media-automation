const API_CONFIG = {
  BASE_URL: 'https://socialbot-backend.onrender.com',
  
  ENDPOINTS: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    HEALTH: '/health',
    // API префиксы для совместимости
    API_REGISTER: '/api/auth/register',
    API_LOGIN: '/api/auth/login',
    API_HEALTH: '/api/health'
  }
};

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log(`🔗 API Request: ${options.method || 'GET'} ${url}`);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      console.log(`📊 API Response: ${response.status} ${response.statusText}`);
      
      // Проверяем что ответ содержит JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('✅ API Data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  }

  // Health check
  async health() {
    return this.request(API_CONFIG.ENDPOINTS.HEALTH);
  }

  // Authentication
  async register(email, password) {
    console.log('📝 Registering user:', email);
    return this.request(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async login(email, password) {
    console.log('🔐 Logging in user:', email);
    return this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient; 