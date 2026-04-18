/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@forcisos/types', '@forcisos/api', '@forcisos/auth', '@forcisos/ui', '@forcisos/supabase'],
};

module.exports = nextConfig;
