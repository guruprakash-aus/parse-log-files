"""
Response models for API endpoints
"""
from pydantic import BaseModel, Field
from typing import List


class TopItem(BaseModel):
    """Model for top URL or IP entry"""
    value: str = Field(..., description="URL or IP address")
    count: int = Field(..., description="Number of occurrences")


class LogAnalysisResponse(BaseModel):
    """Response model for log analysis results"""
    total_requests: int = Field(..., description="Total number of requests")
    unique_ip_count: int = Field(..., description="Number of unique IP addresses")
    unique_ips: List[str] = Field(..., description="List of all unique IPs")
    top_urls: List[TopItem] = Field(..., description="Top 3 most visited URLs")
    top_ips: List[TopItem] = Field(..., description="Top 3 most active IPs")
    all_url_stats: List[TopItem] = Field(..., description="All URLs with counts")
    all_ip_stats: List[TopItem] = Field(..., description="All IPs with counts")
    
    class Config:
        json_schema_extra = {
            "example": {
                "total_requests": 23,
                "unique_ip_count": 11,
                "unique_ips": ["177.71.128.21", "168.41.191.40"],
                "top_urls": [
                    {"value": "/docs/manage-websites/", "count": 2},
                    {"value": "/intranet-analytics/", "count": 1}
                ],
                "top_ips": [
                    {"value": "168.41.191.40", "count": 4},
                    {"value": "177.71.128.21", "count": 3}
                ],
                "all_url_stats": [],
                "all_ip_stats": []
            }
        }


class ErrorResponse(BaseModel):
    """Error response model"""
    detail: str = Field(..., description="Error message")