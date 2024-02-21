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
    default_icon: "icons/48x48.png",
  },
  icons: {
    "16": "icons/16x16.png",
    "32": "icons/32x32.png",
    "48": "icons/48x48.png",
    "128": "icons/128x128.png",
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
        "icons/*.png",
      ],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
