# Project Overview

Slack Thread Summarizer

This project builds a Slack bot that summarizes Slack threads using Amazon Bedrock.

The goal of the project is to learn practical backend and infrastructure development by building a small but realistic system.

The application integrates Slack, a backend API, and AWS services.

---

# Team Structure

This project is developed by two engineers.

Backend Engineer (me)

Responsible for:

- NestJS backend application
- Slack API integration
- Amazon Bedrock integration
- API design and implementation
- Thread summarization logic

Infrastructure Engineer

Responsible for:

- AWS infrastructure
- API Gateway
- Lambda or ECS deployment
- IAM configuration
- CloudWatch logging
- Secrets Manager configuration
- CI/CD and deployment

---

# Tech Stack

Backend

- NestJS
- TypeScript
- Slack Web API
- Amazon Bedrock SDK

Infrastructure

- AWS
- API Gateway
- Lambda or ECS
- IAM
- CloudWatch
- Secrets Manager

---

# MVP Scope

The MVP implements the following workflow:

1. Slack Message Shortcut is triggered
2. Slack sends a request to the backend
3. Backend fetches thread messages via Slack API
4. Backend sends the thread to Amazon Bedrock
5. Bedrock generates a summary
6. Backend posts the summary back to the Slack thread

The MVP intentionally avoids unnecessary complexity.

Not included in MVP:

- Database
- Persistent storage
- UI
- External integrations (Notion, etc.)

---

# Development Philosophy

The focus of this project is learning practical backend development.

Principles:

- Keep implementation simple
- Avoid premature abstraction
- Follow NestJS conventions
- Prefer clear and readable code
- Separate responsibilities between backend and infrastructure

The backend should only handle application logic and API behavior.

Infrastructure concerns are handled by the infrastructure engineer.