import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema, emailHtml } from "../src/lib/contact";
const valid = {
  name: "Test Citizen",
  mobile: "9876543210",
  area: "Test area",
  category: "concern",
  message: "Synthetic test message only.",
  website: "",
  startedAt: Date.now() - 5000,
  locale: "en",
};
test("accepts a bilingual enquiry and optional area", () => {
  assert.equal(
    contactSchema.safeParse({
      ...valid,
      name: "परीक्षण नागरिक",
      area: "",
      locale: "hi",
    }).success,
    true,
  );
});
test("rejects invalid phone, unknown categories and oversized content", () => {
  for (const change of [
    { mobile: "123" },
    { category: "campaign" },
    { message: "x".repeat(4001) },
    { name: "Header\r\nInjection" },
  ])
    assert.equal(
      contactSchema.safeParse({ ...valid, ...change }).success,
      false,
    );
});
test("escapes untrusted content in generated email HTML", () => {
  const result = emailHtml(
    contactSchema.parse({
      ...valid,
      message: '<img src=x onerror="alert(1)"> & test',
    }),
  );
  assert.ok(!result.includes("<img"));
  assert.ok(result.includes("&lt;img"));
  assert.ok(result.includes("&amp;"));
});
