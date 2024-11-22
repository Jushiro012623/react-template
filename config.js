exports = {
  development: {
    api_url: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database:  process.env.DB_DATABASE || 'node-todolist',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_CONNECTION || 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_PROD_USERNAME || 'yourProductionUser',
    password: process.env.DB_PASSWORD || 'defaultProductionPassword',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
