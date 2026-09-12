"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Sprout,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  MessagesSquare,
  MoreHorizontal,
} from "lucide-react";
import { Locale, pick, copy } from "@/content/site";
import { contactSchema, categories } from "@/lib/contact";
const topics = [
  "roads",
  "farmers",
  "healthcare",
  "education",
  "youth",
  "meeting",
  "other",
];
const icons = [
  MapPin,
  Sprout,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  MessagesSquare,
  MoreHorizontal,
];
export function ContactForm({ locale }: { locale: Locale }) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("concern");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [fields, setFields] = useState<string[]>([]);
  const started = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  useEffect(() => {
    started.current = Date.now();
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && topics.includes(t)) {
      queueMicrotask(() => {
        setTopic(t);
        setCategory(
          t === "meeting" ? "meeting" : t === "other" ? "other" : "concern",
        );
      });
    }
  }, []);
  const labels =
    locale === "hi"
      ? [
          "गाँव / स्थानीय समस्या",
          "किसान",
          "स्वास्थ्य",
          "शिक्षा",
          "युवा / रोजगार",
          "मुलाकात / संपर्क",
          "अन्य",
        ]
      : [
          "Village / Local concern",
          "Farmers",
          "Healthcare",
          "Education",
          "Youth / Employment",
          "Meeting / Contact",
          "Other",
        ];
  const fieldLabels = {
    name: pick(locale, "नाम", "Name"),
    mobile: pick(locale, "मोबाइल नंबर", "Mobile"),
    area: pick(
      locale,
      "गाँव / क्षेत्र (वैकल्पिक)",
      "Village / Area (optional)",
    ),
    category: pick(locale, "श्रेणी", "Category"),
    message: pick(locale, "संदेश", "Message"),
  };
  const catLabels =
    locale === "hi"
      ? ["जनसमस्या", "सुझाव", "मुलाकात / संपर्क", "सहयोग", "अन्य"]
      : [
          "Public Concern",
          "Suggestion",
          "Meeting / Contact",
          "Support / Cooperation",
          "Other",
        ];
  const inputClass =
    "mt-2 min-h-12 w-full border-0 border-b-2 border-navy/30 bg-white/70 p-4 transition-colors text-base text-ink outline-offset-2 focus:border-blue";
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name"),
      mobile: fd.get("mobile"),
      area: fd.get("area"),
      category: fd.get("category"),
      message: fd.get("message"),
      website: fd.get("website"),
      startedAt: started.current,
      locale,
    };
    const checked = contactSchema.safeParse(data);
    if (!checked.success) {
      setFields([
        ...new Set(checked.error.issues.map((i) => String(i.path[0]))),
      ]);
      setError(
        pick(
          locale,
          "कृपया नाम (कम से कम 2 अक्षर), सही भारतीय मोबाइल नंबर और संदेश (10–4000 अक्षर) भरें।",
          "Please enter your name (at least 2 characters), a valid Indian mobile number and a message of 10–4000 characters.",
        ),
      );
      setState("error");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setFields([]);
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("ok" in result) ||
        result.ok !== true
      ) {
        setError(
          response.status === 429
            ? pick(
                locale,
                "अभी बहुत अधिक अनुरोध आए हैं। कृपया कुछ देर बाद फिर प्रयास करें।",
                "There have been too many requests. Please try again later.",
              )
            : response.status === 503
              ? pick(
                  locale,
                  "ईमेल सेवा अभी उपलब्ध नहीं है। आपका संदेश भेजा नहीं गया है। कृपया बाद में फिर प्रयास करें।",
                  "The email service is currently unavailable. Your message has not been sent. Please try again later.",
                )
              : pick(
                  locale,
                  "संदेश भेजे जाने की पुष्टि नहीं हो सकी। कृपया कुछ देर बाद फिर प्रयास करें।",
                  "We could not confirm that your message was sent. Please try again shortly.",
                ),
        );
        setState("error");
      } else {
        setState("success");
        form.current?.reset();
        setTopic("");
        setCategory("concern");
        started.current = Date.now();
      }
    } catch {
      setError(
        pick(
          locale,
          "नेटवर्क समस्या के कारण संदेश भेजे जाने की पुष्टि नहीं हो सकी। कृपया फिर प्रयास करें।",
          "A network issue prevented confirmation. Please try again.",
        ),
      );
      setState("error");
    }
    requestAnimationFrame(() => summary.current?.focus());
  }
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-16 lg:py-24">
      <p className="mb-7 text-lg font-semibold text-navy">
        {pick(
          locale,
          "किस विषय पर बात करना चाहेंगे?",
          "What would you like to discuss?",
        )}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {topics.map((t, i) => {
          const Icon = icons[i];
          return (
            <button
              type="button"
              key={t}
              onClick={() => {
                setTopic(t);
                setCategory(
                  t === "meeting"
                    ? "meeting"
                    : t === "other"
                      ? "other"
                      : "concern",
                );
                form.current?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "start",
                });
              }}
              aria-pressed={topic === t}
              className={`group flex min-h-36 flex-col items-start justify-between gap-5 border p-5 text-left transition-colors ${topic === t ? "border-navy bg-navy text-white" : "border-navy/20 bg-[#e9e7df] text-navy hover:border-blue hover:bg-[#dfe7ee]"}`}
            >
              <Icon
                strokeWidth={1.4}
                className="transition-transform group-hover:-rotate-6"
              />
              <span className="text-sm font-semibold">{labels[i]}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-14 grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <h2 className="font-display text-4xl leading-snug text-navy">
            {pick(
              locale,
              "एक सार्थक संवाद की शुरुआत।",
              "Start a meaningful conversation.",
            )}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            {copy[locale].contact.lead}
          </p>
          <div className="mt-8 border-t border-navy/20 pt-6">
            {/* <h3 className="font-semibold text-navy">
              {copy[locale].contact.privacyTitle}
            </h3> */}
            {/* <p
              id="privacy-notice"
              className="mt-3 text-sm leading-relaxed text-ink/70"
            >
              {copy[locale].contact.privacy}{" "}
              {pick(
                locale,
                "संदेश ईमेल से टीम तक पहुँचता है। इस वेबसाइट के डेटाबेस में इसे संग्रहित नहीं किया जाता।",
                "Your message reaches the team by email. It is not stored in a website database.",
              )}
            </p> */}
          </div>
        </div>
        <form
          ref={form}
          id="jan-samvad"
          noValidate
          onSubmit={submit}
          aria-describedby="privacy-notice"
          className="min-w-0 border-t-4 border-gold bg-[#e2e8ee] p-5 sm:p-9"
        >
          <h2 className="font-display text-3xl text-navy">
            {copy[locale].contact.formTitle}
          </h2>
          <p className="mt-3 text-sm text-ink/65">
            {pick(
              locale,
              "गाँव / क्षेत्र के अतिरिक्त सभी फ़ील्ड आवश्यक हैं।",
              "All fields except Village / Area are required.",
            )}
          </p>
          <div
            ref={summary}
            id="form-feedback"
            tabIndex={-1}
            role={state === "error" ? "alert" : "status"}
            aria-live="polite"
            className={
              state === "success" || state === "error"
                ? "mt-6 border-l-4 border-blue bg-white p-4 text-navy"
                : ""
            }
          >
            {state === "error" && (
              <>
                <p>{error}</p>
                {fields.length > 0 && (
                  <ul className="mt-2 list-inside list-disc">
                    {fields
                      .filter((f) => f in fieldLabels)
                      .map((f) => (
                        <li key={f}>
                          <a href={`#field-${f}`} className="underline">
                            {fieldLabels[f as keyof typeof fieldLabels]}
                          </a>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            )}
            {state === "success" &&
              pick(
                locale,
                "आपका संदेश ईमेल सेवा ने स्वीकार कर लिया है। धन्यवाद। आवश्यकता होने पर टीम आपके दिए मोबाइल नंबर पर संपर्क करेगी।",
                "Your message has been accepted by the email service. Thank you. The team may contact you on the mobile number provided.",
              )}
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {(["name", "mobile", "area"] as const).map((field) => (
              <label
                key={field}
                className={`block text-sm font-semibold text-navy ${field === "area" ? "sm:col-span-2" : ""}`}
                htmlFor={`field-${field}`}
              >
                {fieldLabels[field]}
                <input
                  id={`field-${field}`}
                  name={field}
                  autoComplete={
                    field === "name"
                      ? "name"
                      : field === "mobile"
                        ? "tel"
                        : "address-level3"
                  }
                  type={field === "mobile" ? "tel" : "text"}
                  inputMode={field === "mobile" ? "tel" : "text"}
                  required={field !== "area"}
                  maxLength={
                    field === "name" ? 100 : field === "area" ? 160 : 15
                  }
                  aria-invalid={fields.includes(field)}
                  aria-describedby={
                    fields.includes(field) ? "form-feedback" : undefined
                  }
                  className={inputClass}
                />
              </label>
            ))}
            <label
              className="block text-sm font-semibold text-navy sm:col-span-2"
              htmlFor="field-category"
            >
              {fieldLabels.category}
              <select
                id="field-category"
                name="category"
                className={inputClass}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c, i) => (
                  <option value={c} key={c}>
                    {catLabels[i]}
                  </option>
                ))}
              </select>
            </label>
            <label
              className="block text-sm font-semibold text-navy sm:col-span-2"
              htmlFor="field-message"
            >
              {fieldLabels.message}
              <textarea
                id="field-message"
                name="message"
                rows={5}
                minLength={10}
                maxLength={4000}
                required
                aria-invalid={fields.includes("message")}
                aria-describedby={
                  fields.includes("message") ? "form-feedback" : undefined
                }
                className={inputClass}
              />
            </label>
          </div>
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button
            disabled={state === "sending"}
            type="submit"
            className="mt-6 flex min-h-13 w-full items-center justify-between gap-5 bg-navy px-5 py-4 font-semibold text-white transition-colors hover:bg-blue disabled:opacity-60"
          >
            {state === "sending"
              ? pick(locale, "भेजा जा रहा है…", "Sending…")
              : pick(locale, "संदेश भेजें", "Send your message")}
            <ArrowUpRight size={20} />
          </button>
          <noscript>
            <p className="mt-4">
              {pick(
                locale,
                "इस फ़ॉर्म को भेजने के लिए JavaScript चालू करें।",
                "Please enable JavaScript to send this form.",
              )}
            </p>
          </noscript>
        </form>
      </div>
    </section>
  );
}
