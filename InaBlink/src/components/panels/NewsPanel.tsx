import React, { useState, useEffect } from 'react';
import { Filter, Globe, ArrowUpRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import NewsItem from '../news/NewsItem';
import { getNewsFeeds } from '../../services/newsService';
import { NewsItem as NewsItemType } from '../../types/news';

interface NewsPanelProps {
  selectedSource: string | null;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ selectedSource }) => {
  const [filter, setFilter] = useState<string>('all');
  const [items, setItems] = useState<NewsItemType[]>([]);
  
  const { data: newsFeeds, isLoading, isError, refetch } = useQuery('newsFeeds', getNewsFeeds, {
    refetchInterval: 60000, // Refetch every minute
  });
  
  useEffect(() => {
    if (newsFeeds) {
      let filteredItems = [...newsFeeds];
      
      // Apply source filter if selected
      if (selectedSource) {
        filteredItems = filteredItems.filter(item => item.source === selectedSource);
      }
      
      // Apply category filter
      if (filter !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === filter);
      }
      
      setItems(filteredItems);
    }
  }, [newsFeeds, filter, selectedSource]);
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'dev', label: 'Dev Tools' },
    { id: 'startups', label: 'Startups' },
    { id: 'jobs', label: 'Jobs' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      className="h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
        <div>
          <h2 className="font-semibold flex items-center">
            <Globe size={18} className="mr-2 text-blue-500" />
            Tech News Feed
            {selectedSource && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                {selectedSource}
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Latest updates from the tech world
          </p>
        </div>
        
        <button 
          onClick={() => refetch()} 
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          title="Refresh feed"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </div>
      
      <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-x-auto">
        <div className="flex space-x-2">
          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center">
            <Filter size={14} className="mr-1 text-slate-500 dark:text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Filter:</span>
          </div>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                filter === category.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading && items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400">Loading news feed...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-red-500 mb-2">Failed to load news</p>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-slate-500 dark:text-slate-400 mb-2">No news items match your filters</p>
            <button 
              onClick={() => setFilter('all')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Show All News
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {items.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
        <span>Last updated: {format(new Date(), 'MMM d, yyyy h:mm a')}</span>
        <a 
          href="#" 
          className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all <ArrowUpRight size={14} className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default NewsPanel;