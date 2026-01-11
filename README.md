# Playwright Test Automation Setup

## Project Overview
This project uses [Playwright](https://playwright.dev/) for end-to-end testing. It supports environment-based configuration using `.env` files and is ready for local development and CI/CD pipelines.

---

## Getting Started

### 1. Install Dependencies
```sh
npm install

npx playwright install
```

### 2. Environment Configuration (found in environments folder)
- **Default:** `.env` (for most cases)
- **Development:** `.env.development` (for local development)

Example `.env.development`:
```
BASE_URL=http://localhost:3000
```

Example `.env`:
```
BASE_URL=https://your-production-url.com
```

### 3. Running Tests

- **Development (uses `./environments/.env.development`):**
  ```sh
  NODE_ENV=development npx playwright test
  ```
  
- **Development with UI (uses `./environments/.env.development`):**
  ```sh
  NODE_ENV=development npx playwright test --ui
  ```
- **Default (uses `./environments/.env`):**
  ```sh
  npx playwright test
  ```
  
### 4. Tracing: Enable, Disable, and View

Playwright tracing helps you debug test failures by recording browser actions, network, and DOM snapshots.

- **Tracing is enabled globally by default in this project.**
- To disable tracing, edit `playwright.config.ts` and set `trace: 'off'` in the `use` section.
- To enable tracing only on failures or retries, set `trace: 'on-first-retry'` or `trace: 'retain-on-failure'`.

#### Viewing Trace Files

After running tests, trace files are saved in the `test-results/` directory (one per test run).

To view a trace:
```sh
npx playwright show-trace test-results/<test-folder>/trace.zip
```
Or, to open the Playwright Trace Viewer UI:
```sh
npx playwright show-trace
```
This will open a browser UI where you can select and inspect trace files.

---

## CI/CD Setup

1. **Ensure your CI pipeline installs dependencies:**
   ```sh
   npm ci
   ```
2. **Set up environment variables:**
   - Use `.env` for production/staging.
   - Or set `NODE_ENV=development` for development config.
3. **Run Playwright tests:**
   ```sh
   npx playwright test
   ```
4. **(Optional) Generate HTML report:**
   ```sh
   npx playwright show-report
   ```

---

## Notes
- The Playwright config automatically loads the correct `.env` file based on `NODE_ENV`.
- You can add more environment files (e.g., `.env.staging`) and update the config logic if needed.
