up:
	docker-compose up -d

down:
	docker-compose down

up-build:
	docker-compose up --build -d
	
restart-front:
	docker container restart dc-front