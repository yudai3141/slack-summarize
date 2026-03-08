# Architecture

## System Overview

This project is a Slack bot that summarizes Slack threads using Amazon Bedrock.

The system flow is:

Slack
→ Backend API
→ Slack Web API
→ Amazon Bedrock
→ Slack reply

The backend is implemented with NestJS and TypeScript.

The backend engineer is responsible only for the application layer.
AWS infrastructure is handled separately by the infrastructure engineer.

---

## MVP Flow

The MVP works as follows:

1. A user triggers the Slack Message Shortcut
2. Slack sends an interaction request to the backend
3. The backend validates the Slack request signature
4. The backend extracts the channel ID and thread timestamp
5. The backend fetches thread messages using Slack Web API
6. The backend converts the thread into a Bedrock prompt
7. The backend sends the prompt to Amazon Bedrock
8. The backend receives the summary result
9. The backend posts the summary back to the Slack thread

---

## Responsibility Boundaries

### Backend Responsibilities

The backend handles:

- Receiving Slack interaction requests
- Validating Slack signatures
- Fetching Slack thread messages
- Building summarization prompts
- Calling Amazon Bedrock
- Formatting summarization results
- Posting responses back to Slack
- Logging and error handling inside the application

### Infrastructure Responsibilities

Infrastructure is out of scope for backend implementation.

Infra is expected to handle:

- API Gateway
- Lambda or ECS
- IAM
- Secrets Manager
- CloudWatch
- Deployment pipeline

The backend should not assume direct ownership of infrastructure code unless explicitly requested.

---

## Backend Module Structure

Recommended structure:

src/

app.module.ts

slack/
- slack.module.ts
- slack.controller.ts
- slack.service.ts
- slack-signature.service.ts
- dto/

summarize/
- summarize.service.ts
- prompt-builder.service.ts

bedrock/
- bedrock.service.ts

config/
- env.validation.ts

common/
- types/
- constants/

---

## Module Responsibilities

### slack module

Responsible for Slack-specific behavior.

Includes:

- handling incoming Slack requests
- validating signatures
- calling Slack Web API
- posting thread replies

### summarize module

Responsible for application use cases.

Includes:

- orchestrating the summarize-thread workflow
- transforming Slack messages into prompt input
- handling formatting of the final summary

### bedrock module

Responsible for AI model interaction.

Includes:

- sending prompt input to Amazon Bedrock
- parsing model response
- returning plain summarization output to application services

### config module

Responsible for environment configuration.

Includes:

- environment variable loading
- schema validation
- preventing boot with invalid config

---

## Data Flow

### Input from Slack

Slack interaction payload provides:

- user information
- channel information
- message context
- thread timestamp or root message timestamp

### Internal backend representation

Slack thread messages should be normalized into a simple structure like:

```ts
type SlackThreadMessage = {
  user: string;
  text: string;
  ts: string;
};