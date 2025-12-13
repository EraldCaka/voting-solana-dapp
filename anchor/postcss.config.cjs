/**
 * Neutral PostCSS config for anchor tests.
 *
 * Purpose:
 * - Prevents the parent project's PostCSS config/plugins from being loaded when
 *   running tests from the `anchor/` folder (Vitest/Vite will search upward).
 * - Keeps the test environment minimal so JS tests that import the workspace don't
 *   crash due to app-specific PostCSS plugins (Tailwind, PostCSS plugins, etc.).
 */
module.exports = {
  plugins: [],
}
