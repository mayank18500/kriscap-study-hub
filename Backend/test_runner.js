const { performance } = require('perf_hooks');

const BACKEND_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:8080';

const tests = [
  {
    id: 'HOME-001',
    name: 'Verify frontend homepage loads',
    fn: async () => {
      const start = performance.now();
      const res = await fetch(FRONTEND_URL);
      const duration = performance.now() - start;
      if (res.status !== 200) {
        throw new Error(`Expected status 200, got ${res.status}`);
      }
      return `Loaded in ${duration.toFixed(2)}ms`;
    }
  },
  {
    id: 'PERF-004',
    name: 'Verify backend health check endpoint',
    fn: async () => {
      const start = performance.now();
      const res = await fetch(`${BACKEND_URL}/`);
      const text = await res.text();
      const duration = performance.now() - start;
      if (res.status !== 200 || !text.includes('API is running')) {
        throw new Error(`Expected status 200 with API status, got ${res.status}: ${text}`);
      }
      return `Responded in ${duration.toFixed(2)}ms`;
    }
  },
  {
    id: 'PRODUCT-001',
    name: 'Verify product catalog endpoint loads',
    fn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      if (res.status !== 200) {
        throw new Error(`Expected status 200, got ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data) && !data.products) {
        throw new Error('Expected products list array or object');
      }
      return `Fetched products list successfully.`;
    }
  },
  {
    id: 'HOME-005',
    name: 'Verify FAQ section endpoint loads',
    fn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/faqs`);
      if (res.status !== 200) {
        throw new Error(`Expected status 200, got ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Expected FAQs list array');
      }
      return `Fetched ${data.length} FAQs successfully.`;
    }
  },
  {
    id: 'SEC-003',
    name: 'Verify direct API access is blocked for protected routes',
    fn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/orders`);
      // Since it uses clerkMiddleware/auth protect, it should return 401 or redirect
      if (res.status !== 401 && res.status !== 403 && res.status !== 302) {
        throw new Error(`Expected unauthorized status 401/403, got ${res.status}`);
      }
      return `Blocked successfully with status ${res.status}`;
    }
  },
  {
    id: 'SEC-006',
    name: 'Verify admin API access is forbidden for normal requests',
    fn: async () => {
      const res = await fetch(`${BACKEND_URL}/api/admin/overview`);
      if (res.status !== 401 && res.status !== 403) {
        throw new Error(`Expected status 401/403, got ${res.status}`);
      }
      return `Blocked successfully with status ${res.status}`;
    }
  },
  {
    id: 'SEC-001',
    name: 'SQL Injection protection check on product ID parameter',
    fn: async () => {
      const injectionPayload = "' OR 1=1 --";
      const res = await fetch(`${BACKEND_URL}/api/products/${encodeURIComponent(injectionPayload)}`);
      // It should either return 400 Bad Request, 404 Not Found, or 500, but MUST NOT leak data or return 200 with list
      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data) || data.name) {
          throw new Error('Security Alert: SQL Injection payload returned valid data!');
        }
      }
      return `Handled SQL Injection payload safely with status ${res.status}`;
    }
  },
  {
    id: 'SEC-002',
    name: 'XSS protection check on inputs',
    fn: async () => {
      const xssPayload = '<script>alert(1)</script>';
      const res = await fetch(`${BACKEND_URL}/api/products/${encodeURIComponent(xssPayload)}`);
      if (res.status === 200) {
        const text = await res.text();
        if (text.includes(xssPayload)) {
          throw new Error('Security Alert: XSS payload returned unescaped in response!');
        }
      }
      return `Handled XSS payload safely with status ${res.status}`;
    }
  }
];

async function runTests() {
  console.log('==================================================');
  console.log('    KRISCAP STUDY HUB - MASTER TEST RUNNER        ');
  console.log('    Based on docs/test.md                         ');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    process.stdout.write(`[..] Running ${test.id}: ${test.name}...`);
    try {
      const detail = await test.fn();
      // Clear line and output pass
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      console.log(`[\x1b[32mPASS\x1b[0m] ${test.id}: ${test.name} (${detail})`);
      passed++;
    } catch (err) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      console.log(`[\x1b[31mFAIL\x1b[0m] ${test.id}: ${test.name}`);
      console.log(`       \x1b[31mError:\x1b[0m ${err.message}\n`);
      failed++;
    }
  }

  console.log('\n==================================================');
  console.log(`Test Execution Summary:`);
  console.log(`  Total Run:  ${tests.length}`);
  console.log(`  \x1b[32mPassed:\x1b[0m     ${passed}`);
  console.log(`  \x1b[31mFailed:\x1b[0m     ${failed}`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
