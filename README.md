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
* SCSS
* Node.js 18 LTS
* Docker
* Angular CLI 16

## Progress

### Completed

* [x] Created Git repository
* [x] Initialized Angular 16 application
* [x] Enabled Angular Routing
* [x] Configured SCSS styling
* [x] Moved Angular project to repository root
* [x] Installed Angular CLI 16 in Docker
* [x] Installed Node.js 18 in Docker
* [x] Created Docker development environment
* [x] Added Dockerfile
* [x] Added .dockerignore
* [x] Verified Angular application builds successfully

### In Progress

* [ ] Configure Angular development server through Docker
* [ ] Create Core Module
* [ ] Create Shared Module
* [ ] Create Feature Modules
* [ ] Implement Lazy Loading
* [ ] Add Product Feature
* [ ] Add Unit Tests
* [ ] Docker Compose Setup

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
│   │   └── home/
│   │       ├── welcome.component.ts
│   │       └── welcome.component.spec.ts
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

Create the first feature module:

```bash
ng generate module features/products --routing
```

and implement Product List and Product Details pages using Angular 16 NgModules.
