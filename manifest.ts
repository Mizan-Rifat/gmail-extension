import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["storage", "tabs", "cookies"],
  host_permissions: [
    "*://localhost:8000/*",
    "https://api-staging.onesuite.io/*",
    "https://stage-api.post.market/api/*",
    "https://staging.onesuite.io/",
  ],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_icon: "icon-34.png",
  },
  icons: {
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["https://mail.google.com/*", "https://mail.google.com/*"],
      js: ["src/pages/content/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/svg/*.svg",
        "assets/jpeg/*.jpeg",
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-34.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
