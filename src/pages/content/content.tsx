import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import { elements, ids, selectors } from "@src/pages/content/elements";
import CreateLeadBtn from "@src/pages/content/components/CreateLeadBtn";
import { setStorageValue } from "@src/pages/content/utils";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { EmailDetails } from "@root/src/pages/content/types";

refreshOnUpdate("pages/content");

let initializedTabId = "";

chrome.runtime.onMessage.addListener((message) => {
  const { tabId, token } = message;
  if (token) {
    setStorageValue({ token });
  } else {
    setStorageValue({ token: false });
  }
  init(tabId);
});

export const getEmailDetails = (listItem) => {
  const avatarEl = listItem.querySelector(selectors.avatar);
  const avatar = avatarEl?.getAttribute("src");

  const hoverCardEls = listItem.querySelectorAll(selectors.hovercardId);

  let name, email;
  if (hoverCardEls[1]) {
    email = hoverCardEls[1].getAttribute("email");
    name = hoverCardEls[1].getAttribute("name");
  }
  return { email, name, avatar };
};

const init = async (tabId) => {
  if (tabId !== initializedTabId) {
    const { showDetailsBtn, leadCreatorEl } = elements();

    const listItem = document.querySelector(selectors.listItem);

    let emailDetails = {} as EmailDetails;
    if (listItem) {
      const { name, email, avatar } = getEmailDetails(listItem);

      emailDetails = { name, email, avatar };
    }

    if (leadCreatorEl) {
      leadCreatorEl.remove();
    }

    if (showDetailsBtn) {
      const root = document.createElement("div");
      root.id = ids.shadowRoot;
      const rootIntoShadow = document.createElement("div");
      rootIntoShadow.id = ids.leadCreator;
      const shadowRoot = root.attachShadow({ mode: "open" });

      shadowRoot.appendChild(rootIntoShadow);

      const cache = createCache({
        container: shadowRoot,
        key: "test",
        prepend: false,
      });

      attachTwindStyle(rootIntoShadow, shadowRoot);
      createRoot(rootIntoShadow).render(
        <CacheProvider value={cache}>
          <CreateLeadBtn emailDetails={emailDetails} />
        </CacheProvider>
      );
      document.body.append(root);

      initializedTabId = tabId;
    }
  }
};
