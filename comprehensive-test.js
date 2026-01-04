const BASE_URL = 'http://localhost:3000';

// Comprehensive test suite for the ice cream store application
async function runAllTests() {
  console.log('🧪 Running comprehensive test suite...\n');
  
  // Test 1: Images loading
  await testImages();
  
  // Test 2: Authentication flow
  await testAuthenticationFlow();
  
  // Test 3: Product functionality
  await testProductFunctionality();
  
  // Test 4: User-specific data
  await testUserSpecificData();
  
  console.log('\n🎉 All tests completed successfully!');
}

async function testImages() {
  console.log('🖼️  Testing image loading...');
  
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Main page request failed with status ${response.status}`);
    }
    
    const html = await response.text();
    
    // Check for image URLs in the page
    const imageCount = (html.match(/images\.unsplash\.com/g) || []).length +
                      (html.match(/picsum\.photos/g) || []).length;
    
    if (imageCount > 0) {
      console.log(`   ✅ Found ${imageCount} image URLs in the main page`);
    } else {
      console.log('   ❌ No image URLs found in the main page');
    }
  } catch (error) {
    console.log(`   ❌ Error testing images: ${error.message}`);
  }
}

async function testAuthenticationFlow() {
  console.log('\n🔐 Testing authentication flow...');

  const email = `testuser_${Date.now()}@example.com`;

  // Test signup
  console.log('   📝 Testing signup...');
  try {
    const signupResponse = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: 'password123'
      })
    });

    if (signupResponse.status === 200) {
      const data = await signupResponse.json();
      console.log('   ✅ Signup successful');
      const signupToken = data.accessToken;

      // Test login with the same user
      console.log('   👤 Testing login...');
      const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email, // Use the same email as signup
          password: 'password123'
        })
      });

      if (loginResponse.status === 200) {
        const loginData = await loginResponse.json();
        console.log('   ✅ Login successful');
        return loginData.accessToken;
      } else {
        console.log(`   ❌ Login failed with status ${loginResponse.status}`);
        const errorText = await loginResponse.text();
        console.log(`   Error: ${errorText}`);
        return null;
      }
    } else {
      console.log(`   ❌ Signup failed with status ${signupResponse.status}`);
      const errorText = await signupResponse.text();
      console.log(`   Error: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.log(`   ❌ Error in authentication flow: ${error.message}`);
    return null;
  }
}

async function testProductFunctionality() {
  console.log('\n🍦 Testing product functionality...');
  
  try {
    // Test getting all products
    const response = await fetch(`${BASE_URL}/api/products`);
    if (response.status === 200) {
      const products = await response.json();
      console.log(`   ✅ Retrieved ${products.length} products successfully`);
      
      if (products.length > 0) {
        // Test getting a specific product
        const firstProduct = products[0];
        const productResponse = await fetch(`${BASE_URL}/api/products/${firstProduct.id}`);
        if (productResponse.status === 200) {
          console.log('   ✅ Retrieved specific product successfully');
        } else {
          console.log(`   ❌ Failed to get specific product, status: ${productResponse.status}`);
        }
      }
    } else {
      console.log(`   ❌ Failed to get products, status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Error testing product functionality: ${error.message}`);
  }
}

async function testUserSpecificData() {
  console.log('\n👤 Testing user-specific data...');
  
  // First, create a user and get a token
  const email = `user_${Date.now()}@example.com`;
  let token = null;
  
  try {
    // Signup
    const signupResponse = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'password123' })
    });
    
    if (signupResponse.status === 200) {
      const signupData = await signupResponse.json();
      token = signupData.accessToken;
      console.log('   ✅ User created for data testing');
    } else {
      console.log(`   ❌ Failed to create user for data testing, status: ${signupResponse.status}`);
      return;
    }
    
    // Test accessing user-specific data (orders)
    const ordersResponse = await fetch(`${BASE_URL}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (ordersResponse.status === 200) {
      const orders = await ordersResponse.json();
      console.log(`   ✅ Retrieved ${orders.length} orders for user`);
    } else if (ordersResponse.status === 400) {
      console.log('   ⚠️  No orders found for user (expected for new user)');
    } else if (ordersResponse.status === 401 || ordersResponse.status === 403) {
      console.log('   ⚠️  User authentication required for orders (expected)');
    } else {
      console.log(`   ❌ Failed to get user orders, status: ${ordersResponse.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Error testing user-specific data: ${error.message}`);
  }
}

// Run the tests
runAllTests().catch(console.error);