# Angular 16 NgModule Docker

Modern Angular 16 learning project using the traditional NgModule architecture with Docker-based development setup.

## Project Overview

This repository demonstrates:

* Angular 16 application setup
* Traditional NgModule-based architecture
* Angular Routing
* SCSS styling
* Dockerized development environment
* Git-based development workflow

## Tech Stack

* Angular 16.2.x
* TypeScript
* SCSS & Tailwind CSS
* Node.js 18 LTS
* Docker
* Angular CLI 16

## Progress

### Completed

* [x] Created Git repository
* [x] Initialized Angular 16 application
* [x] Enabled Angular Routing
* [x] Configured SCSS styling
* [x] Configured Tailwind CSS
* [x] Moved Angular project to repository root
* [x] Installed Angular CLI 16 in Docker
* [x] Installed Node.js 18 in Docker
* [x] Created Docker development environment
* [x] Added Dockerfile & .dockerignore
* [x] Configured Angular development server through Docker
* [x] Added Product List Component ([Milestone 1](src/docs/milestones/milestone-01-product-list.md))
* [x] Added Product Service Integration ([Milestone 2](src/docs/milestones/milestone-02-product-service.md))
* [x] Added initial unit tests for core features
* [x] Setup Unit and E2E Tests using Vite and Playwright ([Milestone 3](src/docs/milestones/milestone-03-testing-setup.md))

### Upcoming Milestones

* [ ] Milestone 4 - Product Detail Component (Routing & Parameters)
* [ ] Milestone 5 - Product Filter & Search (Reactive search filter logic)
* [ ] Milestone 6 - Star Rating UI Component (Nested component communication)
* [ ] Milestone 7 - HTTP Client Integration (Connecting to real REST endpoints)
* [ ] Milestone 8 - Lazy Loaded Product Module (Routing architecture optimization)

## Getting Started

### Prerequisites

* Docker Desktop
* Git

### Clone Repository

```bash
git clone https://github.com/sigmakumarwadbude/angular16-ngmodule-docker.git
cd angular16-ngmodule-docker
```

## Local Development

Install dependencies:

```bash
npm install
```

Start Angular development server:

```bash
ng serve
```

Navigate to:

```text
http://localhost:4200
```

## Docker Development

Build image:

```bash
docker build -t angular16-dev .
```

Run container:

```bash
docker run --rm -it -p 4200:4200 angular16-dev
```

Application URL:

```text
http://localhost:4200
```

### Stop the Container

If `Ctrl + C` does not stop the Angular development server properly, first find the running container:

```bash
docker ps
```

Stop the container using its CONTAINER ID:

```bash
docker stop <container-id>
```

Or stop all running containers:

```bash
docker stop $(docker ps -q)
```

## Project Structure

```text
src/
├── app/
│   ├── features/
│   │   ├── home/
│   │   │   ├── welcome.component.ts
│   │   │   └── welcome.component.spec.ts
│   │   │
│   │   └── products/
│   │       ├── product-list/
│   │       │   ├── product-list.component.ts
│   │       │   ├── product-list.component.html
│   │       │   └── product-list.component.spec.ts
│   │       ├── services/
│   │       │   ├── product.service.ts
│   │       │   └── product.service.spec.ts
│   │       ├── models/
│   │       │   └── product.ts
│   │       └── data/
│   │           └── products.ts
│   │
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.component.spec.ts
│
├── assets/
├── favicon.ico
├── index.html
├── main.ts
└── styles.scss
```

## Learning Goals

This repository is intended to explore:

* Angular 16 fundamentals
* NgModule architecture
* Routing and navigation
* Dependency Injection
* Services and HTTP Client
* RxJS
* Lazy Loaded Feature Modules
* Dockerized Angular development

## Next Milestone

### Milestone 4: Product Detail Component

Implement the product detail component, route configuration with route parameters (e.g. `/products/:id`), dynamic product lookup from `ProductService`, and master-detail navigation between the list and detail views.
