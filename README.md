# Project Logostoff — Test Automation Framework

![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.64.1-green?logo=playwright)
![Cucumber](https://img.shields.io/badge/Cucumber-13.3.0-brightgreen?logo=cucumber)
![Node.js](https://img.shields.io/badge/Node.js-24.x-green?logo=nodedotjs)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

## Overview

Project Logostoff is an end-to-end test automation framework developed to test [logostoff.com](https://logostoff.com/).

The framework combines **TypeScript, Playwright, Cucumber BDD, and the Page Object Model (POM)** to provide a scalable, reusable, and maintainable approach to web application testing.

The project demonstrates modern SDET practices, including type-safe test development, browser automation, scenario isolation, reusable page objects, and continuous integration.

**Current status:** Framework setup and core configuration completed. Automated test scenarios are under development.

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Type-safe test development |
| Node.js & npm | Runtime and package management |
| Playwright | Browser automation |
| Cucumber.js | Behavior-Driven Development and test execution |
| Gherkin | Human-readable test scenarios |
| Page Object Model | Maintainable and reusable page classes |
| tsx | TypeScript execution |
| Git & GitHub | Version control |
| GitHub Actions | CI/CD integration (planned) |

## Framework Architecture

The framework follows a layered architecture:

```text
Gherkin Feature Files
         |
         v
Step Definitions (TypeScript)
         |
         v
Page Object Model (POM)
         |
         v
Playwright Browser Automation
         |
         v
Application Under Test
      logostoff.com
```

Cucumber Hooks and Custom World manage browser initialization, cleanup, and isolated scenario state.

## Project Structure

```text
Project-Logostoff/
|
├── features/                  # Gherkin feature files
│   └── home.feature           # Planned
│
├── step-definitions/          # Cucumber step implementations
│   └── home.steps.ts          # Planned
│
├── pages/                     # Page Object Model
│   ├── BasePage.ts
│   └── HomePage.ts
│
├── support/                   # Cucumber support files
│   ├── hooks.ts
│   └── world.ts
│
├── utils/                     # Shared configuration and utilities
│   └── config.ts
│
├── reports/                   # Test reports (planned)
├── screenshots/               # Test screenshots (planned)
│
├── .gitignore
├── cucumber.js                # Cucumber configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and npm scripts
├── package-lock.json
├── Project-Structure.md       # Detailed framework documentation
└── README.md
```

*The project structure will expand as test coverage and reporting features are implemented.*

## Getting Started

### Prerequisites

- Node.js 24.x
- npm
- Git
- VS Code or another preferred IDE

### 1. Clone the Repository

```bash
git clone https://github.com/haliderdur/Project-Logostoff.git
cd Project-Logostoff
```

### 2. Install Dependencies

```bash
npm ci
```

### 3. Install Playwright Chromium

```bash
npx playwright install chromium
```

This step is necessary only if the compatible browser binary is not already installed.

### 4. Verify TypeScript

```bash
npx tsc --noEmit
```

### 5. Verify Cucumber

```bash
npx cucumber-js --dry-run
```

A dry run checks scenario discovery and step matching without executing the test steps.

## Test Execution

Once the first test scenario and step definitions are implemented, tests can be executed using:

```bash
npx cucumber-js
```

The framework currently uses a visible Chromium browser (`headless: false`) during test execution.

## Test Coverage Roadmap

- [ ] Homepage validation
- [ ] Website navigation
- [ ] Product search
- [ ] Product details validation
- [ ] Shopping cart functionality
- [ ] Negative test scenarios
- [ ] HTML/JSON test reporting
- [ ] Screenshot capture on failure
- [ ] GitHub Actions CI/CD pipeline

## Development Principles

The framework follows these principles:

- Behavior-Driven Development (BDD)
- Page Object Model (POM)
- TypeScript strict type checking
- Reusable page objects and test utilities
- Independent and isolated test scenarios
- Reliable Playwright locators and assertions
- No unnecessary fixed waits
- Environment-based configuration
- Clean and maintainable automation code

## Current Development Progress

| Component | Status |
|---|---|
| Node.js project setup | Completed |
| Playwright and Cucumber installation | Completed |
| TypeScript configuration | Completed |
| ES Modules configuration | Completed |
| Custom Cucumber World | Implemented |
| Browser lifecycle hooks | Implemented |
| BasePage class | Implemented |
| HomePage class | Implemented |
| Centralized base URL configuration | Implemented |
| Cucumber TypeScript execution | Pending first real scenario |
| Automated test scenarios | In progress |
| Reporting and CI/CD | Planned |

## Application Under Test

**Website:** https://logostoff.com/

**Testing approach:** End-to-end UI automation using Chromium, Playwright, TypeScript, and Cucumber BDD.

## Documentation

For detailed architecture, configuration, and development progress, see [Project-Structure.md](Project-Structure.md).

## Author

**Halid Erdur**

QA Automation Engineer / SDET

[GitHub](https://github.com/haliderdur)

---

*This project is actively being developed as a practical demonstration of modern test automation engineering.*
