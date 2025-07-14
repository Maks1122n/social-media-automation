const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://socialbot-backend.onrender.com'
    : 'http://localhost:3000', // Backend работает на 3000, frontend на 3001
  
  ENDPOINTS: {
    // Auth
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    
    // Accounts
    ACCOUNTS: '/api/accounts',
    ACCOUNT_STATUS: (id) => `/api/accounts/${id}/status`,
    
    // Videos
    VIDEOS: '/api/videos',
    
    // Services (заглушки)
    ADSPOWER: '/api/adspower',
    AI: '/api/ai',
    ANALYTICS: '/api/analytics'
  }
};

// API client class
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth methods
  async register(email, password) {
    console.log('API: Registering user', { email });
    
    const data = await this.request(API_CONFIG.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: { email, password }
    });
    
    console.log('API: Register response', data);
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async login(email, password) {
    console.log('API: Logging in user', { email });
    
    const data = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: { email, password }
    });
    
    console.log('API: Login response', data);
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // Добавить метод logout
  logout() {
    this.removeToken();
  }

  // Accounts methods
  async getAccounts() {
    return this.request(API_CONFIG.ENDPOINTS.ACCOUNTS);
  }

  async createAccount(accountData) {
    return this.request(API_CONFIG.ENDPOINTS.ACCOUNTS, {
      method: 'POST',
      body: accountData
    });
  }

  async updateAccountStatus(id, status) {
    return this.request(API_CONFIG.ENDPOINTS.ACCOUNT_STATUS(id), {
      method: 'PUT',
      body: { status }
    });
  }

  async deleteAccount(id) {
    return this.request(`${API_CONFIG.ENDPOINTS.ACCOUNTS}/${id}`, {
      method: 'DELETE'
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient();
export default API_CONFIG; 