Run Hasura GraphQL engine using Docker
Table of contents

Prerequisites
Step 1: Get the docker-run.sh bash script
Step 2: Configure the docker-run.sh script
Step 3: Run the Hasura Docker container
Step 4: Open the Hasura console
Step 5: Track existing tables and relationships
Advanced
This guide assumes that you already have Postgres running and helps you set up the Hasura GraphQL engine using Docker and connect it to your Postgres database.

Prerequisites
Docker
Step 1: Get the docker-run.sh bash script
The hasura/graphql-engine/install-manifests repo contains all installation manifests required to deploy Hasura anywhere.

Get the Docker run bash script from there:

$ wget https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-run/docker-run.sh
Step 2: Configure the docker-run.sh script
The docker-run.sh script has a sample Docker run command in it. The following changes have to be made to the command:

Database URL
Network config
Database URL
Edit the HASURA_GRAPHQL_DATABASE_URL env var value, so that you can connect to your Postgres instance.

#! /bin/bash
docker run -d -p 8080:8080 \
  -e HASURA_GRAPHQL_DATABASE_URL=postgres://username:password@hostname:port/dbname \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  hasura/graphql-engine:latest
Examples of HASURA_GRAPHQL_DATABASE_URL:

postgres://admin:password@localhost:5432/my-db
postgres://admin:@localhost:5432/my-db (if there is no password)
Note

If your password contains special characters (e.g. #, %, $, @, etc.), you need to URL encode them in the HASURA_GRAPHQL_DATABASE_URL env var (e.g. %40 for @).

You can check the logs to see if the database credentials are proper and if Hasura is able to connect to the database.

Hasura GraphQL engine needs access permissions to your Postgres database as described in Postgres permissions.

Network config
If your Postgres instance is running on localhost, the following changes will be needed to the docker run command to allow the Docker container to access the host’s network:

Add the --net=host flag to access the host’s Postgres service.

This is what your command should look like:

docker run -d --net=host \
  -e HASURA_GRAPHQL_DATABASE_URL=postgres://username:password@hostname:port/dbname \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  hasura/graphql-engine:latest
Step 3: Run the Hasura Docker container
Execute docker-run.sh & check if everything is running well:

$ ./docker-run.sh
$ docker ps

CONTAINER ID  IMAGE                    ...  CREATED  STATUS  PORTS           ...
097f58433a2b  hasura/graphql-engine..  ...  1m ago   Up 1m   8080->8080/tcp  ...
Step 4: Open the Hasura console
Head to http://localhost:8080/console to open the Hasura console.

Step 5: Track existing tables and relationships
See Setting up a GraphQL schema using an existing database to enable GraphQL over the database.