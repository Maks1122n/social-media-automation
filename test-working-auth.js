// Тест с существующими пользователями
const testWorkingAuth = async () => {
  console.log('🔍 Testing authentication with existing users...');
  
  // Попробуем разные порты
  const ports = [3000, 3001, 10000];
  let workingPort = null;
  let baseUrl = null;
  
  for (const port of ports) {
    try {
      console.log(`\n🔎 Trying port ${port}...`);
      const testUrl = `http://localhost:${port}`;
      const response = await fetch(`${testUrl}/health`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Found working server on port ${port}:`, data);
        workingPort = port;
        baseUrl = testUrl;
        break;
      }
    } catch (error) {
      console.log(`❌ Port ${port} not responding`);
    }
  }
  
  if (!workingPort) {
    console.log('🚨 No working server found on any port!');
    return;
  }
  
  // Тест с существующими пользователями
  const testUsers = [
    { email: 'test@example.com', password: '123456', name: 'Test User' },
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
  ];
  
  for (const testUser of testUsers) {
    try {
      console.log(`\n🔐 Testing login for ${testUser.name} (${testUser.email})...`);
      
      const loginResponse = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: testUser.email, 
          password: testUser.password 
        })
      });
      
      const loginData = await loginResponse.json();
      console.log(`📊 Status: ${loginResponse.status}`);
      console.log('🔐 Response:', loginData);
      
      if (loginData.success && loginData.token) {
        console.log(`✅ ${testUser.name} login successful!`);
      } else {
        console.log(`❌ ${testUser.name} login failed:`, loginData.error);
      }
      
    } catch (error) {
      console.log(`❌ ${testUser.name} error:`, error.message);
    }
  }
  
  // Тест регистрации нового пользователя
  try {
    console.log('\n📝 Testing new user registration...');
    const newEmail = `newuser-${Date.now()}@example.com`;
    const newPassword = 'newpass123';
    
    const registerResponse = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: newEmail, 
        password: newPassword 
      })
    });
    
    const registerData = await registerResponse.json();
    console.log(`📊 Status: ${registerResponse.status}`);
    console.log('📝 Response:', registerData);
    
    if (registerData.success && registerData.token) {
      console.log('✅ New user registration successful!');
      
      // Попробуем войти с новыми данными
      console.log('\n🔄 Testing login with new credentials...');
      const newLoginResponse = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: newEmail, 
          password: newPassword 
        })
      });
      
      const newLoginData = await newLoginResponse.json();
      console.log(`📊 Status: ${newLoginResponse.status}`);
      
      if (newLoginData.success && newLoginData.token) {
        console.log('✅ New user login successful! Authentication working perfectly!');
      } else {
        console.log('❌ New user login failed:', newLoginData.error);
      }
      
    } else {
      console.log('❌ Registration failed:', registerData.error);
    }
    
  } catch (error) {
    console.log('❌ Registration error:', error.message);
  }
  
  console.log('\n🏁 Authentication testing completed!');
  console.log(`📡 Working server: ${baseUrl}`);
};

testWorkingAuth(); 