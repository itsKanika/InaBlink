import React, { useState, useCallback, useEffect } from 'react';
import { Pipeline, PipelineNode, PipelineEdge } from '../types/pathway';

interface PipelineFlowProps {
  pipeline: Pipeline;
  onNodeClick?: (node: PipelineNode) => void;
}

// A simplified flow diagram renderer since we can't use react-flow-renderer directly
const PipelineFlow: React.FC<PipelineFlowProps> = ({ pipeline, onNodeClick }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = useCallback((node: PipelineNode) => {
    setSelectedNode(node.id);
    if (onNodeClick) {
      onNodeClick(node);
    }
  }, [onNodeClick]);

  // Map of node types to colors
  const nodeColors = {
    source: 'bg-blue-500',
    transform: 'bg-purple-500',
    sink: 'bg-green-500'
  };

  // Map of node status to status indicator colors
  const statusColors = {
    idle: 'bg-gray-400',
    running: 'bg-yellow-400 animate-pulse',
    completed: 'bg-green-400',
    error: 'bg-red-500'
  };

  return (
    <div className="relative w-full h-[400px] border border-gray-200 rounded-lg bg-slate-50 overflow-auto p-4">
      {/* Render nodes */}
      {pipeline.nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute p-3 rounded-lg shadow-md w-48 cursor-pointer transform transition-all duration-200 ${
            selectedNode === node.id ? 'ring-2 ring-blue-500 scale-105' : ''
          } ${nodeColors[node.type] || 'bg-gray-500'} text-white`}
          style={{
            left: `${node.position.x}px`,
            top: `${node.position.y}px`,
          }}
          onClick={() => handleNodeClick(node)}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{node.label}</span>
            <span 
              className={`h-3 w-3 rounded-full ${statusColors[node.status || 'idle']}`}
              title={node.status}
            ></span>
          </div>
          <div className="text-xs mt-1 opacity-80">{node.type}</div>
        </div>
      ))}

      {/* Render simplified edges (just straight lines) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>
        {pipeline.edges.map((edge) => {
          const sourceNode = pipeline.nodes.find(n => n.id === edge.source);
          const targetNode = pipeline.nodes.find(n => n.id === edge.target);
          
          if (!sourceNode || !targetNode) return null;
          
          // Calculate the edge path
          const startX = sourceNode.position.x + 192; // Add node width
          const startY = sourceNode.position.y + 24; // Add half node height
          const endX = targetNode.position.x;
          const endY = targetNode.position.y + 24; // Add half node height
          
          return (
            <g key={edge.id}>
              <path
                d={`M ${startX} ${startY} L ${endX} ${endY}`}
                stroke="#94a3b8"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                className={edge.animated ? 'animate-dash' : ''}
                strokeDasharray={edge.animated ? "5,5" : "0"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PipelineFlow;