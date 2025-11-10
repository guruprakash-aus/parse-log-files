"""
Tests for log parser
"""
import pytest
from app.core.parser import LogParser, LogEntry


@pytest.fixture
def parser():
    """Create parser instance"""
    return LogParser()


@pytest.fixture
def sample_log_line():
    """Sample valid log line"""
    return '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574'


def test_parse_valid_line(parser, sample_log_line):
    """Test parsing a valid log line"""
    result = parser.parse_line(sample_log_line)
    
    assert result is not None
    assert isinstance(result, LogEntry)
    assert result.ip_address == '177.71.128.21'
    assert result.url == '/intranet-analytics/'
    assert result.method == 'GET'
    assert result.status_code == 200


def test_parse_empty_line(parser):
    """Test parsing an empty line"""
    result = parser.parse_line('')
    assert result is None


def test_parse_invalid_line(parser):
    """Test parsing an invalid log line"""
    invalid_line = 'this is not a valid log line'
    result = parser.parse_line(invalid_line)
    assert result is None


def test_parse_line_with_full_url(parser):
    """Test parsing line with full URL"""
    line = '168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574'
    result = parser.parse_line(line)
    
    assert result is not None
    assert result.url == 'http://example.net/faq/'


def test_parse_file_content(parser):
    """Test parsing multiple lines"""
    content = """177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574
invalid line here
168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574"""
    
    results = parser.parse_file_content(content)
    
    assert len(results) == 3  # Should skip invalid line
    assert all(isinstance(entry, LogEntry) for entry in results)