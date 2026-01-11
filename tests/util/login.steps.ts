import { Page, expect, test } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await test.step('Login to practice test site', async () => {
    //await page.goto('/practice-test-login/');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#submit');
  });
}
