import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatPanel from '../components/panels/ChatPanel';
import NewsPanel from '../components/panels/NewsPanel';
import TrendingPanel from '../components/panels/TrendingPanel';

const Dashboard: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Chat Panel - Left */}
      <div className="lg:col-span-3">
        <ChatPanel />
      </div>
      
      {/* News Panel - Center */}
      <div className="lg:col-span-6">
        <NewsPanel selectedSource={selectedSource} />
      </div>
      
      {/* Trending Panel - Right */}
      <div className="lg:col-span-3">
        <TrendingPanel onSourceSelect={setSelectedSource} />
      </div>
    </motion.div>
  );
};

export default Dashboard;