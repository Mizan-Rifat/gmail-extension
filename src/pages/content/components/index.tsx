import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import { elements, selectors } from "../elements";
import App from "./app";

refreshOnUpdate("pages/content");

let initialized = false;

chrome.runtime.onMessage.addListener(() => {
  init();
});

const cleanLabel = (label: string) => label.replace(":", "");

const init = () => {
  if (!initialized) {
    const { showDetailsBtn, sidebar } = elements();

    showDetailsBtn.click();
    // showDetailsBtn.click();

    console.log({ sidebar });

    const { detailsCard, avatar } = elements();
    console.log({ avatar });

    const tableRows = detailsCard.querySelectorAll(selectors.tableRow);

    detailsCard.style.display = "block";
    // console.log({ tableRows });

    const emailDetails = {};
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

    const rootIntoShadow = document.createElement("div");

    // const shadowRoot = root.attachShadow({ mode: "open" });
    // shadowRoot.appendChild(rootIntoShadow);

    attachTwindStyle(rootIntoShadow, document);

    createRoot(rootIntoShadow).render(<App emailDetails={emailDetails} />);
    sidebar.parentElement.prepend(rootIntoShadow);

    initialized = true;
  }
};
