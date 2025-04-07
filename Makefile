.PHONY: setup install start stop clean test lint help format docker-build deploy

# Colors for terminal output
GREEN=\033[0;32m
NC=\033[0m

# Default target
.DEFAULT_GOAL := help

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: install db-setup ## Complete setup of the application

install: ## Install all dependencies
	@echo "${GREEN}Installing Ruby dependencies...${NC}"
	@bundle install
	@echo "${GREEN}Installing Node.js dependencies...${NC}"
	@npm install

db-setup: ## Setup the database
	@echo "${GREEN}Setting up database...${NC}"
	@bundle exec rails db:create
	@bundle exec rails db:migrate
	@echo "${GREEN}Seeding database...${NC}"
	@bundle exec rails db:seed

start: ## Start the development server
	@echo "${GREEN}Starting development server...${NC}"
	@./bin/dev

stop: ## Stop the development server
	@echo "${GREEN}Stopping development server...${NC}"
	@pkill -f "rails|vite" || true

clean: ## Clean temporary files and logs
	@echo "${GREEN}Cleaning temporary files...${NC}"
	@bundle exec rails log:clear tmp:clear
	@rm -rf node_modules
	@rm -rf tmp/cache

format: ## Format code
	@echo "${GREEN}Formatting code...${NC}"
	@bundle exec rubocop -a
