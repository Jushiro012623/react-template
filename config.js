let config;

switch (import.meta.env.VITE_API_URL) {
    case 'development':
        config = {
            api_url: import.meta.env.VITE_API_DEV_URL || 'http://127.0.0.1:8080/api',
            app_url: import.meta.env.VITE_APP_DEV_URL || 'localhost',
            app_port: import.meta.env.VITE_APP_DEV_PORT || '5175',
        };
        break;

    case 'staging':
        config = {
            api_url: import.meta.env.VITE_API_STAGING_URL,
            app_url: import.meta.env.VITE_APP_STAGING_URL,
            app_port: import.meta.env.VITE_APP_DEV_PORT,
        };
        break;
    case 'production':
        config = {
            api_url: import.meta.env.VITE_API_PROD_URL,
            app_url: import.meta.env.VITE_APP_PROD_URL,
            app_port: import.meta.env.VITE_APP_DEV_PORT,
        };
        break;
    default:
        config = {
            api_url: import.meta.env.VITE_API_DEV_URL || 'http://127.0.0.1:8080/api',
            app_url: import.meta.env.VITE_APP_DEV_URL || 'localhost',
            app_port: import.meta.env.VITE_APP_DEV_PORT || '5175',
        };
        break;
}

export default config;
