export interface PipelineNode {
  id: string;
  type: 'source' | 'transform' | 'sink';
  label: string;
  position: {
    x: number;
    y: number;
  };
  data?: any;
  status?: 'idle' | 'running' | 'completed' | 'error';
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: React.CSSProperties;
}

export interface Pipeline {
  id: string;
  name: string;
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  status: 'idle' | 'running' | 'completed' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface DataSample {
  id: string;
  name: string;
  data: Record<string, any>;
  timestamp: string;
}

export interface TransformationResult {
  id: string;
  sourceId: string;
  transformationId: string;
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  timestamp: string;
}