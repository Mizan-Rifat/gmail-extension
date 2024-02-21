import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Onesuite.io - Lead Grabber for Free",
  version: packageJson.version,
  description: packageJson.description,
  permissions: ["storage", "tabs", "cookies"],
  host_permissions: [
    "https://api-staging.onesuite.io/*",
    "https://staging.onesuite.io/",
    "https://app.onesuite.io/",
    "https://api.onesuite.io/",
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
    {
      matches: ["https://app.onesuite.io/*"],
      js: ["src/pages/onesuiteContent/index.js"],
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/svg/*.svg",
        "assets/png/*.png",
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
