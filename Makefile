.PHONY: help build up down logs clean test prod restart ps health

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
RED := \033[0;31m
YELLOW := \033[0;33m
NC := \033[0m # No Color

## help: Display this help message
help:
	@echo "$(BLUE)╔═══════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║         Log Analyzer - Docker Commands                ║$(NC)"
	@echo "$(BLUE)╚═══════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## //' | awk 'BEGIN {FS = ":"}; {printf "$(GREEN)%-30s$(NC) %s\n", $$1, $$2}'
	@echo ""

## build: Build all Docker images
build:
	@echo "$(BLUE)Building all Docker images...$(NC)"
	docker-compose build

## up: Start all services (production)
up:
	@echo "$(GREEN)Starting all services in production mode...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Services started!$(NC)"
	@echo ""
	@echo "$(YELLOW)Access points:$(NC)"
	@echo "  Frontend:         http://localhost:3000"
	@echo "  Python Backend:   http://localhost:8000"
	@echo "  Python API Docs:  http://localhost:8000/docs"
	@echo ""

## down: Stop all services
down:
	@echo "$(RED)Stopping all services...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Services stopped!$(NC)"

## restart: Restart all services
restart: down up

## logs: View logs from all services
logs:
	docker-compose logs -f

## logs-frontend: View frontend logs
logs-frontend:
	docker-compose logs -f frontend

## logs-backend: View backend logs
logs-backend:
	docker-compose logs -f backend

## ps: List all running containers
ps:
	@echo "$(BLUE)Running containers:$(NC)"
	docker-compose ps

## health: Check health status of all services
health:
	@echo "$(BLUE)Checking service health...$(NC)"
	@echo ""
	@echo "$(YELLOW)Frontend:$(NC)"
	@curl -s http://localhost:3000/health || echo "$(RED)✗ Frontend not responding$(NC)"
	@echo ""
	@echo "$(YELLOW)Python Backend:$(NC)"
	@curl -s http://localhost:8000/api/v1/health | grep -q "healthy" && echo "$(GREEN)✓ Python backend healthy$(NC)" || echo "$(RED)✗ Python backend unhealthy$(NC)"
	@echo ""

## clean: Remove all containers, images, and volumes
clean:
	@echo "$(RED)Cleaning up Docker resources...$(NC)"
	docker-compose down -v --rmi all --remove-orphans
	@echo "$(GREEN)✓ Cleanup complete!$(NC)"

## prune: Remove all unused Docker resources
prune:
	@echo "$(RED)Pruning unused Docker resources...$(NC)"
	docker system prune -af --volumes
	@echo "$(GREEN)✓ Prune complete!$(NC)"


## shell-frontend: Open shell in frontend container
shell-frontend:
	docker-compose exec frontend sh

## shell-backend: Open shell in Python backend container
shell-backend:
	docker-compose exec backend bash

## build-frontend: Build only frontend
build-frontend:
	docker-compose build frontend

## build-backend: Build only backend
build-backend:
	docker-compose build backend

## up-frontend: Start only frontend
up-frontend:
	docker-compose up -d frontend

## up-backend: Start only Python backend
up-backend:
	docker-compose up -d backend

## prod: Build and start all services in production mode
prod: build up

## install: Initial setup - build and start all services
install:
	@echo "$(BLUE)Installing Log Analyzer...$(NC)"
	@echo "$(YELLOW)Building images...$(NC)"
	@make build
	@echo "$(YELLOW)Starting services...$(NC)"
	@make up
	@echo "$(GREEN)✓ Installation complete!$(NC)"
	@make health