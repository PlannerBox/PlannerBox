const { cookies } = require('next/dist/client/components/headers');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  async headers() {
    var cookies = cookies()
    return [{
      key: 'Cookie',
      value: `session=${cookies.get('session')?.value}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`,
    }]
  }
};
