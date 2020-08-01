# Microservices

## Fundamental ideas about Microservices

### What is Microservice

A single microservice contains all of the code required to make one feature work correctly

### Big challenge with Microservice

:smiling_imp: Data management between services

1. How we store data? :point_right: Each services gets its own database
2. How we access data: :point_right: Services will never reach into another services database

Okay.. but why "database-per-service"?

- Each service to run independently of other services
- Database schema/structure might change
- Some services might function more efficiently with different types of DBs

### Communications strategies between services

If service C needs to access data in service A and service B,

- Sync: Services communicate with each other using **direct requests**
  - :+1: easy to understand
  - :+1: service D doesn't need a database
  - :-1: introduces a dependency between services
  - :-1: if any inter-service request fails, the overall request fails
  - :-1: the entire request is only as fast as the slowest request
  - :-1: can easily introduce webs of requests (D needs A, B and a needs P, Q and P needs X, Y and so on)

- Async: Services communicate with each other using **events** by event bus
  - :+1: service D has zero dependency on other services
  - :+1: service D will be extremely fast
  - :-1: data duplication
  - :-1: hard to understand

## A mini Microservice app

### Handle CORS errors

When the browser is trying to make a request to a server with different `domain`/`domain with port`/`domain with subdomain`, the browser will automatically reject unless the response from other origins includes the right CORS headers.

### Event bus/Event broker

With asynchronous communication we introduce **Event broker**. And the goal of this event broker is to **receive events from some different services and route them off to all the other services**.

- Many different implementations, ex. RabbitMQ, Kafka, NATS...
- Receives events, publishes them to listeners
- Many different subtle feature that make async communication way easier or way harder

