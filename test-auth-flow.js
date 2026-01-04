#!/usr/bin/env node

const BASE_URL = 'http://localhost:3000';

async function testAPIGatewayDirectly() {
  console.log('Testing API Gateway directly...');
  
  try {
    // Test if API gateway is accessible directly
    const response = await fetch('http://localhost:8080/actuator/health', {
      method: 'GET'
    });
    console.log(`API Gateway health status: ${response.status}`);
  } catch (error) {
    console.log('✗ Error accessing API Gateway directly:', error.message);
  }
  
  try {
    // Test if auth service is accessible directly through gateway
    const response = await fetch('http://localhost:8080/auth/health', {
      method: 'GET'
    });
    console.log(`Auth service via gateway status: ${response.status}`);
  } catch (error) {
    console.log('✗ Error accessing auth service via gateway:', error.message);
  }
}

async function testImages() {
  console.log('\nTesting image loading...');
  
  // Test if we can access the main page
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      console.log('✓ Main page is accessible');
      const html = await response.text();
      
      // Check if images are loading by looking for image tags
      if (html.includes('images.unsplash.com') || html.includes('picsum.photos')) {
        console.log('✓ Image URLs found in page');
      } else {
        console.log('⚠ No image URLs found in page');
      }
    } else {
      console.log('✗ Main page is not accessible');
    }
  } catch (error) {
    console.log('✗ Error accessing main page:', error.message);
  }
}

async function testAuthFlow() {
  console.log('\nTesting authentication flow...');
  
  let token = null;
  
  // Test signup endpoint
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', password: 'password123' })
    });
    
    console.log(`Signup endpoint status: ${response.status}`);
    if (response.status === 200) {
      const data = await response.json();
      token = data.accessToken;
      console.log('✓ Signup endpoint is working, got token');
    } else {
      console.log('✗ Signup endpoint failed');
      const text = await response.text();
      console.log(`Signup response: ${text}`);
    }
  } catch (error) {
    console.log('✗ Error testing signup endpoint:', error.message);
  }
  
  // Test login endpoint
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', password: 'password123' })
    });
    
    console.log(`Login endpoint status: ${response.status}`);
    if (response.status === 200) {
      const data = await response.json();
      token = data.accessToken;
      console.log('✓ Login endpoint is working, got token');
    } else {
      console.log('✗ Login endpoint may have issues');
      const text = await response.text();
      console.log(`Login response: ${text}`);
    }
  } catch (error) {
    console.log('✗ Error testing login endpoint:', error.message);
  }
  
  // Test products endpoint with token if we have one
  if (token) {
    console.log('\nTesting products endpoint with authentication...');
    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Products endpoint status with auth: ${response.status}`);
      if (response.status === 200) {
        console.log('✓ Products endpoint is working with authentication');
        try {
          const data = await response.json();
          console.log(`✓ Retrieved ${data.length || 'some'} products`);
        } catch (e) {
          console.log('⚠ Could not parse products response as JSON');
        }
      } else {
        console.log('✗ Products endpoint may have issues with authentication');
        const text = await response.text();
        console.log(`Products response: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log('✗ Error testing products endpoint with auth:', error.message);
    }
  }
  
  return token;
}

async function testProductEndpointsNoAuth() {
  console.log('\nTesting products endpoint without authentication...');
  
  // Test products endpoint without token (should work for public products)
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    console.log(`Products endpoint status (no auth): ${response.status}`);
    if (response.status === 200) {
      console.log('✓ Products endpoint is working without authentication');
      try {
        const data = await response.json();
        console.log(`✓ Retrieved ${data.length || 'some'} products`);
      } catch (e) {
        console.log('⚠ Could not parse products response as JSON');
      }
    } else {
      console.log('✗ Products endpoint may have issues without authentication');
      const text = await response.text();
      console.log(`Products response: ${text.substring(0, 100)}...`);
    }
  } catch (error) {
    console.log('✗ Error testing products endpoint (no auth):', error.message);
  }
}

async function runTests() {
  console.log('Starting comprehensive application tests...\n');
  
  await testAPIGatewayDirectly();
  await testImages();
  await testProductEndpointsNoAuth();
  const token = await testAuthFlow();
  
  console.log('\nAuthentication flow test completed!');
  if (token) {
    console.log('✓ Authentication is working!');
  } else {
    console.log('⚠ Authentication may have issues');
  }
  
  console.log('\nAll tests completed!');
}

// Run tests immediately since services should be ready by now
runTests().catch(console.error);