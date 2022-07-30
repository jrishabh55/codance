module.exports = {
  compiler: {
    emotion: true,
  },
  experimental: {
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  swcMinify: true,
};
