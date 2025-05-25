import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, RefreshCw, Info } from 'lucide-react';
import { useQuery } from 'react-query';
import PipelineFlow from '../components/PipelineFlow';
import NodeDetails from '../components/NodeDetails';
import { pathwayService } from '../services/pathwayService';
import { Pipeline, PipelineNode } from '../types/pathway';

const PipelineViewer: React.FC = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<string>('pipeline-1');
  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const { 
    data: pipelines,
    isLoading: pipelinesLoading
  } = useQuery('pipelines', pathwayService.getPipelines);
  
  const {
    data: pipeline,
    isLoading: pipelineLoading,
    refetch: refetchPipeline
  } = useQuery(
    ['pipeline', selectedPipeline],
    () => pathwayService.getPipeline(selectedPipeline),
    { enabled: !!selectedPipeline }
  );
  
  // Handle node selection
  const handleNodeClick = (node: PipelineNode) => {
    setSelectedNode(node);
  };
  
  // Start pipeline execution
  const handleStartPipeline = async () => {
    if (!selectedPipeline || isRunning) return;
    
    setIsRunning(true);
    try {
      await pathwayService.startPipeline(selectedPipeline);
      refetchPipeline();
    } catch (error) {
      console.error('Failed to start pipeline:', error);
    }
  };
  
  // Stop pipeline execution
  const handleStopPipeline = async () => {
    if (!selectedPipeline || !isRunning) return;
    
    try {
      await pathwayService.stopPipeline(selectedPipeline);
      refetchPipeline();
      setIsRunning(false);
    } catch (error) {
      console.error('Failed to stop pipeline:', error);
    }
  };
  
  // Update running state based on pipeline status
  useEffect(() => {
    if (pipeline) {
      setIsRunning(pipeline.status === 'running');
    }
  }, [pipeline]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pipeline Viewer</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Visualize and control Pathway data processing pipelines
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {isRunning ? (
            <button
              onClick={handleStopPipeline}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center transition-colors"
            >
              <Square size={16} className="mr-2" />
              Stop Pipeline
            </button>
          ) : (
            <button
              onClick={handleStartPipeline}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center transition-colors"
            >
              <Play size={16} className="mr-2" />
              Start Pipeline
            </button>
          )}
          
          <button
            onClick={() => refetchPipeline()}
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            title="Refresh pipeline"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Pipeline selector */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <h2 className="font-semibold">Available Pipelines</h2>
            </div>
            
            <div className="p-3">
              {pipelinesLoading ? (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : pipelines && pipelines.length > 0 ? (
                <div className="space-y-2">
                  {pipelines.map((p: Pipeline) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPipeline(p.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedPipeline === p.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs mt-1 flex items-center">
                        <span className={`h-2 w-2 rounded-full ${
                          p.status === 'running' 
                            ? 'bg-green-500 animate-pulse' 
                            : p.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-slate-400 dark:bg-slate-500'
                        } mr-1.5`}></span>
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                  No pipelines available
                </div>
              )}
            </div>
          </div>
          
          {/* Node details panel */}
          <div className="mt-6">
            <NodeDetails node={selectedNode} />
          </div>
        </div>
        
        {/* Pipeline visualization */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
              <h2 className="font-semibold">Pipeline Visualization</h2>
              
              {pipeline && (
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${
                    pipeline.status === 'running' 
                      ? 'bg-green-500 animate-pulse' 
                      : pipeline.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-slate-400 dark:bg-slate-500'
                  } mr-1.5`}></span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Status: {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-3">
              {pipelineLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : pipeline ? (
                <PipelineFlow pipeline={pipeline} onNodeClick={handleNodeClick} />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
                  <Info size={48} className="mb-4 opacity-50" />
                  <p>Select a pipeline to visualize</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Tech stack note */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">About Pathway Integration</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This visualization represents data pipelines powered by Pathway - a powerful framework for real-time data processing and streaming. 
              Pathway enables continuous monitoring of data sources, on-the-fly indexing, and real-time updates to the InaBlink dashboard.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineViewer;