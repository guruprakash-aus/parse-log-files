"""
Log analyzer service - business logic for analyzing parsed logs
"""
from collections import Counter
from typing import List, Dict, Any
from app.core.parser import LogEntry, LogParser


class LogAnalyzer:
    """Service for analyzing log entries"""
    
    def __init__(self):
        """Initialize the analyzer"""
        self.parser = LogParser()
    
    def analyze(self, log_content: str) -> Dict[str, Any]:
        """
        Analyze log file content and return statistics
        
        Args:
            log_content: Raw log file content
            
        Returns:
            Dictionary containing analysis results
        """
        # Parse all entries
        entries = self.parser.parse_file_content(log_content)
        
        if not entries:
            return self._empty_result()
        
        # # Extract data for analysis
        # ip_addresses = [entry.ip_address for entry in entries]
        # urls = [entry.url for entry in entries]
        
        # # Calculate statistics
        # unique_ips = set(ip_addresses)
        # url_counter = Counter(urls)
        # ip_counter = Counter(ip_addresses)
        

        #Optimal Performance for the analyze function
        ip_counter: Counter[str] = Counter()
        url_counter: Counter[str] = Counter()
        for e in entries:
            ip_counter[e.ip_address] += 1
            url_counter[e.url] += 1

        unique_ips = list(ip_counter.keys())

        return {
            'total_requests': len(entries),
            'unique_ip_count': len(unique_ips),
            'unique_ips': list(unique_ips),
            'top_urls': self._format_top_items(url_counter, 3),
            'top_ips': self._format_top_items(ip_counter, 3),
            'all_url_stats': self._format_all_items(url_counter),
            'all_ip_stats': self._format_all_items(ip_counter),
        }
    
    def _format_top_items(self, counter: Counter, limit: int) -> List[Dict[str, Any]]:
        """Format top N items from Counter"""
        return [
            {'value': item, 'count': count}
            for item, count in counter.most_common(limit)
        ]
    
    def _format_all_items(self, counter: Counter) -> List[Dict[str, Any]]:
        """Format all items from Counter, sorted by count"""
        return [
            {'value': item, 'count': count}
            for item, count in counter.most_common()
        ]
    
    def _empty_result(self) -> Dict[str, Any]:
        """Return empty result structure"""
        return {
            'total_requests': 0,
            'unique_ip_count': 0,
            'unique_ips': [],
            'top_urls': [],
            'top_ips': [],
            'all_url_stats': [],
            'all_ip_stats': [],
        }