// services/apiService.ts
import axios, { AxiosResponse } from 'axios';

// Definición de interfaces
interface Invoice {
  id: string | number;
  reference: string;
  vendor: string;
  pattern: string;
  open: boolean;
  group_id: string;
  date: string;
  value:string;
  confidence:string;
  region:string;
  payment_method:string;
  description:string;
  special_instructions:string;
  accuracy: number;
}

interface InvoiceResponse{
  results: Invoice[];
  count: number;
}

interface KPI {
  [key: string]: number | string;
}

interface Agent {
  response: string;
}

interface InvoiceFilters {
  page?:number;
  reference?: string;
  vendor?: string;
  pattern?: string;
  open?: boolean;
  group_id?: string;
  start_date?: string;
  end_date?: string;
  value?:string;
  confidence?:string;
}

interface InvoicesMetadata {
  reference_values: string[];
  vendor_values: string[];
  pattern_values: string[];
  date_values: string[];
}

const API_URL = 'https://invoice-ofiservices.pythonanywhere.com/';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getInvoices = async (filters: InvoiceFilters = {}): Promise<InvoiceResponse> => {
  try {
    const response: AxiosResponse<InvoiceResponse> = await apiClient.get('/api/invoices/', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoicesMetadata = async (): Promise<InvoicesMetadata> => {
  try {
    const response: AxiosResponse<InvoicesMetadata> = await apiClient.get('/api/metadata/');
    return response.data;
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    throw error;
  }
};

export const getAgentResponse = async (message:string): Promise<Agent> => {
  try {
    const response: AxiosResponse<Agent> = await apiClient.post('/ai/ai_assistant/', {message: message} );
    console.log("Response",response);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching agent response:', error);
    throw error;
  }
};

export const getKPIs = async (): Promise<KPI> => {
  try {
    const response: AxiosResponse<KPI> = await apiClient.get('/api/kpis/');
    return response.data;
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    throw error;
  }
};
export type { Invoice, KPI, InvoiceFilters, InvoiceResponse, InvoicesMetadata, Agent };