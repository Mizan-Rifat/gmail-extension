import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/Demo/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";
import { elements, selectors } from "../../elements";

refreshOnUpdate("pages/content");

let initialized = false;

chrome.runtime.onMessage.addListener(() => {
  init();
});

const cleanLabel = (label: string) => label.replace(":", "");

const init = () => {
  if (!initialized) {
    const { showDetailsBtn } = elements();

    const tooltipBtns = document.querySelectorAll(selectors.tooltipBtns);

    console.log({ tooltipBtns });

    showDetailsBtn.click();
    // showDetailsBtn.click();
    const { detailsCard } = elements();
    const tableRows = detailsCard.querySelectorAll(selectors.tableRow);

    detailsCard.style.display = "block";
    // console.log({ tableRows });

    const emailDetails = {};
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

    initialized = true;
  }
};

// attachTwindStyle(rootIntoShadow, shadowRoot);

// createRoot(rootIntoShadow).render(<App />);
