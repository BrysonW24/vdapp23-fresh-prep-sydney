# Fresh Prep Sydney - Makefile

.PHONY: help install dev build start lint type-check test db-generate db-migrate db-studio db-seed mobile-sync clean clean-all

# Colors
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

help:
	@echo "$(BLUE)Fresh Prep Sydney - Command Reference$(NC)"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  make install       - Install dependencies"
	@echo "  make dev           - Start Next.js dev server"
	@echo "  make build         - Build for production"
	@echo "  make start         - Start production server"
	@echo ""
	@echo "$(YELLOW)Database (Prisma):$(NC)"
	@echo "  make db-generate   - Generate Prisma client"
	@echo "  make db-migrate    - Run database migrations"
	@echo "  make db-studio     - Open Prisma Studio"
	@echo "  make db-seed       - Seed the database"
	@echo ""
	@echo "$(YELLOW)Mobile (Capacitor):$(NC)"
	@echo "  make mobile-sync   - Sync Capacitor project"
	@echo ""
	@echo "$(YELLOW)Quality:$(NC)"
	@echo "  make test          - Run tests"
	@echo "  make lint          - Run Next.js linter"
	@echo "  make type-check    - Run TypeScript compiler check"
	@echo ""
	@echo "$(YELLOW)Maintenance:$(NC)"
	@echo "  make clean         - Remove build artifacts"
	@echo "  make clean-all     - Deep clean (includes node_modules)"
	@echo ""
	@echo "$(YELLOW)Quick Start:$(NC)"
	@echo "  make quick-start   - Install + DB setup + start dev"

install:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install

dev:
	@echo "$(BLUE)Starting Next.js dev server...$(NC)"
	npm run dev

build:
	@echo "$(BLUE)Building for production...$(NC)"
	npm run build

start:
	@echo "$(BLUE)Starting production server...$(NC)"
	npm run start

db-generate:
	@echo "$(BLUE)Generating Prisma client...$(NC)"
	npm run db:generate

db-migrate:
	@echo "$(BLUE)Running database migrations...$(NC)"
	npm run db:migrate

db-studio:
	@echo "$(BLUE)Opening Prisma Studio...$(NC)"
	npm run db:studio

db-seed:
	@echo "$(BLUE)Seeding database...$(NC)"
	npm run db:seed

mobile-sync:
	@echo "$(BLUE)Syncing Capacitor project...$(NC)"
	npm run sync:capacitor

test:
	@echo "$(BLUE)Running tests...$(NC)"
	npm test

lint:
	@echo "$(BLUE)Running linter...$(NC)"
	npm run lint

type-check:
	@echo "$(BLUE)Checking types...$(NC)"
	npm run type-check

clean:
	@echo "$(BLUE)Cleaning build artifacts...$(NC)"
	rm -rf .next out
	@echo "$(GREEN)Cleaned build artifacts$(NC)"

clean-all: clean
	@echo "$(BLUE)Deep clean...$(NC)"
	rm -rf node_modules ios/Pods ios/build
	@echo "$(GREEN)Deep clean complete$(NC)"

quick-start:
	@echo "$(BLUE)Quick start setup...$(NC)"
	make install
	make db-generate
	@echo "$(GREEN)Setup complete! Run 'make dev' to start$(NC)"
