/** @type {import("lint-staged").Config} */
const config = {
  "*.{ts,tsx,js,jsx,mjs,cjs}": ["eslint --fix", "prettier --write"],
  "*.{json,md,mdx,css,yml,yaml}": ["prettier --write"],
};

export default config;
