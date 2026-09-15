# 🛒 Estore Backend

A microservices-based backend for an E-commerce platform, built using the [Nx](https://nx.dev) monorepo toolchain.

## 🏗️ Architecture

This project uses a microservices architecture to manage different domains of the e-commerce platform efficiently.

### Request Flow Diagram

```mermaid
graph TD
    Client["Users UI Client (Next.js - Port 3000)"]
    Gateway["API Gateway (Express - Port 8080)"]
    AuthService["Auth Service (Express - Port 6001)"]
    Redis["Upstash Redis Cache (OTP / Cooldowns)"]
    DB["MongoDB Database (via Prisma Client)"]
    SMTP["Gmail SMTP Server (Nodemailer Email)"]

    Client -->|Sends HTTP Requests| Gateway
    Gateway -->|Routes & Rate Limits| AuthService
    AuthService -->|Generates/Verifies OTP| Redis
    AuthService -->|Persists User Accounts| DB
    AuthService -->|Dispatches Activation Mails| SMTP
```

### Current Services

1. **API Gateway (`api-gateway`)** - Port **8080**
   - Serves as the single entry point for all client requests.
   - Configured with CORS, rate limiting, and will handle request proxying to internal microservices.
2. **Auth Service (`auth-service`)** - Port **6001**
   - Dedicated microservice to handle user authentication, user accounts, and authorization logic.
3. **Users UI (`users-ui`)** - Port **3000**
   - Frontend application built with Next.js (App Router), React, and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend Frameworks:** Node.js, Express.js
- **Database & Cache:** MongoDB (via Prisma ORM), Redis (Upstash)
- **Language:** TypeScript
- **Monorepo Management:** Nx
- **Bundling:** Webpack, esbuild
- **Testing:** Jest

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation

1. Clone the repository and navigate into the directory
2. Install dependencies:
   ```sh
   npm install
   ```

### Environment Setup

Before running the application, you need to configure your environment variables. 
Create a `.env` file in the `apps/users-ui` directory for frontend configuration, and `.env` files for your backend services (like `auth-service` and `api-gateway`) as required by the Prisma schema and other services. Example keys you may need:
- `DATABASE_URL` (MongoDB connection string)
- `SMTP_...` credentials for Nodemailer
- Redis credentials for Upstash
- JWT secrets for auth

### Running the Environment Local

You can start all microservices concurrently using the existing root script:

```sh
npm run dev
```
*This command leverages `nx run-many` to boot the API Gateway and Auth Service in development mode, watching for changes.*

### Running Individual Services

If you only want to focus on a single service, you can run:

```sh
npx nx serve api-gateway
```
or 
```sh
npx nx serve auth-service
```

To run the frontend (Users UI) individually, you can use:

```sh
npm run users-ui
```

## 🧪 Testing

To run unit tests across all projects:

```sh
npx nx run-many -t test
```

## 📦 Production Builds

To build all apps for production:

```sh
npx nx run-many -t build
```
The compiled output will be available in the `dist/` directory.
