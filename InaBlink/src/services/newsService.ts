import axios from 'axios';
import { NewsItem, TrendingData } from '../types/news';
import { simulateNetworkDelay } from '../utils/helpers';

// Mock news data
const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI Releases GPT-5 with Enhanced Reasoning Capabilities',
    summary: 'The latest model showcases significant improvements in logical reasoning and problem-solving abilities.',
    content: 'OpenAI has announced the release of GPT-5, the next iteration of its large language model technology. The new model demonstrates substantial improvements in logical reasoning, problem-solving, and understanding of complex instructions...',
    url: 'https://example.com/news/openai-gpt5',
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'TechCrunch',
    category: 'ai',
    tags: ['AI', 'OpenAI', 'GPT-5'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() // 10 minutes ago
  },
  {
    id: '2',
    title: 'Google Introduces New LLM-Powered Search Experience',
    summary: 'The search giant is rolling out AI-generated overviews for complex queries across all users.',
    content: 'Google is expanding its AI Overview feature to all users, bringing generative AI capabilities to its core search product. The new feature provides concise summaries for complex queries, with cited sources and follow-up questions...',
    url: 'https://example.com/news/google-ai-search',
    imageUrl: 'https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'The Verge',
    category: 'ai',
    tags: ['Google', 'Search', 'AI'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '3',
    title: 'GitHub Copilot Reaches 100 Million Active Users',
    summary: 'The AI-powered coding assistant has seen rapid adoption among developers worldwide.',
    content: 'GitHub announced today that its AI pair programming tool, GitHub Copilot, has reached the milestone of 100 million active users. The tool, powered by OpenAI\'s technology, has transformed developer workflows by providing contextual code suggestions...',
    url: 'https://example.com/news/github-copilot-milestone',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'GitHub Blog',
    category: 'dev',
    tags: ['GitHub', 'Copilot', 'Developer Tools'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
  },
  {
    id: '4',
    title: 'Rust Becomes Second Most Loved Programming Language in Stack Overflow Survey',
    summary: 'The language continues to gain popularity for its performance and safety features.',
    content: 'According to the latest Stack Overflow Developer Survey, Rust has climbed to become the second most loved programming language among developers. Known for its focus on performance and memory safety, Rust has gained significant adoption in systems programming...',
    url: 'https://example.com/news/rust-popularity',
    imageUrl: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'Stack Overflow',
    category: 'dev',
    tags: ['Rust', 'Programming', 'Developer Survey'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
  },
  {
    id: '5',
    title: 'Anthropic Secures $750M in Funding to Challenge OpenAI',
    summary: 'The AI safety company continues to grow with substantial new investment.',
    content: 'Anthropic, the AI safety company founded by former OpenAI researchers, has secured $750 million in new funding. The investment will be used to develop more capable and safer AI systems, specifically focused on their Claude assistant...',
    url: 'https://example.com/news/anthropic-funding',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'TechCrunch',
    category: 'startups',
    tags: ['Anthropic', 'Funding', 'AI Startups'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString() // 3 hours ago
  },
  {
    id: '6',
    title: 'Tesla Announces New AI Training Supercomputer',
    summary: 'The automotive company builds new computing infrastructure for its self-driving technology.',
    content: 'Tesla has revealed details about its next-generation AI training supercomputer, designed specifically for advancing the company\'s Full Self-Driving technology. The custom-built system features thousands of GPUs and represents a significant investment in AI infrastructure...',
    url: 'https://example.com/news/tesla-ai-computer',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'Electrek',
    category: 'ai',
    tags: ['Tesla', 'Supercomputer', 'Self-Driving'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString() // 4 hours ago
  },
  {
    id: '7',
    title: 'Meta AI Open-Sources Llama 3 Small and Medium Models',
    summary: 'The company continues its open-source AI strategy with new model releases.',
    content: 'Meta AI has announced the open-source release of two smaller variants of its Llama 3 language model. The new 8B and 70B parameter models are designed to be more accessible for researchers and developers with limited computing resources...',
    url: 'https://example.com/news/meta-llama3-release',
    imageUrl: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'Meta AI Blog',
    category: 'ai',
    tags: ['Meta AI', 'Llama 3', 'Open Source'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString() // 5 hours ago
  },
  {
    id: '8',
    title: 'Amazon Web Services Announces AI-Powered Database Optimization',
    summary: 'New intelligent features will automatically tune database performance.',
    content: 'AWS has introduced a suite of AI-powered features for its database services that will automatically optimize performance, scaling, and cost. The new capabilities use machine learning to analyze usage patterns and make real-time adjustments...',
    url: 'https://example.com/news/aws-database-ai',
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'AWS Blog',
    category: 'dev',
    tags: ['AWS', 'Databases', 'Cloud Computing'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString() // 6 hours ago
  },
  {
    id: '9',
    title: 'Senior ML Engineer Positions at OpenAI See Record Applications',
    summary: 'The AI research lab has received over 20,000 applications for recent job openings.',
    content: 'OpenAI\'s recent job postings for Senior Machine Learning Engineers have attracted more than 20,000 applications, reflecting the intense interest in working at the company behind ChatGPT and DALL-E. The positions offer competitive compensation packages...',
    url: 'https://example.com/news/openai-job-applications',
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'Business Insider',
    category: 'jobs',
    tags: ['OpenAI', 'Jobs', 'ML Engineer'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString() // 7 hours ago
  },
  {
    id: '10',
    title: 'Microsoft Announces New Remote Developer Positions',
    summary: 'The tech giant is expanding its remote work options for software engineers.',
    content: 'Microsoft has announced hundreds of new remote developer positions across its various product teams. The move is part of the company\'s commitment to flexible work arrangements and expanding its talent pool beyond traditional tech hubs...',
    url: 'https://example.com/news/microsoft-remote-jobs',
    imageUrl: 'https://images.pexels.com/photos/3182775/pexels-photo-3182775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    source: 'Microsoft Careers',
    category: 'jobs',
    tags: ['Microsoft', 'Remote Work', 'Developer Jobs'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString() // 8 hours ago
  }
];

// Mock trending data
const mockTrendingData: TrendingData = {
  topics: [
    { title: 'Large Language Models', mentions: 4230, change: 15 },
    { title: 'Artificial General Intelligence', mentions: 3150, change: 8 },
    { title: 'Quantum Computing', mentions: 2760, change: -3 },
    { title: 'Cybersecurity', mentions: 2340, change: 5 },
    { title: 'Edge Computing', mentions: 1890, change: 12 }
  ],
  repositories: [
    { name: 'llama.cpp', author: 'ggerganov', stars: 45800, change: 18 },
    { name: 'langchain', author: 'langchain-ai', stars: 32400, change: 5 },
    { name: 'Pathway', author: 'pathwaycom', stars: 28900, change: 25 },
    { name: 'stable-diffusion-webui', author: 'AUTOMATIC1111', stars: 25600, change: 3 },
    { name: 'deno', author: 'denoland', stars: 21300, change: 7 }
  ],
  tools: [
    { name: 'Pathway', category: 'Data Processing', users: 28500, change: 32 },
    { name: 'Perplexity AI', category: 'Search Engine', users: 24200, change: 18 },
    { name: 'Vercel AI SDK', category: 'Developer Tools', users: 18700, change: 15 },
    { name: 'Replit Ghostwriter', category: 'Coding Assistant', users: 16400, change: 9 },
    { name: 'Nvidia NIM', category: 'AI Microservices', users: 12800, change: 22 }
  ],
  jobs: [
    { title: 'ML Engineer', company: 'OpenAI', salary: '280-380' },
    { title: 'Senior Frontend Engineer', company: 'Anthropic', salary: '220-300' },
    { title: 'Data Engineer', company: 'Pathway', salary: '190-250' },
    { title: 'AI Researcher', company: 'Google DeepMind', salary: '250-350' },
    { title: 'Quantum Computing Scientist', company: 'IBM Quantum', salary: '240-320' }
  ]
};

// Simulate network requests with mock data
export const getNewsFeeds = async (): Promise<NewsItem[]> => {
  await simulateNetworkDelay();
  return mockNewsItems;
};

export const getTrendingTopics = async (): Promise<TrendingData> => {
  await simulateNetworkDelay(800);
  return mockTrendingData;
};

// This function would eventually be implemented to ingest from real sources
export const ingestFromSource = async (source: string): Promise<boolean> => {
  await simulateNetworkDelay(1500);
  console.log(`Ingesting from ${source}...`);
  return true;
};

// This is a placeholder for the actual Pathway integration
// In a real implementation, this would connect to the Pathway backend
export const initializePathwayPipeline = async (): Promise<boolean> => {
  await simulateNetworkDelay(2000);
  console.log('Initializing Pathway pipeline...');
  return true;
};

// Simulate processing content through the Pathway RAG system
export const processContentWithRAG = async (query: string): Promise<string> => {
  await simulateNetworkDelay(1200);
  
  const responses: Record<string, string> = {
    'ai': 'Based on recent news, AI development is accelerating with OpenAI\'s GPT-5 release and Google\'s new LLM-powered search features.',
    'jobs': 'The tech job market shows strong demand for ML Engineers and AI Researchers, with companies like OpenAI and Microsoft expanding their teams.',
    'trends': 'Current tech trends include large language models, quantum computing, and edge computing applications.',
    'default': 'I\'ve analyzed the latest tech news across multiple sources. The major topics include AI advancements, developer tools, and increasing investments in startups focused on AI infrastructure.'
  };
  
  // Simple keyword matching for demo purposes
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('ai') || lowercaseQuery.includes('gpt')) {
    return responses.ai;
  } else if (lowercaseQuery.includes('job') || lowercaseQuery.includes('career')) {
    return responses.jobs;
  } else if (lowercaseQuery.includes('trend') || lowercaseQuery.includes('popular')) {
    return responses.trends;
  } else {
    return responses.default;
  }
};