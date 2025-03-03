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
  Region:string;
  Payment_Method:string;
  Description:string;
  Special_Instructions:string;

}

interface KPI {
  [key: string]: number | string;
}

interface InvoiceFilters {
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
    console.log('Filtros enviados a la API:', filters);
    const response: AxiosResponse<Invoice[]> = await apiClient.get('/invoices/', { params: filters });
    console.log('URL completa de la petición:', response.request.responseURL); // Esto muestra la URL final con los parámetros
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
export type { Invoice, KPI, InvoiceFilters };