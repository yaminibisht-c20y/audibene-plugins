module.exports = (config) => {
  return {
    ...(config || {}),
    rootDir: './',
    setupFilesAfterEnv: ['./tests/setup/setupTests.js'],
  };
};
