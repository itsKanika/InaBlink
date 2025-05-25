import { DataSample, TransformationResult } from '../types/pathway';

export const sampleDatasets: DataSample[] = [
  {
    id: 'data-1',
    name: 'Customer Records',
    timestamp: new Date().toISOString(),
    data: {
      customers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', purchases: 12 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', purchases: 5 },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', status: 'active', purchases: 18 },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', purchases: 7 }
      ]
    }
  },
  {
    id: 'data-2',
    name: 'Event Stream',
    timestamp: new Date().toISOString(),
    data: {
      events: [
        { user_id: 101, event_type: 'page_view', page: '/home', timestamp: '2023-05-10T12:30:45Z' },
        { user_id: 102, event_type: 'button_click', element: 'signup_button', timestamp: '2023-05-10T12:31:20Z' },
        { user_id: 101, event_type: 'form_submit', form: 'contact', timestamp: '2023-05-10T12:32:15Z' },
        { user_id: 103, event_type: 'page_view', page: '/products', timestamp: '2023-05-10T12:33:10Z' }
      ]
    }
  }
];

export const sampleTransformations: TransformationResult[] = [
  {
    id: 'transform-result-1',
    sourceId: 'data-1',
    transformationId: 'transform-1',
    timestamp: new Date().toISOString(),
    inputData: {
      customers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', purchases: 12 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', purchases: 5 },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', status: 'active', purchases: 18 },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', purchases: 7 }
      ]
    },
    outputData: {
      activeCustomers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', purchases: 12 },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', status: 'active', purchases: 18 },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', purchases: 7 }
      ]
    }
  },
  {
    id: 'transform-result-2',
    sourceId: 'data-2',
    transformationId: 'transform-3',
    timestamp: new Date().toISOString(),
    inputData: {
      events: [
        { user_id: 101, event_type: 'page_view', page: '/home', timestamp: '2023-05-10T12:30:45Z' },
        { user_id: 102, event_type: 'button_click', element: 'signup_button', timestamp: '2023-05-10T12:31:20Z' },
        { user_id: 101, event_type: 'form_submit', form: 'contact', timestamp: '2023-05-10T12:32:15Z' },
        { user_id: 103, event_type: 'page_view', page: '/products', timestamp: '2023-05-10T12:33:10Z' }
      ]
    },
    outputData: {
      parsedEvents: [
        { user_id: 101, event_type: 'page_view', page: '/home', timestamp: '2023-05-10T12:30:45Z', category: 'navigation' },
        { user_id: 102, event_type: 'button_click', element: 'signup_button', timestamp: '2023-05-10T12:31:20Z', category: 'interaction' },
        { user_id: 101, event_type: 'form_submit', form: 'contact', timestamp: '2023-05-10T12:32:15Z', category: 'conversion' },
        { user_id: 103, event_type: 'page_view', page: '/products', timestamp: '2023-05-10T12:33:10Z', category: 'navigation' }
      ]
    }
  }
];