// Database connection configuration
export const DB_URL = process.env.DATABASE_URL || '';

// Application settings
export const APP_SECRET = process.env.APP_SECRET || 'your_secret_key';
export const PORT = process.env.PORT || 3000;

// Token settings
export const TOKEN_EXPIRY = 60 * 60 * 24; // 24 hours

// Email settings for password reset
export const PASSWORD_RESET_TOKEN_EXPIRY = 60 * 60 * 2; // 2 hours