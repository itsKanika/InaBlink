export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  tags: string[];
  publishedAt: string;
}

export interface TrendingTopic {
  title: string;
  mentions: number;
  change: number;
}

export interface TrendingRepository {
  name: string;
  author: string;
  stars: number;
  change: number;
}

export interface TrendingTool {
  name: string;
  category: string;
  users: number;
  change: number;
}

export interface TrendingJob {
  title: string;
  company: string;
  salary: string;
}

export interface TrendingData {
  topics: TrendingTopic[];
  repositories: TrendingRepository[];
  tools: TrendingTool[];
  jobs: TrendingJob[];
}