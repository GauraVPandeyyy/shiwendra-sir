import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost:3000/en",
  pretendToBeVisual: true,
});
Object.defineProperties(globalThis, {
  self: { value: dom.window, configurable: true },
  SVGElement: { value: dom.window.SVGElement, configurable: true },
  window: { value: dom.window, configurable: true },
  document: { value: dom.window.document, configurable: true },
  navigator: { value: dom.window.navigator, configurable: true },
  HTMLElement: { value: dom.window.HTMLElement, configurable: true },
  Element: { value: dom.window.Element, configurable: true },
  requestAnimationFrame: {
    value: dom.window.requestAnimationFrame.bind(dom.window),
    configurable: true,
  },
});
dom.window.matchMedia = () => ({
  matches: false,
  media: "",
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return true;
  },
});
test("carousel exposes three indicators, navigation, pause and resume", async () => {
  const { render, fireEvent, cleanup } = await import("@testing-library/react");
  const { default: Hero } = await import("../src/components/Hero/Hero");
  const React = await import("react");
  const view = render(React.createElement(Hero, { locale: "en" }));
  assert.equal(
    view.getByRole("heading", { level: 1 }).textContent,
    "For HarchandpurA clear direction. A public commitment.",
  );
  assert.equal(view.getAllByRole("button", { name: /^Slide \d$/ }).length, 3);
  fireEvent.pointerDown(view.getByRole("button", { name: "Pause slides" }));
  fireEvent.click(view.getByRole("button", { name: "Pause slides" }));
  assert.ok(view.getByRole("button", { name: "Play slides" }));
  fireEvent.click(view.getByRole("button", { name: "Next slide" }));
  assert.match(
    view.getByRole("heading", { level: 1 }).textContent || "",
    /Among the people/,
  );
  assert.ok(view.getByRole("button", { name: "Play slides" }));
  fireEvent.click(view.getByRole("button", { name: "Play slides" }));
  assert.ok(view.getByRole("button", { name: "Pause slides" }));
  cleanup();
});
