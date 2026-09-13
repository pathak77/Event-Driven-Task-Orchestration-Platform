# BuzOp - Event-Driven Task Orchestration Platform

A microservices-based, event-driven task orchestration platform built to handle asynchronous task processing, distributed state management, and edge-level authentication. Designed with scalability and clean architecture in mind, using modern Java ecosystems and event streaming.

## Architecture Overview
 
```
Client → API Gateway (OpenResty/Lua, JWT check via Redis)
              ↓
       Auth Service ──(outbox → Kafka)──► Task Service
       (own Postgres)                     (own Postgres)
```
 

The system is designed around a microservices architecture, emphasizing decoupling, scalability, and asynchronous communication:

- **API Gateway (OpenResty / Lua):** Acts as the single entry point for all client requests. It handles edge routing, rate limiting, and validates JWT tokens against the Redis cache before routing traffic to downstream services.
- **Auth Service (Spring Boot 3):** Manages user identities, issues JWTs, and handles authentication workflows. Publishes relevant lifecycle events (e.g., user creation) to the event broker. Backed by its own isolated PostgreSQL database.
- **Backend / Task Service (Spring Boot 3):** The core engine of the platform. Orchestrates complex tasks, listens to events from other domains, and updates state asynchronously. Backed by an independent PostgreSQL database.
- **Event Broker (Apache Kafka):** Facilitates high-throughput, fault-tolerant asynchronous communication between the Auth Service and Task Service.
- **Frontend (React / Vite):** A responsive, client-side SPA utilizing Tailwind CSS for styling and Chart.js for task metric visualizations.

## Tech Stack

- **Backend:** Java 21, Spring Boot 3, Spring Security, Spring Data JPA
- **Event Streaming:** Apache Kafka, Spring Kafka
- **Database & Caching:** PostgreSQL 16, Redis (Alpine)
- **API Gateway:** Nginx, OpenResty (Lua)
- **Frontend:** React 19, Vite, Tailwind CSS 4, Axios, Chart.js
- **Infrastructure:** Docker, Docker Compose

## Key Features & Engineering Decisions

- **Event-Driven Microservices:** Services communicate asynchronously via Kafka topics, reducing temporal coupling and improving fault tolerance.
- **Database-per-Service Pattern:** The `Auth` and `Task` services maintain strict data isolation with their own PostgreSQL instances, avoiding shared-database antipatterns.
- **Edge Authentication:** The API Gateway validates JWTs and enforces security policies at the perimeter, preventing unauthenticated traffic from reaching internal microservices.
- **Transactional Outbox Pattern:** The Auth service utilizes an Outbox table and a relay scheduler to guarantee that database commits and Kafka event publishing are completely atomic, preventing data inconsistencies during network partitions.
- **Resilient Asynchronous Processing:** The Task service implements Idempotent Consumers (tracking processed event IDs) and a Dead Letter Queue (DLQ) for poison-pill messages, ensuring robust fault tolerance against duplicate deliveries and processing exceptions.
- **Modern Java:** Leverages Java 21 features and Spring Boot 3 for optimal performance and developer experience.

## The problems this solves
 
**Problem: a DB commit and a Kafka publish are two separate operations — a crash between them loses the event.**
Decision: Auth writes to an outbox table in the same transaction as the user record, and a relay poller publishes from the outbox to Kafka.
Result: a user-creation event can never be silently dropped, even if the service crashes immediately after the DB commit.
 
**Problem: Kafka's at-least-once delivery means the Task service can receive the same event twice.**
Decision: consumers track processed event IDs and skip anything already seen; unprocessable messages go to a DLQ instead of blocking the topic.
Result: duplicate deliveries don't corrupt state, and one bad message can't stall the rest of the queue.
 
**Problem: every request hitting Spring Security for JWT checks adds latency and load to every backend service.**
Decision: JWT validation happens in Lua at the OpenResty gateway, backed by a Redis lookup, before a request ever reaches a backend service.
Result: unauthenticated traffic is rejected at the edge — backend services never see it.
 
**Problem: Auth and Task services need to stay independently deployable.**
Decision: database-per-service (separate Postgres instances), communication only through Kafka events, no shared schema.
Result: either service can be redeployed, migrated, or scaled without coordinating with the other.

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Java 21 (for local native development)
- Node.js 20+ (for frontend development)
- Maven

### Running Locally (Dockerized Environment)

The easiest way to spin up the entire infrastructure, databases, and microservices is via Docker Compose.

```bash
# Clone the repository
git clone https://github.com/yourusername/task-app.git
cd task-app

# Set up environment variables (copy the sample if provided)
# Provide JWT_SECRET, POSTGRES_USER, POSTGRES_PASSWORD in your .env

# Build and start all services
docker-compose up --build -d
```
| Service | Port |
|---|---|
| API Gateway | 80 |
| Auth Service | 5500 |
| Task Service | 8080 |
| Auth Postgres | 5432 |
| Task Postgres | 5431 |
| Redis | 6379 |
| Kafka | 9092 |
 
Frontend dev: `cd frontend && npm install && npm run dev`


### Local Development without Docker (Services)
To run a service locally against the Dockerized infrastructure (Kafka, Postgres, Redis):
1. Start the infrastructure: `docker-compose up -d kafka auth-db backend-db redis`
2. Navigate to the service directory (e.g., `cd app` or `cd auth`)
3. Run the Spring Boot application: `./mvnw spring-boot:run`


## Not done yet
 
No test coverage (JUnit 5 + Testcontainers), no CI pipeline, no distributed tracing, no circuit breakers on inter-service calls. These are the next things being added, not a claim that they exist.
