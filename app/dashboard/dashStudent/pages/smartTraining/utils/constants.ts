// API Configuration
export const API_CONFIG = {
    ENDPOINTS: {
      ANALYTICAL_STATISTICS: '/api/Statistics/GetAnalyticalStatistics',
      // Add other endpoints here as needed
    },
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  };
  
  // Statistics Configuration
  export const STATISTICS_CONFIG = {
    REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    SUCCESS_THRESHOLD: 70, // Percentage
    WARNING_THRESHOLD: 50, // Percentage
  };
  
  // Colors for statistics display
  export const STATISTICS_COLORS = {
    SUCCESS: 'text-green-600',
    WARNING: 'text-orange-600',
    ERROR: 'text-red-600',
    PRIMARY: 'text-purple-600',
    SECONDARY: 'text-gray-600',
  };