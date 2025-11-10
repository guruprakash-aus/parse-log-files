# HTTP Log Analyzer
## Overview
The Http Log Analyzer helps the users to analyze their server logs and get meaningful data insights from it. 

## Quick Start
- **Option 1: Local Development**
  - Python 3.11+
  - Node.js 18+
  - npm or yarn

- **Option 2: Docker** (Recommended)
  - Docker 20.10+
  - Docker Compose 2.0+

### Installation & Usage

#### Using Docker (Recommended)
```bash
# Clone the repository
git clone 
cd parse-log-files

# Start all services
make up

# Or without Make:
docker-compose -f docker-compose.yml up -d
```

#### Local Development
```bash
# Clone the repository
git clone 
cd parse-log-files

#Backend in a separate terminal
cd backend
cp .env.sample .env

#Create Virtual environment and activate it
python3 -m venv venv
source venv/bin/activate

#install dependencies and run the backend server
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

#Frontend in a separate terminal
cd frontend
cp .env.sample .env
npm run dev
```

## Access the application:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Testing the application:

### Backend
```bash
cd backend
#Create Virtual environment and activate it
python3 -m venv venv
source venv/bin/activate

#install dependencies and run the tests
pip install -r requirements.txt
pytest tests/ -v --cov=app
```

### Frontend
```bash
cd frontend
#install dependencies and run tests
npm install
npm run test
```


## 📋 Available Commands (Make)
```bash
# Development
make dev                # Start development environment
make logs               # View all logs
make health             # Check service health

# Production
make build              # Build production images
make up                 # Start production services

# Cleanup
make down               # Stop all services
make clean              # Remove all containers and images

# Individual Services
make up-frontend        # Start only frontend
make up-backend         # Start only backend
make logs-frontend      # View frontend logs
make logs-backend       # View backend logs

# Help
make help               # Show all available commands
```

## Assumptions

1. **Log Format**: As Below
```
177.71.121.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"
168.41.193.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
```
2. **File Size**: Logs under 10MB
3. **Processing**: Synchronous processing is acceptable for small files
4. **Malformed Lines**: Skip invalid lines rather than fail completely
5. **Case Sensitivity**: URLs are case-sensitive
6. **Log Files supplied by user**: Users provide the log files for analysis

## Design Decisions

### Technology Decisions
**Frontend: React + TypeScript + Vite**
- **Why React?** Component reusability, large ecosystem, excellent testing tools
- **Why TypeScript?** Type safety, better IDE support, fewer runtime errors
- **Why Vite?** Fast development server, optimized builds, modern tooling

**Backend: Python + FastAPI**
- **Why Python?** Excellent for text processing, readable, extensive libraries
- **Why FastAPI?** Automatic API docs, fast performance, modern async support, type hints

**Testing: Vitest (Frontend), Pytest (Backend)**
- **Why Vitest?** Fast, native support for esmodules, simple syntax like jest
- **Why Pytest?** Simple syntax, powerful fixtures, excellent coverage tools

### Architectural Patterns
**Frontend:**
- Component-based architecture
- Custom hooks for business logic
- Service layer for API calls
- Separation of concerns (UI, logic, data)

**Backend:**
- Layered architecture (routes → services → core)
- Single responsibility principle
- Dependency injection
- Modular design for testability


## Features

### Current Features
- ✅ Drag-and-drop file upload
- ✅ Log format parsing
- ✅ Real-time log analysis
- ✅ Interactive data visualizations
- ✅ Top 3 most visited URLs
- ✅ Top 3 most active IP addresses
- ✅ Unique IP address counting
- ✅ Complete URL and IP statistics
- ✅ RESTful API with automatic documentation
- ✅ Comprehensive test coverage
- ✅ Docker containerization
- ✅ Responsive design

### Future Enhancements

- 🔄 Support for additional log formats
- 🔄 Cloud Native (AWS/Azure/GCP) setup for automation
- 🔄 Message Queing setup for asynchronous parsing of the file
- 🔄 Date/time range filtering
- 🔄 Export reports (PDF, CSV)
- 🔄 Real-time log streaming
- 🔄 Advanced analytics (geographic data, user agents)
- 🔄 Alert system for anomalies
- 🔄 Multi-user support with authentication
- 🔄 Setup End-to-End Playwright tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Guruprakash Rajendran - Initial work
