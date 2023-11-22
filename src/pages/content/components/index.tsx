import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import { elements, selectors } from "../elements";
import App from "@src/pages/content/components/App";
import { getStorageValue } from "../utils";
import Test from "./Test";

refreshOnUpdate("pages/content");

export interface EmailDetails {
  avatar: string;
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string | null;
  };
  date: string;
  subject: string;
  "mailed-by": string;
  "signed-by": string;
  security: string;
}

let initialized = false;
let initializedTabId = "";

chrome.runtime.onMessage.addListener(({ tabId }) => {
  console.log({ tabId });

  init(tabId);
});

const cleanLabel = (label: string) => label.replace(":", "");

const init = async (tabId) => {
  const storedTabId = await getStorageValue("tabId");

  console.log({ storedTabId, tabId });

  // if (storedTabId !== tabId) {
  //   initialized = false;
  // }

  if (tabId !== initializedTabId) {
    const { showDetailsBtn, sidebar, gmailExt } = elements();

    if (gmailExt) {
      gmailExt.remove();
    }
    showDetailsBtn.click();
    // showDetailsBtn.click();

    const { detailsCard, avatar } = elements();

    const tableRows = detailsCard.querySelectorAll(selectors.tableRow);

    const emailDetails = {} as EmailDetails;
    emailDetails.avatar = avatar?.getAttribute("src");
    tableRows?.forEach((row) => {
      const tds = row.querySelectorAll("td");
      if (tds.length === 2) {
        const label = cleanLabel(tds[0]?.innerText);

        const hoverCardEls = tds[1].querySelectorAll(selectors.hovercardId);

        let value = tds[1]?.innerText;
        if (hoverCardEls.length > 0) {
          //@ts-ignore
          value = {
            email: hoverCardEls[0].getAttribute("email"),
            name: hoverCardEls[0].getAttribute("name"),
          };
        }
        if (label && value) {
          emailDetails[label] = value;
        }
      }
    });

    console.log({ emailDetails });

    const root = document.createElement("div");
    root.id = "kkkk";
    // document.body.append(root);

    const rootIntoShadow = document.createElement("div");
    rootIntoShadow.id = "gmail-extension";
    const shadowRoot = root.attachShadow({ mode: "open" });
    shadowRoot.appendChild(rootIntoShadow);
    attachTwindStyle(rootIntoShadow, shadowRoot);
    createRoot(rootIntoShadow).render(<App emailDetails={emailDetails} />);
    // sidebar.parentElement.prepend(root);
    document.body.append(root);

    initializedTabId = tabId;
  }
};
