import { useState } from 'react';
import type { LogAnalysisResult } from '../types/log-analysis.types';
import { LogAnalyzerAPI } from '../services/api';

export interface UseLogAnalysisReturn {
  data: LogAnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  analyzeFile: (file: File) => Promise<void>;
  reset: () => void;
}

export const useLogAnalysis = (): UseLogAnalysisReturn => {
  const [data, setData] = useState<LogAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFile = async (file: File): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await LogAnalyzerAPI.analyzeLog(file);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    analyzeFile,
    reset,
  };
};