/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [options.defaultLoaders.babel],
    });

    return config;
  },
};
