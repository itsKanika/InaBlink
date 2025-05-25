import { Pipeline } from '../types/pathway';

export const samplePipelines: Pipeline[] = [
  {
    id: 'pipeline-1',
    name: 'Customer Data Processing',
    status: 'idle',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes: [
      {
        id: 'source-1',
        type: 'source',
        label: 'Customer Database',
        position: { x: 100, y: 100 },
        status: 'idle',
        data: {
          type: 'postgresql',
          table: 'customers'
        }
      },
      {
        id: 'transform-1',
        type: 'transform',
        label: 'Filter Active Customers',
        position: { x: 300, y: 100 },
        status: 'idle',
        data: {
          operation: 'filter',
          condition: 'status = "active"'
        }
      },
      {
        id: 'transform-2',
        type: 'transform',
        label: 'Enrich with Purchase History',
        position: { x: 500, y: 100 },
        status: 'idle',
        data: {
          operation: 'join',
          table: 'purchases',
          key: 'customer_id'
        }
      },
      {
        id: 'sink-1',
        type: 'sink',
        label: 'Analytics Dashboard',
        position: { x: 700, y: 100 },
        status: 'idle',
        data: {
          type: 'dashboard',
          endpoint: '/api/analytics'
        }
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'source-1',
        target: 'transform-1',
        animated: false
      },
      {
        id: 'edge-2',
        source: 'transform-1',
        target: 'transform-2',
        animated: false
      },
      {
        id: 'edge-3',
        source: 'transform-2',
        target: 'sink-1',
        animated: false
      }
    ]
  },
  {
    id: 'pipeline-2',
    name: 'Real-time Event Processing',
    status: 'idle',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes: [
      {
        id: 'source-2',
        type: 'source',
        label: 'Event Stream',
        position: { x: 100, y: 100 },
        status: 'idle',
        data: {
          type: 'kafka',
          topic: 'user-events'
        }
      },
      {
        id: 'transform-3',
        type: 'transform',
        label: 'Parse JSON',
        position: { x: 300, y: 100 },
        status: 'idle',
        data: {
          operation: 'parse',
          format: 'json'
        }
      },
      {
        id: 'transform-4',
        type: 'transform',
        label: 'Categorize Events',
        position: { x: 500, y: 100 },
        status: 'idle',
        data: {
          operation: 'map',
          mapping: 'event_type => category'
        }
      },
      {
        id: 'sink-2',
        type: 'sink',
        label: 'Metrics Database',
        position: { x: 700, y: 100 },
        status: 'idle',
        data: {
          type: 'timeseries-db',
          measurement: 'user_activity'
        }
      }
    ],
    edges: [
      {
        id: 'edge-4',
        source: 'source-2',
        target: 'transform-3',
        animated: false
      },
      {
        id: 'edge-5',
        source: 'transform-3',
        target: 'transform-4',
        animated: false
      },
      {
        id: 'edge-6',
        source: 'transform-4',
        target: 'sink-2',
        animated: false
      }
    ]
  }
];