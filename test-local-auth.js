// Тест аутентификации на локальном сервере
const testLocalAuth = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🔍 Testing LOCAL authentication...');
  console.log(`📡 Backend URL: ${baseUrl}`);
  
  // Тест 1: Health Check
  try {
    console.log('\n1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    console.log('🚨 Local server might not be running on port 3000');
    return;
  }
  
  // Тест 2: Регистрация
  try {
    console.log('\n2️⃣ Testing Registration...');
    const email = `test-${Date.now()}@example.com`;
    const password = '123456';
    
    const registerResponse = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const registerData = await registerResponse.json();
    console.log(`📊 Status: ${registerResponse.status}`);
    console.log('📝 Registration result:', registerData);
    
    if (registerData.success && registerData.token) {
      console.log('✅ Registration successful! Token received.');
      
      // Тест 3: Вход с теми же данными
      console.log('\n3️⃣ Testing Login with registered credentials...');
      const loginResponse = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const loginData = await loginResponse.json();
      console.log(`📊 Status: ${loginResponse.status}`);
      console.log('🔐 Login result:', loginData);
      
      if (loginData.success && loginData.token) {
        console.log('✅ Login successful! Authentication works!');
      } else {
        console.log('❌ Login failed:', loginData.error);
      }
      
    } else {
      console.log('❌ Registration failed:', registerData.error);
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
  }
  
  // Тест 4: Логин с неверными данными
  try {
    console.log('\n4️⃣ Testing Login with wrong credentials...');
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
  
  console.log('\n🏁 LOCAL authentication test completed!');
};

// Запуск теста
testLocalAuth(); 