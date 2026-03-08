.claude/dev-commands.md

# Development Commands

This document defines common commands used for backend development in this repository.

The project uses:

* Node.js
* NestJS
* TypeScript
* npm

Claude should suggest these commands when helping with development tasks.

---

# Install Dependencies

Install project dependencies:

npm install

Install a new package:

npm install <package-name>

Install a dev dependency:

npm install -D <package-name>

---

# Run the Application

Start development server:

npm run start:dev

Start normally:

npm run start

Build the project:

npm run build

Run production build:

npm run start:prod

---

# Testing

Run unit tests:

npm run test

Run tests in watch mode:

npm run test:watch

Run test coverage:

npm run test:cov

Run e2e tests:

npm run test:e2e

---

# Lint and Format

Run linter:

npm run lint

Fix lint issues automatically:

npm run lint -- --fix

Run formatter:

npm run format

---

# NestJS Code Generation

Create a module:

nest g module <name>

Create a controller:

nest g controller <name>

Create a service:

nest g service <name>

Create a resource:

nest g resource <name>

---

# Local Development Flow

Typical workflow:

1. install dependencies
2. start dev server
3. implement backend logic
4. run lint
5. run tests
6. build project

Example sequence:

npm install
npm run start:dev
npm run lint
npm run test
npm run build

---

# Environment Variables

Environment variables should be defined in:

.env

Typical variables include:

* PORT
* SLACK_SIGNING_SECRET
* SLACK_BOT_TOKEN
* SLACK_USER_TOKEN
* AWS_REGION
* BEDROCK_MODEL_ID

Secrets must never be hardcoded.

---

# Notes for Claude

When suggesting commands:

* prefer npm commands
* assume a NestJS project
* avoid suggesting Docker unless requested
* avoid suggesting Terraform or infrastructure tools
* focus on backend developer workflow
