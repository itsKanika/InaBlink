import React from 'react';
import { Clock, Tag, ExternalLink } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { NewsItem as NewsItemType } from '../../types/news';

interface NewsItemProps {
  item: NewsItemType;
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  const isNew = new Date().getTime() - new Date(item.publishedAt).getTime() < 1000 * 60 * 30; // 30 minutes
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        {item.imageUrl && (
          <div className="shrink-0">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {item.source}
            </span>
            
            {isNew && (
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1 animate-pulse"></span>
                LIVE
              </span>
            )}
            
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <Clock size={12} className="mr-1" />
              {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="font-medium text-slate-900 dark:text-white mb-1">
            {item.title}
          </h3>
          
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
            {item.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Tag size={14} className="text-slate-400 mr-1" />
              <div className="flex space-x-1">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              Read more <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsItem;