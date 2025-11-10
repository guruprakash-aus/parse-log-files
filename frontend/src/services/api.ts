import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { LogAnalysisResult, AnalysisError } from '../types/log-analysis.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance (can be injected for testing)
const createApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
};

export class LogAnalyzerAPI {
  private static client: AxiosInstance = createApiClient();

  // Allow injecting client for testing
  static setClient(client: AxiosInstance) {
    this.client = client;
  }

  /**
   * Analyze a log file
   */
  static async analyzeLog(file: File): Promise<LogAnalysisResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post<LogAnalysisResult>('/analyze', formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AnalysisError>;
        throw new Error(
          axiosError.response?.data?.detail || 'Failed to analyze log file'
        );
      }
      throw new Error('An unexpected error occurred');
    }
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}