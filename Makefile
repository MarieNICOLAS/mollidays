# Makefile

init: ## Build and start containers
	docker compose build
	docker compose up -d
	docker compose exec backend python manage.py migrate
	docker compose exec backend python manage.py createsuperuser

up: ## Start containers
	docker compose up -d

down: ## Stop containers
	docker compose down

logs: ## Show logs
	docker compose logs -f

reset-db: ## Reset the PostgreSQL volume
	docker compose down -v
	docker compose up -d
	docker compose exec backend python manage.py migrate
