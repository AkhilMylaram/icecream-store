import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the API gateway URL from environment variables or default to the service name in Docker network
    const apiGatewayUrl = process.env.API_GATEWAY_URL || 'http://api-gateway:8080';
    const productId = params.id;

    // Forward the request to the API service via API gateway
    const response = await fetch(`${apiGatewayUrl}/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Authorization': headers().get('authorization') || '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || `Failed to fetch product with ID: ${productId}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}