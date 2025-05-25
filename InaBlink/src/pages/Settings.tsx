import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Key, Database, RefreshCw, Monitor, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('60');
  const [apiKey, setApiKey] = useState('');
  const [categories, setCategories] = useState({
    ai: true,
    dev: true,
    startups: true,
    jobs: true
  });
  
  const handleCategoryToggle = (category: keyof typeof categories) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend or localStorage
    alert('Settings saved successfully!');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Configure your InaBlink experience
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <h2 className="font-semibold flex items-center">
                <SettingsIcon size={18} className="mr-2 text-blue-500" />
                Settings Menu
              </h2>
            </div>
            
            <div className="p-3">
              <div className="space-y-2">
                {[
                  { id: 'general', name: 'General Settings', icon: <Monitor size={16} /> },
                  { id: 'notifications', name: 'Notifications', icon: <Bell size={16} /> },
                  { id: 'api', name: 'API Configuration', icon: <Key size={16} /> },
                  { id: 'data', name: 'Data Sources', icon: <Database size={16} /> },
                ].map(item => (
                  <button
                    key={item.id}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  >
                    <span className="mr-2 text-slate-500 dark:text-slate-400">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSaveSettings}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <h2 className="font-semibold">User Preferences</h2>
              </div>
              
              <div className="p-4 space-y-6">
                {/* Refresh settings */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                    <RefreshCw size={16} className="mr-2 text-blue-500" />
                    Data Refresh Settings
                  </h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <label className="block mb-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300 block mb-1">
                        Refresh interval (seconds)
                      </span>
                      <select
                        value={refreshInterval}
                        onChange={(e) => setRefreshInterval(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="30">30 seconds</option>
                        <option value="60">1 minute</option>
                        <option value="300">5 minutes</option>
                        <option value="600">10 minutes</option>
                      </select>
                    </label>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      How often Pathway will fetch new data from sources
                    </p>
                  </div>
                </div>
                
                {/* Notification settings */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                    <Bell size={16} className="mr-2 text-blue-500" />
                    Notification Settings
                  </h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <label className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        Enable desktop notifications
                      </span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={notificationsEnabled}
                          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        />
                        <div className={`w-10 h-5 rounded-full transition-colors ${
                          notificationsEnabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`}></div>
                        <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                          notificationsEnabled ? 'transform translate-x-5' : ''
                        }`}></div>
                      </div>
                    </label>
                    
                    {notificationsEnabled && (
                      <div className="space-y-2 mb-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-500" defaultChecked />
                          <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Breaking news</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-500" defaultChecked />
                          <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Trending topics</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-500" />
                          <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Daily digest</span>
                        </label>
                      </div>
                    )}
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Get notified about important updates
                    </p>
                  </div>
                </div>
                
                {/* API key settings */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                    <Key size={16} className="mr-2 text-blue-500" />
                    API Configuration
                  </h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <label className="block mb-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300 block mb-1">
                        LLM API Key (OpenAI/Anthropic/etc.)
                      </span>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Required for AI-powered summarization and chat responses
                    </p>
                  </div>
                </div>
                
                {/* Content preferences */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                    <Database size={16} className="mr-2 text-blue-500" />
                    Content Preferences
                  </h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                      Select categories to display:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-500"
                          checked={categories.ai}
                          onChange={() => handleCategoryToggle('ai')}
                        />
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">AI & ML</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-500"
                          checked={categories.dev}
                          onChange={() => handleCategoryToggle('dev')}
                        />
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Dev Tools</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-500"
                          checked={categories.startups}
                          onChange={() => handleCategoryToggle('startups')}
                        />
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Startups</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-blue-500"
                          checked={categories.jobs}
                          onChange={() => handleCategoryToggle('jobs')}
                        />
                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Jobs</span>
                      </label>
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pathway will filter content based on these preferences
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors"
                >
                  <Save size={16} className="mr-2" />
                  Save Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;