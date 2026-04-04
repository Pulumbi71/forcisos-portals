import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authApi, apiClient } from '@forcisos/api';
import { LoginRequest, User } from '@forcisos/types';

declare module 'next-auth' {
  interface Session { user: User & { token: string; refreshToken: string; }; }
  interface JWT { user: User; token: string; refreshToken: string; expiresAt: number; }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error('Invalid credentials');
        try {
          const loginRequest: LoginRequest = { email: credentials.email, password: credentials.password };
          const response = await authApi.login(loginRequest);
          if (!response.success || !response.data) throw new Error(response.error?.message || 'Login failed');
          const { user, token, refreshToken } = response.data;
          apiClient.setToken(token);
          return { ...user, token, refreshToken, id: user.id, email: user.email };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Auth error';
          throw new Error(message);
        }
      },
    }),
  ],
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
        token.token = (user as User & { token: string }).token;
        token.refreshToken = (user as User & { refreshToken: string }).refreshToken;
        token.expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      }
      if (token.expiresAt && Date.now() < token.expiresAt * 1000) return token;
      try {
        if (!token.refreshToken) throw new Error('No refresh token available');
        const response = await authApi.refresh(token.refreshToken);
        if (!response.success || !response.data) throw new Error('Refresh failed');
        const { token: newToken, refreshToken: newRefreshToken } = response.data;
        apiClient.setToken(newToken);
        return { ...token, token: newToken, refreshToken: newRefreshToken, expiresAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60 };
      } catch (error) {
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },
    async session({ session, token }) {
      if (token.error === 'RefreshAccessTokenError') return { ...session, error: 'RefreshAccessTokenError' };
      return { ...session, user: { ...token.user, token: token.token, refreshToken: token.refreshToken } };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
