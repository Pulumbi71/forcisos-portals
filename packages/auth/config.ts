import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@forcisos/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://forcisos.com/wp-json/fc/v2';

declare module 'next-auth' {
  interface Session {
    user: User & {
      token: string;
      refreshToken: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    token: string;
    refreshToken: string;
    expiresAt: number;
  }
}

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.email,
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const result = await response.json();

          if (!response.ok || result.success === false) {
            throw new Error(
              result.error?.message || result.error || result.message || 'Invalid credentials'
            );
          }

          // Handle multiple response formats from WordPress
          // Format 1: { success: true, data: { user: {...}, token, refreshToken } }
          // Format 2: { success: true, data: { id, email, ..., token, refreshToken } }
          // Format 3: { token, user: {...} }
          // Format 4: { token, id, email, ... }
          const payload = result.data || result;

          let user: Record<string, unknown>;
          let token: string;
          let refreshToken: string;

          if (payload.user && typeof payload.user === 'object') {
            // Nested user object
            user = payload.user;
            token = payload.token;
            refreshToken = payload.refreshToken || payload.refresh_token || '';
          } else {
            // Flat structure - user fields mixed with token
            token = payload.token || payload.access_token || '';
            refreshToken = payload.refreshToken || payload.refresh_token || '';
            // Extract user fields (everything except tokens)
            const { token: _t, refreshToken: _rt, refresh_token: _rt2, access_token: _at, expiresIn: _e, expires_in: _e2, success: _s, ...userFields } = payload;
            user = userFields;
          }

          if (!token) {
            throw new Error('No token received from server');
          }

          // Normalize user id - WordPress might use numeric ID or string
          const userId = String(user.id || user.ID || user.user_id || '');
          const userEmail = String(user.email || user.user_email || credentials.email);
          const firstName = String(user.firstName || user.first_name || user.display_name || '');
          const lastName = String(user.lastName || user.last_name || '');
          const role = String(user.role || user.user_role || (Array.isArray(user.roles) ? user.roles[0] : '') || '');

          return {
            id: userId,
            email: userEmail,
            name: firstName + (lastName ? ' ' + lastName : ''),
            firstName,
            lastName,
            role,
            avatar: String(user.avatar || user.avatar_url || ''),
            token,
            refreshToken,
          } as any;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Authentication failed';
          throw new Error(message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as unknown as User;
        token.token = (user as any).token;
        token.refreshToken = (user as any).refreshToken;
        token.expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token.user,
          token: token.token,
          refreshToken: token.refreshToken,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
