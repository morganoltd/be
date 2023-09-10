const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/creator',
        destination: '/Creator',
      },
      {
        source: '/profile/:userId',
        destination: '/Profile',
      },
      {
        source: '/authentication',
        destination: '/Auth',
      },
      {
        source: '/shop',
        destination: '/Shop',
      },
      {
        source: '/search',
        destination: '/Search',
      },
      {
        source: '/game/:gameId',
        destination: '/Game',
      },
    ];
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
