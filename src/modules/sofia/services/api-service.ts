// services/apiService.ts
import axios, { AxiosResponse } from "axios";

interface Agent {
  response: string;
}

interface AgentAlerts {
  Alert: {
    type: string;
    message: string;
    UUID: string;
    content: {
      new_invoices: number,
      new_duplicate_invoices: number;
    };
    
  };
}

const API_URL = "http://52.201.138.164:5001/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAgentResponse = async (message: string): Promise<Agent> => {
  try {
    const response: AxiosResponse<Agent> = await apiClient.post(
      "/ai/ai_assistant/",
      { message: message }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching agent response:", error);
    throw error;
  }
};

export const getAgentAlerts = async (): Promise<AgentAlerts> => {
  try {
    const response: AxiosResponse<AgentAlerts> = await apiClient.get(
      "/ai/alerts/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching agent response:", error);
    throw error;
  }
};

export type {
  Agent,
  AgentAlerts,
};
