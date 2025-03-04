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
}

interface InvoiceResponse{
  response: Invoice[];
  count: number;

}

interface KPI {
  [key: string]: number | string;
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

const API_URL = 'https://invoice-ofiservices.pythonanywhere.com/api/';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getInvoices = async (filters: InvoiceFilters = {}): Promise<Invoice[]> => {
  try {
    const response: AxiosResponse<Invoice[]> = await apiClient.get('/invoices/', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};


export const getKPIs = async (): Promise<KPI> => {
  try {
    const response: AxiosResponse<KPI> = await apiClient.get('/kpis/');
    return response.data;
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    throw error;
  }
};
export type { Invoice, KPI, InvoiceFilters, InvoiceResponse };