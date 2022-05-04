module.exports = {
  webpack5: true,
  images: {
    domains: ['gravatar.com','avatars.githubusercontent.com',"v.qq.com"]
  },
  eslint: {
    dirs: [
      'components',
      'layouts',
      'lib',
      'pages'
    ]
  },
  async headers () {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          }
        ]
      }
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }
    return config
  },
  async rewrites() { 
    return [ 
     //接口请求 前缀带上/api-text/
      { source: '/api/:path*', destination: `http://localhost:8101/api/:path*` }, 

    ]
  }
}
