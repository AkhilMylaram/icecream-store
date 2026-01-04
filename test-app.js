#!/usr/bin/env node

const BASE_URL = 'http://localhost:3000';

async function testImages() {
  console.log('Testing image loading...');
  
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
      const data = await response.json();
      console.log(`✓ Retrieved ${data.length || 'some'} products`);
    } else {
      console.log('✗ Products endpoint may have issues');
    }
  } catch (error) {
    console.log('✗ Error testing products endpoint:', error.message);
  }
}

async function runTests() {
  console.log('Starting application tests...\n');
  
  await testImages();
  await testAuthEndpoints();
  await testProductEndpoints();
  
  console.log('\nTests completed!');
}

runTests().catch(console.error);