up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose up --build
	
restart-api:
	docker container restart dc-api
	
restart-front:
	docker container restart dc-front

reset-db:
	docker volume rm daily-cue_mongo