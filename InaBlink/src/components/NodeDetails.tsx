import React from 'react';
import { PipelineNode } from '../types/pathway';
import { Info, Activity, Clock, Database } from 'lucide-react';

interface NodeDetailsProps {
  node: PipelineNode | null;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node }) => {
  if (!node) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-center h-32 text-slate-400 dark:text-slate-500">
          <Info className="mr-2" size={20} />
          <span>Select a node to view details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <h3 className="font-semibold">Node Details</h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h4 className="font-medium text-slate-900 dark:text-slate-100">{node.name}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{node.type}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Activity className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-300">Status: </span>
            <span className={`ml-2 ${
              node.status === 'running' 
                ? 'text-green-600 dark:text-green-400'
                : node.status === 'error'
                ? 'text-red-600 dark:text-red-400'
                : 'text-slate-600 dark:text-slate-300'
            }`}>
              {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-300">
              Processing Time: {node.processingTime}ms
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Database className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-300">
              Records Processed: {node.recordsProcessed.toLocaleString()}
            </span>
          </div>
        </div>
        
        {node.error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{node.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDetails;