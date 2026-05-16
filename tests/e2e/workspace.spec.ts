import { test, expect, _electron as electron } from "@playwright/test";

test("launches the empty Wrytedown shell", async () => {
  const app = await electron.launch({ args: ["."] });
  const page = await app.firstWindow();

  await expect(page.getByText("Open a project")).toBeVisible();
  await app.close();
});
