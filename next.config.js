const { withBlitz } = require("@blitzjs/next");

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  webpack(config, options) {
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

module.exports = withBlitz(nextConfig);
