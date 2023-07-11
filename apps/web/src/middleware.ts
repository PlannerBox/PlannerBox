import { apiCall } from 'api-client/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const redirectToSignInPage = () => {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  };

  console.log(request.cookies.getAll());

  // Check for session validity
  try {
    await apiCall(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/is_authenticated`,
      {
        method: 'GET',
        headers: {
          Cookie: `Authentication=`,
        },
      }
    );
  } catch (error) {
    redirectToSignInPage();
  }

  // Refresh token
  try {
    await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: 'GET',
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|sign-in|sign-out).*)'],
};
