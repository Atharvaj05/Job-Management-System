# Automated Task Scheduling & Management Platform

### 🚀 Live Deployment URL
**Production Web Interface:** [https://job-management-system-ashen.vercel.app](https://job-management-system-ashen.vercel.app)

---

## 📌 Project Overview
This repository hosts a production-grade, multi-tenant **Asynchronous Task Scheduling & Orchestration System**. Originally conceived as a baseline single-user CRUD application (V0), the platform has been systematically refactored into a secured multi-user architecture (V1), culminating in a robust background task manager (V2). 

The primary design philosophy behind this project is a strict **separation of concerns**. By decoupling HTTP transport mechanisms from core domain capabilities and background asynchronous runtime threads, the system provides isolated task execution monitoring, granular error handling, and complete data isolation across authenticated tenants.

### 📈 Evolution Architecture Path
* **Version 0 (CRUD Layer Baseline):** Established a decoupled single-user architecture mapping standard HTTP methods directly to data store interactions.
* **Version 1 (Multi-Tenant Authorization Isolation):** Implemented a secure user management layer utilizing cryptographic password hashing and stateless JSON Web Token (JWT) verification mechanics.
* **Version 2 (Time-Based Background Worker Engine):** Engineered an asynchronous execution pipeline powered by a dedicated scheduling thread that monitors database state, dynamically updates processing status, and commits persistent runtime audit logs.

---

## 🛠️ High-Performance Tech Stack

### Backend Infrastructure Engine
* **Node.js & Express.js:** Leveraged for their event-driven, non-blocking input/output execution model, optimized to handle highly concurrent API traffic.
* **SQLite (Embedded Database Engine):** Selected for local data transactional integrity, absolute zero-configuration dependency overhead, and low latency processing.
* **node-cron (Background Process Engine):** Acts as the primary time-based thread controller, continuously running polling subroutines isolated from main HTTP loop interactions.

### Security, Cryptography & Validation
* **JSON Web Tokens (JWT):** Facilitates stateless, secure data exchange between distributed layout boundaries.
* **bcryptjs:** Implements standard cryptographic hashing routines with a variable cost factor (10 salt rounds) to safely isolate stored authentication assets.

### Frontend Client Interface Panel
* **React & Vite:** A streamlined, highly componentized frontend client architecture focusing on instant hot module loading, state persistence, and responsive asynchronous pipeline telemetry updates.

---

## 🏗️ Production Architectural Topography

The backend is built around a highly structured **Controller-Service-Repository (Model)** architecture. This pattern eliminates tight coupling between database layers, operational logic, and transport routing rules.

```text
       +-------------------------------------------------------+
       |                  React Frontend Panel                 |
       +-------------------------------------------------------+
                                   |
                     HTTPS Request | Secure Auth Header
                                   v
       +-------------------------------------------------------+
       |             HTTP Routing Layer (Express)              |
       +-------------------------------------------------------+
                                   |
                  Passes Token verification & validation checks
                                   v
       +-------------------------------------------------------+
       |           Controller Mapping Layer (Parsing)          |
       +-------------------------------------------------------+
                                   |
                  Agnostic Domain Arguments Transition
                                   v
       +-------------------------------------------------------+
       |            Domain Service Logic Pipeline              |
       +-------------------------------------------------------+
                 |                                   |
   Read / Write  |                     Read / Write  |
                 v                                   v
  +-----------------------------+     +-----------------------------+
  |    User Repository Model    |     |    Task Repository Model    |
  +-----------------------------+     +-----------------------------+
                 |                                   |
                 +-----------------+-----------------+
                                   |
                                   v
                    +-----------------------------+
                    |    SQLite Persistent Store   | <---+
                    +-----------------------------+     |
                                                        | Continuous Polling Loop
                                                        | Every 30 Seconds
                                                        |
                                          +-----------------------------+
                                          | Background Scheduler Thread |
                                          +-----------------------------+
                                                        |
                                                        v
                                          +-----------------------------+
                                          |   Worker Execution Engine   |
                                          +-----------------------------+
                                                        |
                                                        v
                                          +-----------------------------+
                                          |  Persistent Log Repository  |
                                          +-----------------------------+
```
## 🔁 Detailed Asynchronous Request Lifecycle

* **Ingress Traffic Control:** Incoming payloads clear initial format validation checks inside dedicated route middleware layers (`inputValidator.js`).
* **Identity Verification Interception:** Access requests targeting protected paths must expose an operational `Authorization: Bearer <token>` string. The authentication middleware validates the payload signature using the system's `JWT_SECRET` and binds user telemetry directly to the request object context.
* **Agnostic Dispatching Handshake:** The controller intercepts the parsed data structure and delegates all execution requirements directly to the service layer.
* **Database Persistence Layer:** The repository layer transforms domain state parameters into transactional SQL statements, persisting task blueprints inside isolated table workspaces.
* **Asynchronous Execution Lifecycle Loop:** Completely decoupled from the HTTP transport cycle, a parallel background process executes continuous polling lookups, picks up due tasks, passes them to independent execution threads, and logs all completion states or trace messages.

---

## 🗄️ Relational Database Layout

The data store actively enforces a strict **One-to-Many relational architecture** between users and their background execution payloads, locked down via database foreign keys.

### 1. `users` Table
Stores secure login and configuration metadata for registered platform operators.

| Column Name | Data Type | Key Type | Operational Constraints / Modifiers |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key | Auto-Incrementing Unique Index |
| `name` | `TEXT` | - | Non-Nullable Field |
| `email` | `TEXT` | Unique | Non-Nullable, High-Performance Index Lookup Key |
| `passwordHash` | `TEXT` | - | Non-Nullable Cryptographic String |
| `createdAt` | `DATETIME` | - | Populates automatically to `CURRENT_TIMESTAMP` |

### 2. `tasks` Table
Tracks task metadata, expected execution timestamps, and lifecycle states.

| Column Name | Data Type | Key Type | Operational Constraints / Modifiers |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key | Auto-Incrementing Unique Index |
| `title` | `TEXT` | - | Non-Nullable Field |
| `description` | `TEXT` | - | Nullable Context Block |
| `executeAt` | `DATETIME` | - | Non-Nullable Execution Target Timestamp |
| `status` | `TEXT` | - | Check Constraint: `Scheduled`, `Running`, `Completed`, `Failed` |
| `userId` | `INTEGER` | Foreign Key | References `users(id)` with `ON DELETE CASCADE` |
| `createdAt` | `DATETIME` | - | Populates automatically to `CURRENT_TIMESTAMP` |

### 3. `execution_logs` Table
Maintains historical execution logs, tracking output results or system errors for scheduled tasks.

| Column Name | Data Type | Key Type | Operational Constraints / Modifiers |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key | Auto-Incrementing Unique Index |
| `taskId` | `INTEGER` | Foreign Key | References `tasks(id)` with `ON DELETE CASCADE` |
| `startedAt` | `DATETIME` | - | Execution Start Timestamp (`CURRENT_TIMESTAMP`) |
| `completedAt` | `DATETIME` | - | System Completion Timestamp |
| `result` | `TEXT` | - | Nullable Execution Checksum Data Block |
| `errorMessage` | `TEXT` | - | Nullable Standard Error Capture Trace Block |

---

## 🛣️ API Interface Endpoint Registry

### Authentication Interface Endpoints
* `POST /api/auth/register` - Registers a new user account profile. Requires valid `name`, unique `email`, and `password`.
* `POST /api/auth/login` - Validates secure user credentials. Generates and returns a signed stateless JWT token asset.
* `GET /api/auth/profile` - *[PROTECTED]* Fetches account metadata for the currently authenticated user session.

### Task Management Interface Endpoints
* `POST /api/tasks` - *[PROTECTED]* Schedules a new background job task. Requires unique `title`, `executeAt` datetime parameters.
* `GET /api/tasks` - *[PROTECTED]* Streams all active and historical task entries belonging exclusively to the authenticated tenant.
* `GET /api/tasks/:id/logs` - *[PROTECTED]* Returns a complete historical execution log record trace for the specified task item.



