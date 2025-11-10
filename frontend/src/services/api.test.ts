import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { type AxiosInstance } from 'axios';
import { LogAnalyzerAPI } from './api';

describe('LogAnalyzerAPI', () => {
  let mockAxiosInstance: Partial<AxiosInstance>;

  beforeEach(() => {
    // Create a mock axios instance
    mockAxiosInstance = {
      post: vi.fn(),
      get: vi.fn(),
    };

    // Inject the mock into the API class
    LogAnalyzerAPI.setClient(mockAxiosInstance as AxiosInstance);
  });

  it('analyzes log file successfully', async () => {
    const mockResponse = {
      data: {
        total_requests: 10,
        unique_ip_count: 5,
        unique_ips: ['192.168.1.1'],
        top_urls: [],
        top_ips: [],
        all_url_stats: [],
        all_ip_stats: [],
      },
    };

    vi.mocked(mockAxiosInstance.post!).mockResolvedValue(mockResponse);

    const file = new File(['test'], 'test.log', { type: 'text/plain' });
    const result = await LogAnalyzerAPI.analyzeLog(file);

    expect(result.total_requests).toBe(10);
    expect(result.unique_ip_count).toBe(5);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/analyze', expect.any(FormData));
  });

  it('handles API errors correctly', async () => {
    const mockError = {
      response: {
        data: {
          detail: 'Invalid file type',
        },
      },
      isAxiosError: true,
    };

    vi.mocked(mockAxiosInstance.post!).mockRejectedValue(mockError);
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    await expect(LogAnalyzerAPI.analyzeLog(file)).rejects.toThrow('Invalid file type');
  });

  it('handles unknown errors', async () => {
    vi.mocked(mockAxiosInstance.post!).mockRejectedValue(new Error('Network error'));
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

    const file = new File(['test'], 'test.log', { type: 'text/plain' });

    await expect(LogAnalyzerAPI.analyzeLog(file)).rejects.toThrow('An unexpected error occurred');
  });

  it('checks health successfully', async () => {
    vi.mocked(mockAxiosInstance.get!).mockResolvedValue({ data: { status: 'healthy' } });

    const result = await LogAnalyzerAPI.healthCheck();

    expect(result).toBe(true);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/health');
  });

  it('returns false when health check fails', async () => {
    vi.mocked(mockAxiosInstance.get!).mockRejectedValue(new Error('Server down'));

    const result = await LogAnalyzerAPI.healthCheck();

    expect(result).toBe(false);
  });
});