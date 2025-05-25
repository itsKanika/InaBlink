import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, ExternalLink, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: string;
  active: boolean;
}

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const feedSources: FeedSource[] = [
    { id: '1', name: 'Hacker News', url: 'https://news.ycombinator.com/', category: 'news', active: true },
    { id: '2', name: 'GitHub Trending', url: 'https://github.com/trending', category: 'code', active: true },
    { id: '3', name: 'TechCrunch', url: 'https://techcrunch.com/', category: 'news', active: true },
    { id: '4', name: 'Reddit r/MachineLearning', url: 'https://www.reddit.com/r/MachineLearning/', category: 'ai', active: false },
    { id: '5', name: 'Product Hunt', url: 'https://www.producthunt.com/', category: 'products', active: true },
    { id: '6', name: 'Hacker Noon', url: 'https://hackernoon.com/', category: 'news', active: false },
    { id: '7', name: 'DevTo', url: 'https://dev.to/', category: 'code', active: false },
    { id: '8', name: 'YCombinator', url: 'https://www.ycombinator.com/blog/', category: 'startups', active: false },
    { id: '9', name: 'AngelList Jobs', url: 'https://angel.co/jobs', category: 'jobs', active: true },
    { id: '10', name: 'Towards Data Science', url: 'https://towardsdatascience.com/', category: 'ai', active: true },
  ];
  
  const categories = [
    { id: 'all', name: 'All Sources' },
    { id: 'news', name: 'Tech News' },
    { id: 'code', name: 'Developer' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'products', name: 'Product Launches' },
    { id: 'startups', name: 'Startups' },
    { id: 'jobs', name: 'Job Boards' }
  ];
  
  // Filter sources based on search and category
  const filteredSources = feedSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || source.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Explore Feed Sources</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage data sources for the InaBlink tech news aggregator
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and filters */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <h2 className="font-semibold flex items-center">
                <Search size={18} className="mr-2 text-blue-500" />
                Search Sources
              </h2>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Filter size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter by Category</span>
                </div>
                
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Local feed upload */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <h2 className="font-semibold flex items-center">
                <FileText size={18} className="mr-2 text-blue-500" />
                Local Feed Files
              </h2>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                Drop .txt or .json files in the /feeds directory to simulate new content for testing
              </p>
              
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                <p className="text-slate-500 dark:text-slate-400 mb-2">Drag and drop files here</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Supported formats: .txt, .json
                </p>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg mb-2">
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm">sample_feed.json</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {format(new Date(), 'MMM d, h:mm a')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feed sources list */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
              <h2 className="font-semibold">Available Feed Sources</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {filteredSources.length} sources
              </span>
            </div>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredSources.length > 0 ? (
                filteredSources.map(source => (
                  <div key={source.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-slate-900 dark:text-white">{source.name}</h3>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            source.active 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {source.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="mt-1 flex items-center">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {categories.find(c => c.id === source.category)?.name || source.category}
                          </span>
                          
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 ml-3 flex items-center"
                          >
                            Visit source <ExternalLink size={12} className="ml-1" />
                          </a>
                        </div>
                      </div>
                      
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <span className="mr-2 text-xs text-slate-500 dark:text-slate-400">
                            {source.active ? 'Enabled' : 'Disabled'}
                          </span>
                          <div className="relative">
                            <input type="checkbox" className="sr-only" checked={source.active} readOnly />
                            <div className={`w-10 h-5 rounded-full transition-colors ${
                              source.active ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                            }`}></div>
                            <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                              source.active ? 'transform translate-x-5' : ''
                            }`}></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No sources match your search criteria
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">How Pathway Powers InaBlink</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Pathway continuously monitors all active feed sources, instantly processing and indexing new content as it arrives. 
              This enables real-time updates in the dashboard without manual refreshing or rebuilding indexes.
              For a demo, simply toggle sources on/off or add local feed files to see immediate changes.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Explore;