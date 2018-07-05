#!/bin/bash

docker-compose build
docker-compose run --rm php composer install
docker-compose run --rm node yarn
docker-compose up
