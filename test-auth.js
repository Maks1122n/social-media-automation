// Тест аутентификации на продакшн сервере
const testAuth = async () => {
  const baseUrl = 'https://socialbot-backend.onrender.com';
  
  console.log('🔍 Testing production authentication...');
  console.log(`📡 Backend URL: ${baseUrl}`);
  
  // Тест 1: Health Check
  try {
    console.log('\n1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  // Тест 2: Регистрация
  try {
    console.log('\n2️⃣ Testing Registration...');
    const registerResponse = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test-${Date.now()}@example.com`,
        password: '123456'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log(`📊 Status: ${registerResponse.status}`);
    console.log('📝 Registration result:', registerData);
    
    if (registerData.success && registerData.token) {
      console.log('✅ Registration successful! Token received.');
      return registerData.token;
    } else {
      console.log('❌ Registration failed:', registerData.error);
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
  }
  
  // Тест 3: Логин с неверными данными
  try {
    console.log('\n3️⃣ Testing Login with wrong credentials...');
    const wrongLoginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'wrongpassword'
      })
    });
    
    const wrongLoginData = await wrongLoginResponse.json();
    console.log(`📊 Status: ${wrongLoginResponse.status}`);
    console.log('🚫 Wrong login result:', wrongLoginData);
    
    if (wrongLoginResponse.status === 401) {
      console.log('✅ Correctly rejected wrong credentials!');
    } else {
      console.log('❌ Security issue: Wrong credentials were accepted!');
    }
  } catch (error) {
    console.log('❌ Login test error:', error.message);
  }
  
  console.log('\n🏁 Authentication test completed!');
};

// Запуск теста
testAuth(); 