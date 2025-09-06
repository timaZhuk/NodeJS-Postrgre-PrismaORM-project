# NodeJS-Postrgre-PrismaORM-project
Here have been used PostgreSQL databse with Prisma ORM, NodeJS, ExpressJS, Prometheus and Grafana for monitoring metrics and Docker, Docker-Compose for the app containerization

### Main info about project:
Project Title
This is a backend application built with Node.js and Express.js, using Prisma as an ORM to interact with a PostgreSQL database. The entire application stack is containerized using Docker and Docker Compose, with Prometheus added for robust monitoring.

🚀 Features
Node.js & Express.js: A fast, unopinionated, minimalist web framework for Node.js.

PostgreSQL: A powerful, open-source relational database.

Prisma: A modern ORM (Object-Relational Mapper) that simplifies database access with a type-safe API.

Docker & Docker Compose: For containerizing and orchestrating the multi-service application (web app, database, and monitoring).

Prometheus: An open-source monitoring system to collect and analyze application metrics.

📦 Prerequisites
Ensure you have the following installed on your system:

Docker: https://www.docker.com/get-started

Docker Compose: Comes bundled with modern Docker installations.

🏁 Getting Started
Follow these steps to set up and run the project locally.

Clone the repository (replace with your repository URL):

git clone [git@github.com:timaZhuk/NodeJS-Postrgre-PrismaORM-project.git](git@github.com:timaZhuk/NodeJS-Postrgre-PrismaORM-project.git)
cd your-project

Start the services: This command builds the application image and starts all the services defined in docker-compose.yml in detached mode.

docker-compose up --build -d

Run Prisma migrations: The database container is initially empty. You need to apply the schema defined in prisma/schema.prisma to the database.

docker exec -it express_prisma_api npx prisma migrate dev --name init

Note: The prisma migrate dev command creates the tables and relationships in the database, and is only needed the first time you set up the project or whenever your schema changes.

📊 Monitoring
This project is configured with Prometheus for monitoring.

📝 Configuration
The prometheus.yml file is configured to scrape the /metrics endpoint of your express_prisma_api service every 5 seconds.

# prometheus.yml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: express_prisma_api
    static_configs:
      - targets: ["express_prisma_api:4000"]

📈 Accessing Metrics
Application Metrics: View the raw metrics exposed by your application at:
http://localhost:4000/metrics

Prometheus Dashboard: Access the Prometheus user interface to visualize and query your metrics using PromQL at:
http://localhost:9090

💻 API Endpoints
The application exposes the following endpoints:

GET /: A basic "Hello World" endpoint to verify the server is running.

GET /metrics: The endpoint used by Prometheus to scrape metrics.

Add your API endpoints here: Document any other routes and their functionality.
