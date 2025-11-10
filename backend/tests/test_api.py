"""
Tests for API endpoints
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_analyze_endpoint_with_valid_file():
    """Test analyze endpoint with valid log file"""
    log_content = """177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574"""
    
    files = {"file": ("test.log", log_content.encode(), "text/plain")}
    response = client.post("/api/v1/analyze", files=files)
    
    assert response.status_code == 200
    data = response.json()
    assert data["total_requests"] == 2
    assert data["unique_ip_count"] == 2


def test_analyze_endpoint_with_invalid_file_type():
    """Test analyze endpoint with invalid file type"""
    files = {"file": ("test.pdf", b"fake content", "application/pdf")}
    response = client.post("/api/v1/analyze", files=files)
    
    assert response.status_code == 400
    assert "Invalid file type" in response.json()["detail"]


def test_analyze_endpoint_with_empty_file():
    """Test analyze endpoint with empty file"""
    files = {"file": ("test.log", b"", "text/plain")}
    response = client.post("/api/v1/analyze", files=files)
    
    assert response.status_code == 200
    data = response.json()
    assert data["total_requests"] == 0