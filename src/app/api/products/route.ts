import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the API gateway URL from environment variables or default to the service name in Docker network
    const apiGatewayUrl = process.env.API_GATEWAY_URL || 'http://api-gateway:8080';

    // Extract query parameters if any
    const { searchParams } = new URL(request.url);
    const queryParams = new URLSearchParams();

    for (const [key, value] of searchParams) {
      queryParams.append(key, value);
    }

    // Forward the request to the API service via API gateway
    const response = await fetch(`${apiGatewayUrl}/api/products?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': request.headers.get('authorization') || '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || 'Failed to fetch products' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}