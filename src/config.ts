type Environment = 'development' | 'production';

const config = {
  development: {
    API_URL: 'https://localhost:52001/api',
  },
  production: {
    API_URL: 'https://api.production.com',
  },
};

const env: Environment = (process.env.NODE_ENV as Environment) || 'development';

export default config[env];
