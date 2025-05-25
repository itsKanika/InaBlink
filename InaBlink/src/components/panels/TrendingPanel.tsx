import React, { useState } from 'react';
import { TrendingUp, Star, Briefcase, PenTool as Tool, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { getTrendingTopics } from '../../services/newsService';

interface TrendingPanelProps {
  onSourceSelect: (source: string) => void;
}

const TrendingPanel: React.FC<TrendingPanelProps> = ({ onSourceSelect }) => {
  const [activeTab, setActiveTab] = useState<string>('topics');
  
  const { data: trending, isLoading } = useQuery('trendingTopics', getTrendingTopics, {
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  
  const tabs = [
    { id: 'topics', label: 'Topics', icon: <TrendingUp size={16} /> },
    { id: 'repos', label: 'Repos', icon: <Star size={16} /> },
    { id: 'tools', label: 'Tools', icon: <Tool size={16} /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={16} /> },
  ];
  
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'topics':
        return (
          <div className="space-y-3">
            {trending?.topics.map((topic, index) => (
              <TrendingItem 
                key={index}
                title={topic.title}
                value={topic.mentions}
                change={topic.change}
                onClick={() => onSourceSelect(topic.title)}
              />
            ))}
          </div>
        );
      case 'repos':
        return (
          <div className="space-y-3">
            {trending?.repositories.map((repo, index) => (
              <TrendingItem 
                key={index}
                title={repo.name}
                subtitle={repo.author}
                value={repo.stars}
                change={repo.change}
                isRepo
                onClick={() => onSourceSelect('GitHub')}
              />
            ))}
          </div>
        );
      case 'tools':
        return (
          <div className="space-y-3">
            {trending?.tools.map((tool, index) => (
              <TrendingItem 
                key={index}
                title={tool.name}
                subtitle={tool.category}
                value={tool.users}
                change={tool.change}
                onClick={() => onSourceSelect('Product Hunt')}
              />
            ))}
          </div>
        );
      case 'jobs':
        return (
          <div className="space-y-3">
            {trending?.jobs.map((job, index) => (
              <TrendingItem 
                key={index}
                title={job.title}
                subtitle={job.company}
                value={job.salary}
                isSalary
                onClick={() => onSourceSelect('Job Boards')}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      className="h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <h2 className="font-semibold flex items-center">
          <BarChart2 size={18} className="mr-2 text-blue-500" />
          Trending Now
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Popular in tech right now
        </p>
      </div>
      
      <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex justify-center items-center px-2 py-2 text-xs rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {renderTabContent()}
      </div>
    </motion.div>
  );
};

interface TrendingItemProps {
  title: string;
  subtitle?: string;
  value: number | string;
  change?: number;
  isRepo?: boolean;
  isSalary?: boolean;
  onClick: () => void;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ 
  title, 
  subtitle, 
  value, 
  change,
  isRepo = false,
  isSalary = false,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm truncate max-w-[180px]">
            {isRepo && <Star size={14} className="inline mr-1 text-amber-500" />}
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-sm font-semibold">
            {isSalary ? (
              <span>${typeof value === 'number' ? value.toLocaleString() : value}k</span>
            ) : (
              <span>{typeof value === 'number' ? value.toLocaleString() : value}</span>
            )}
            {isRepo && <span className="text-xs ml-1 text-amber-500">★</span>}
          </div>
          
          {change !== undefined && (
            <p className={`text-xs ${
              change > 0 
                ? 'text-emerald-500' 
                : change < 0 
                ? 'text-red-500' 
                : 'text-slate-500 dark:text-slate-400'
            }`}>
              {change > 0 ? '↑' : change < 0 ? '↓' : ''}
              {Math.abs(change)}%
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingPanel;