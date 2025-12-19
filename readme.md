# Services-mini

A minimal, self-contained TypeScript repository demonstrating **service-layer patterns**, **defensive API normalization**, and **Vitest mocking best practices** inspired by real-world changes in the `` codebase.

This repo intentionally mirrors common enterprise concerns:
- RxJS-style APIs returning observables
- Service abstraction over HTTP APIs
- Defensive handling of inconsistent backend responses
- Robust, type-safe unit testing with Vitest

---

## Goals of This Repository

This repository exists to demonstrate **three specific patterns**:

1. **Defensive normalization of API data**
   - Protect downstream UI and business logic from malformed backend responses
   - Example: normalizing `technologies` to an array even if the API returns `null`, `undefined`, or a non-array

2. **Service-layer error handling**
   - Centralize error formatting and recovery
   - Return structured `{ result, error }` objects instead of throwing
   - Make services easy to test and reason about

3. **Modern Vitest mocking patterns**
   - `vi.mocked(...)` instead of brittle `spyOn` chains
   - Explicit mock factories for shared utility modules
   - Deterministic, isolated unit tests

---

## Project Structure

```text
|-services-mini/
├── src/
│   ├── dtos/
│   │   ├── Project.ts
│   │   └── SearchProject.ts
│   ├── http/
│   │   └── Api/
│   │       └── ApiService.ts
│   ├── services/
│   │   ├── ProjectApiService.ts
│   │   └── searchProjectService.ts
│   └── utils/
│       └── commonUtils.ts
│
├── test/
│   ├── project-api-service.unit.test.ts
│   └── searchProjectService.unit.test.ts
│
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── .gitignore
