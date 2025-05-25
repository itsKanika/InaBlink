import { Pipeline, DataSample, TransformationResult } from '../types/pathway';
import { samplePipelines } from '../data/samplePipelines';
import { sampleDatasets, sampleTransformations } from '../data/sampleData';

// Simulating API calls with mock data
export const pathwayService = {
  // Get all available pipelines
  getPipelines: async (): Promise<Pipeline[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(samplePipelines);
      }, 500);
    });
  },

  // Get a specific pipeline by ID
  getPipeline: async (id: string): Promise<Pipeline | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pipeline = samplePipelines.find(p => p.id === id);
        resolve(pipeline);
      }, 300);
    });
  },

  // Start a pipeline execution
  startPipeline: async (id: string): Promise<Pipeline> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pipeline = samplePipelines.find(p => p.id === id);
        if (pipeline) {
          const updatedPipeline = {
            ...pipeline,
            status: 'running' as const,
            nodes: pipeline.nodes.map(node => ({
              ...node,
              status: 'running' as const
            })),
            edges: pipeline.edges.map(edge => ({
              ...edge,
              animated: true
            }))
          };
          resolve(updatedPipeline);
        } else {
          throw new Error(`Pipeline with ID ${id} not found`);
        }
      }, 500);
    });
  },

  // Stop a pipeline execution
  stopPipeline: async (id: string): Promise<Pipeline> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pipeline = samplePipelines.find(p => p.id === id);
        if (pipeline) {
          const updatedPipeline = {
            ...pipeline,
            status: 'idle' as const,
            nodes: pipeline.nodes.map(node => ({
              ...node,
              status: 'idle' as const
            })),
            edges: pipeline.edges.map(edge => ({
              ...edge,
              animated: false
            }))
          };
          resolve(updatedPipeline);
        } else {
          throw new Error(`Pipeline with ID ${id} not found`);
        }
      }, 500);
    });
  },

  // Get sample datasets
  getDatasets: async (): Promise<DataSample[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleDatasets);
      }, 400);
    });
  },

  // Get a specific dataset
  getDataset: async (id: string): Promise<DataSample | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dataset = sampleDatasets.find(d => d.id === id);
        resolve(dataset);
      }, 200);
    });
  },

  // Get transformation results
  getTransformationResults: async (transformationId: string): Promise<TransformationResult | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = sampleTransformations.find(t => t.transformationId === transformationId);
        resolve(result);
      }, 300);
    });
  },

  // Simulate processing data through a transformation
  processData: async (dataId: string, transformationId: string): Promise<TransformationResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dataset = sampleDatasets.find(d => d.id === dataId);
        const existingResult = sampleTransformations.find(t => 
          t.sourceId === dataId && t.transformationId === transformationId
        );
        
        if (existingResult) {
          resolve(existingResult);
        } else if (dataset) {
          const newResult: TransformationResult = {
            id: `result-${Date.now()}`,
            sourceId: dataId,
            transformationId,
            timestamp: new Date().toISOString(),
            inputData: dataset.data,
            outputData: {
              processed: {
                message: "Data successfully processed",
                records: Math.floor(Math.random() * 100) + 1
              }
            }
          };
          resolve(newResult);
        } else {
          throw new Error(`Dataset with ID ${dataId} not found`);
        }
      }, 800);
    });
  }
};