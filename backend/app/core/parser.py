"""
Log parser module - handles parsing of individual log lines
"""
import re
from typing import Optional, Tuple
from dataclasses import dataclass


@dataclass
class LogEntry:
    """Represents a single parsed log entry"""
    ip_address: str
    timestamp: str
    method: str
    url: str
    status_code: int
    
    
class LogParser:
    """Parser for log files"""
    
    # Regex pattern for Apache Common/Combined log format
    LOG_PATTERN = re.compile(
        r'^(\S+) '           # IP address
        r'\S+ \S+ '          # identd and userid
        r'\[([^\]]+)\] '     # timestamp
        r'"(\S+) '           # HTTP method
        r'([^\s"]+)'         # URL
        r'[^"]*" '           # HTTP version
        r'(\d{3})'           # status code
    )
    
    def __init__(self):
        """Initialize the parser"""
        self.valid_methods = {'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'}
    
    def parse_line(self, line: str) -> Optional[LogEntry]:
        """
        Parse a single log line
        
        Args:
            line: Raw log line string
            
        Returns:
            LogEntry object if parsing successful, None otherwise
        """
        if not line or not line.strip():
            return None
            
        match = self.LOG_PATTERN.match(line)
        if not match:
            return None
        
        try:
            ip_address, timestamp, method, url, status_code = match.groups()
            
            # Validate HTTP method
            if method not in self.valid_methods:
                return None
            
            return LogEntry(
                ip_address=ip_address,
                timestamp=timestamp,
                method=method,
                url=url,
                status_code=int(status_code)
            )
        except (ValueError, AttributeError):
            return None
    
    def parse_file_content(self, content: str) -> list[LogEntry]:
        """
        Parse entire log file content
        
        Args:
            content: Full log file content as string
            
        Returns:
            List of successfully parsed LogEntry objects
        """
        entries = []
        for line in content.splitlines():
            entry = self.parse_line(line)
            if entry:
                entries.append(entry)
        return entries