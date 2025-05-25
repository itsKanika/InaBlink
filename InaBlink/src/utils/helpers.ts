// Helper to simulate network delay for mock API calls
export const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Format large numbers for display
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else {
    return num.toString();
  }
};

// Extract domain from URL
export const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch (error) {
    return url;
  }
};

// Calculate read time for an article
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};