# Project Logostoff — Test Automation Framework

Automated end-to-end testing framework for [logostoff.com](https://logostoff.com/), built with **TypeScript, Playwright, Cucumber BDD, and the Page Object Model (POM)** design pattern.

## 1. Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Primary programming language with static type checking |
| Node.js + npm | Runtime and dependency management |
| Playwright | Browser automation |
| Cucumber.js | BDD scenarios and test execution |
| Page Object Model (POM) | Reusable and maintainable page classes |
| Playwright assertions | Test validations |
| tsx | Execute TypeScript files directly in Node.js |
| @types/node | Node.js TypeScript definitions |
| dotenv | Environment configuration (planned) |
| Cucumber HTML/JSON reports | Test execution results and reporting (planned) |
| GitHub Actions | CI/CD automation (planned) |

**Module system:** ES Modules (`import` / `export`)

**Test runner:** Cucumber.js

**Programming language:** TypeScript

**Application Under Test (AUT):** https://logostoff.com/

**Browser:** Playwright-managed Chromium

### Installed Dependencies

| Package | Version |
|---|---|
| Playwright | 1.64.1 |
| Cucumber.js | 13.3.0 |
| TypeScript | 7.0.2 |
| tsx | 4.23.15 |
| @types/node | 26.6.6 |
| Node.js | 24.22.0 |
| npm | 11.19.1 |

Versions reflect the verified development environment and may change with future dependency updates.

## 2. Project Structure

The folder structure is being created progressively as we develop the framework.

```text
Project-Logostoff/
│
├── features/                     # PLANNED: Gherkin BDD scenarios
│   ├── home.feature
│   ├── navigation.feature
│   └── search.feature
│
├── step-definitions/             # PLANNED: Given/When/Then implementations
│   ├── home.steps.ts
│   ├── navigation.steps.ts
│   └── search.steps.ts
│
├── pages/                        # PLANNED: Page Object Model classes
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── SearchPage.ts
│
├── support/                      # CREATED: Cucumber lifecycle and context
│   ├── hooks.ts
│   └── world.ts
│
├── utils/                        # PLANNED: Utilities and configuration
│   └── config.ts
│
├── reports/                      # PLANNED: Generated test reports
├── screenshots/                  # PLANNED: Test screenshots
│
├── node_modules/                 # Installed dependencies (Git ignored)
├── .env                          # PLANNED: Local environment variables
├── .gitignore                    # Git exclusion rules
├── cucumber.js                   # Cucumber runner configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── package.json                  # Dependencies and npm scripts
├── package-lock.json             # Locked dependency versions
└── Project-Structure.md          # Framework documentation
```

**Note:** Planned directories and files are shown for architectural reference and will be created when needed. `.env` is not yet created.

## 3. Framework Architecture

The framework follows a layered architecture:

**Feature Files → Step Definitions → Page Objects → Playwright → Browser**

Cucumber World and Hooks provide scenario-specific state and browser lifecycle management across these layers.

### Feature Files
- Contain scenarios written in Gherkin syntax.
- Use Given, When, Then, and And.
- Describe expected application behavior.
- Remain independent of implementation details.

### Step Definitions
- Connect Gherkin steps to TypeScript functions.
- Call reusable methods from Page Object classes.
- Perform test assertions.
- Access scenario-specific objects through Cucumber World.

### Page Objects
- Encapsulate page-specific locators and actions.
- Reduce code duplication.
- Improve maintainability.
- Use TypeScript classes, inheritance, and type safety.
- Keep browser interaction logic separate from test scenarios.

### Support

**`world.ts`**
- Defines the custom Cucumber World.
- Extends Cucumber's built-in World class.
- Stores Playwright Browser, BrowserContext, and Page references.
- Provides isolated state for each scenario.

**`hooks.ts`**
- Uses Cucumber Before and After hooks.
- Launches Playwright-managed Chromium.
- Creates a fresh browser context and page for each scenario.
- Closes browser resources after execution.

### Utilities
- Contain reusable configuration and helper functions.
- Keep common logic separate from test implementation.
- Will support environment variables and other shared functionality.

## 4. TypeScript Configuration

The framework uses `tsconfig.json` with the following configuration principles:

| Setting | Purpose |
|---|---|
| `target: ES2022` | Modern JavaScript language features |
| `module: NodeNext` | Node.js-compatible ES Modules |
| `moduleResolution: NodeNext` | Node.js module resolution |
| `strict: true` | Strict TypeScript type checking |
| `esModuleInterop: true` | CommonJS interoperability |
| `skipLibCheck: true` | Skip dependency declaration checking |
| `noEmit: true` | Type checking without generating JavaScript files |
| `types: ["node"]` | Node.js type definitions |

### TypeScript Execution

TypeScript files are executed using `tsx`.

Cucumber is configured to load `.ts` support files and step definitions through the `tsx/esm` loader.

The TypeScript compiler is used separately for static analysis.

**Type-checking command:**

```bash
npx tsc --noEmit
```

**Cucumber dry-run command:**

```bash
npx cucumber-js --dry-run
```

## 5. Automation Scope

Initial automation coverage:

1. Homepage validation
2. Website navigation
3. Product search
4. Product details
5. Shopping cart
6. Negative test scenarios

Additional scenarios will be introduced progressively.

## 6. Development Principles

- Follow Cucumber BDD principles.
- Use TypeScript with strict type checking.
- Apply Page Object Model design patterns.
- Use ES Modules (`import` / `export`).
- Keep feature files readable and business-focused.
- Use reusable methods and locators.
- Prefer Playwright's user-facing locators.
- Avoid hardcoded URLs and credentials.
- Keep tests independent and isolated.
- Avoid fixed waits and unnecessary timeouts.
- Use environment variables for configuration.
- Maintain readable, scalable automation code.
- Check existing dependencies before installing new packages.
- Verify each framework component before proceeding.
- Update project documentation after completed milestones.

## 7. Project Progress

| Step | Task | Status |
|---|---|---|
| 1 | Initialize Node.js project | Completed |
| 2 | Install Playwright and Cucumber.js | Completed |
| 3 | Verify Chromium installation and browser execution | Completed |
| 4 | Create .gitignore | Completed |
| 5 | Configure Cucumber runner for ES Modules | Completed |
| 6 | Install and verify TypeScript, tsx, and Node.js types | Completed |
| 7 | Create tsconfig.json and verify type checking | Completed |
| 8 | Convert world.js to world.ts | Completed |
| 9 | Convert hooks.js to hooks.ts | Completed |
| 10 | Configure Cucumber TypeScript loader | Configured; execution not yet verified |
| 11 | Create BasePage.ts and HomePage.ts | Not started |
| 12 | Write first Gherkin scenario | Not started |
| 13 | Implement TypeScript step definitions | Not started |
| 14 | Execute first automated test | Not started |
| 15 | Add environment configuration | Not started |
| 16 | Add reporting and screenshots | Not started |
| 17 | Configure GitHub Actions CI/CD | Not started |

## 8. Verification History

### Node.js and npm
- Node.js v24.22.0 verified.
- npm v11.19.1 verified.

### Playwright and Cucumber
- Playwright 1.64.1 installed locally.
- Cucumber.js 13.3.0 installed locally.
- Compatible Chromium browser found in Playwright's browser cache.
- Browser execution verified by successfully capturing a screenshot.

### TypeScript
- TypeScript, tsx, and @types/node installed locally.
- TypeScript execution verified using `tsx`.
- TypeScript static checking completed without errors.

### Cucumber
- Cucumber CLI version verified.
- Cucumber dry run completed without errors.
- Result: 0 scenarios, 0 steps.

**Pending verification:** Execute an actual Cucumber scenario to confirm that the TypeScript loader, hooks, World, and step definitions work together.

---

*This document will be updated as the framework evolves.*
