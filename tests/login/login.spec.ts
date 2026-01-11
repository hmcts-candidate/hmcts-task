import { test, expect } from '@playwright/test';
import { login } from '../util/login.steps';

const USERNAME = 'student';
const PASSWORD = 'Password123';

// Only navigate to login page before each test

test.beforeEach(async ({ page }) => {
  await page.goto('/practice-test-login/');
});

// Successful login test

test('should login successfully with valid credentials', async ({ page }) => {
  await login(page, USERNAME, PASSWORD);
  await expect(page).toHaveURL(/.*\/logged-in-successfully\//);
  await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
  await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
});

// Invalid username

test('should show error for invalid username', async ({ page }) => {
  await login(page, 'invaliduser', PASSWORD);
  await expect(page.locator('#error')).toBeVisible();
  await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});

// Invalid password

test('should show error for invalid password', async ({ page }) => {
  await login(page, USERNAME, 'wrongpassword');
  await expect(page.locator('#error')).toBeVisible();
  await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});

// Empty username

test('should show error for empty username', async ({ page }) => {
  await login(page, '', PASSWORD);
  await expect(page.locator('#error')).toBeVisible();
  await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});

// Empty password

test('should show error for empty password', async ({ page }) => {
  await login(page, USERNAME, '');
  await expect(page.locator('#error')).toBeVisible();
  await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});

test.afterEach(async ({ page }) => {
  // Attempt to logout if the logout button is present (i.e., login was successful)
  const logoutButton = page.locator('a.button[href="/practice-test-login/"]');
  if (await logoutButton.isVisible().catch(() => false)) {
    await logoutButton.click();
  }
});
