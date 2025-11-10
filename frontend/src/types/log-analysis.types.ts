export interface TopItem {
  value: string;
  count: number;
}

export interface LogAnalysisResult {
  total_requests: number;
  unique_ip_count: number;
  unique_ips: string[];
  top_urls: TopItem[];
  top_ips: TopItem[];
  all_url_stats: TopItem[];
  all_ip_stats: TopItem[];
}

export interface AnalysisError {
  detail: string;
}

export interface UploadState {
  isLoading: boolean;
  error: string | null;
  data: LogAnalysisResult | null;
}