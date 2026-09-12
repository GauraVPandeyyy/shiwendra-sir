import { z } from "zod";
export const categories = [
  "concern",
  "suggestion",
  "meeting",
  "support",
  "other",
] as const;
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .refine((v) => !/[\r\n\u0000]/.test(v)),
  mobile: z
    .string()
    .trim()
    .regex(/^(?:\+91[ -]?)?[6-9]\d{9}$/),
  area: z.string().trim().max(160),
  category: z.enum(categories),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200),
  startedAt: z.number().finite(),
  locale: z.enum(["hi", "en"]),
});
export type ContactInput = z.infer<typeof contactSchema>;
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
}
export function emailHtml(input: ContactInput) {
  return `<h1>Jan Samvad submission</h1><dl>${[
    ["Name", input.name],
    ["Mobile", input.mobile],
    ["Village / Area", input.area],
    ["Category", input.category],
    ["Language", input.locale],
  ]
    .map(([k, v]) => `<dt><strong>${k}</strong></dt><dd>${escapeHtml(v)}</dd>`)
    .join(
      "",
    )}</dl><h2>Message</h2><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;
}
