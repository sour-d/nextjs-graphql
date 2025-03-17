module.exports = (api) => {
  const isTest = api.env('test');

  if (isTest) {
    return {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime'],
    };
  }

  // Default configuration for Next.js (if any)
  return {};
};