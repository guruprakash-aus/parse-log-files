# Multi-stage build for Python FastAPI backend (no virtualenv; install to /usr/local)

# Builder stage
FROM python:3.12-slim AS builder
ENV PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
WORKDIR /app

# Build tools for any native deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
  && rm -rf /var/lib/apt/lists/*

# Dependencies layer
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --prefix=/install -r requirements.txt

# Runtime stage
FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Bring in site-packages and scripts into /usr/local
COPY --from=builder /install /usr/local

# App code
COPY . .

# Non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Healthcheck without external deps
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request,sys; \
    urllib.request.urlopen('http://localhost:8000/api/v1/health', timeout=2).read(); \
    sys.exit(0)" || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]