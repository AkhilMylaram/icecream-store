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

async function testAuthEndpoints() {
  console.log('\nTesting authentication endpoints...');
  
  // Test signup endpoint
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    });
    
    console.log(`Signup endpoint status: ${response.status}`);
    const text = await response.text();
    console.log(`Signup response: ${text.substring(0, 100)}...`);
    
    if (response.status === 400 || response.status === 409) {
      console.log('✓ Signup endpoint is accessible (expected error for duplicate email)');
    } else if (response.status === 200) {
      console.log('✓ Signup endpoint is working');
    } else {
      console.log('✗ Signup endpoint may have issues');
    }
  } catch (error) {
    console.log('✗ Error testing signup endpoint:', error.message);
  }
  
  // Test login endpoint
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    });
    
    console.log(`Login endpoint status: ${response.status}`);
    const text = await response.text();
    console.log(`Login response: ${text.substring(0, 100)}...`);
    
    if (response.status === 200 || response.status === 401) {
      console.log('✓ Login endpoint is accessible');
    } else {
      console.log('✗ Login endpoint may have issues');
    }
  } catch (error) {
    console.log('✗ Error testing login endpoint:', error.message);
  }
}

async function testProductEndpoints() {
  console.log('\nTesting product endpoints...');
  
  // Test products endpoint
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    console.log(`Products endpoint status: ${response.status}`);
    if (response.status === 200) {
      console.log('✓ Products endpoint is working');
      try {
        const data = await response.json();
        console.log(`✓ Retrieved ${data.length || 'some'} products`);
      } catch (e) {
        console.log('⚠ Could not parse products response as JSON');
      }
    } else {
      console.log('✗ Products endpoint may have issues');
      const text = await response.text();
      console.log(`Products response: ${text.substring(0, 100)}...`);
    }
  } catch (error) {
    console.log('✗ Error testing products endpoint:', error.message);
  }
}

async function runTests() {
  console.log('Starting application tests...\n');
  
  await testAPIGatewayDirectly();
  await testImages();
  await testAuthEndpoints();
  await testProductEndpoints();
  
  console.log('\nTests completed!');
}

// Wait a bit to ensure services are ready
setTimeout(runTests, 90000); // Wait 90 seconds before running tests