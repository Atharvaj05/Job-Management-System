# V0: Job Management Core Base System

This is the initial version (V0) of a multi-stage distributed system track. It establishes a decoupled clean architecture using Express, Node.js, SQLite, and React.

## Layer Isolation Mechanics
- **Model**: Deals directly with SQLite SQL transactions.
- **Service**: Executes agnostic core domain actions. Ready to receive worker engines.
- **Controller**: Manages raw incoming payloads and outputs JSON responses.\n