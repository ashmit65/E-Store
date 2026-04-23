const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');

module.exports = composePlugins(withNx(), (config) => {
  // 1. Force Bundling: Remove workspace packages from externals
  if (Array.isArray(config.externals)) {
    config.externals = config.externals.filter(ext => {
      if (typeof ext === 'string') {
        return !ext.includes('@estore/');
      }
      return true;
    });
  }

  // 2. Explicit Aliases: Ensure they point to the SOURCE files
  config.resolve.alias = {
    ...config.resolve.alias,
    '@estore/error-handler-internal': join(__dirname, '../../packages/lib/error-handler/index.ts'),
    '@estore/prisma': join(__dirname, '../../packages/lib/prisma/index.ts'),
    '@estore/redis': join(__dirname, '../../packages/lib/redis/index.ts'),
  };

  // 3. Output configuration
  config.output = {
    ...config.output,
    path: join(__dirname, 'dist'),
    clean: true,
  };

  return config;
});
