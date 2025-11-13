"""
API routes for log analysis
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.models.responses import LogAnalysisResponse, ErrorResponse
from app.services.log_analyzer import LogAnalyzer

router = APIRouter()
analyzer = LogAnalyzer()


@router.post(
    "/analyze",
    response_model=LogAnalysisResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    },
    summary="Analyze log file",
    description="Upload a log file and receive analysis results"
)
async def analyze_log(file: UploadFile = File(..., description="Log file to analyze")):
    """
    Analyze uploaded log file
    
    - **file**: Log file
    
    Returns analysis including:
    - Total requests
    - Unique IP addresses
    - Top 3 URLs
    - Top 3 IPs
    """
    # Validate file type
    if not file.filename.endswith(('.log', '.txt')):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a .log or .txt file"
        )
    
    try:
        # Read file content
        content = await file.read()
        log_content = content.decode('utf-8')

        # Validate file size (max 10MB)
        if len(log_content) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail="File too large. Maximum size is 10MB"
            )
        
        # Analyze the log
        results = analyzer.analyze(log_content)
        
        return LogAnalysisResponse(**results)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing file: {str(e)}"
        )


@router.get(
    "/health",
    summary="Health check",
    description="Check if the API is running"
)
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "log-analyzer-api"}