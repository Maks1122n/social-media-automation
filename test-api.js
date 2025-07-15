const fetch = require('node-fetch');

async function testAPI() {
  const baseURL = 'http://localhost:3001';
  
  console.log('🔍 Testing SocialBot API endpoints...\n');

  // Test Health
  try {
    console.log('1. Testing /api/health...');
    const healthResponse = await fetch(`${baseURL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData);
  } catch (error) {
    console.log('❌ Health error:', error.message);
  }

  // Test Registration
  try {
    console.log('\n2. Testing /api/auth/register...');
    const registerResponse = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'api-test@example.com',
        password: '123456'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Register:', registerData);
    
    // Test Login
    console.log('\n3. Testing /api/auth/login...');
    const loginResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'api-test@example.com',
        password: '123456'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login:', loginData);
    
  } catch (error) {
    console.log('❌ Auth error:', error.message);
  }

  console.log('\n🎉 API testing completed!');
}

testAPI(); 