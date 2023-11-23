type Selectors = {
  showDetailsBtn: string;
  detailsCard: string;
  hovercardId: string;
  tableRow: string;
  tooltipBtns: string;
  sidebar: string;
  avatar: string;
  leadCreatorEl: string;
};

type Elements = {
  [K in keyof Selectors]: HTMLElement | null;
};

export const classNames = {};

export const ids = {
  leadCreator: "lead-creator",
  shadowRoot: "shadow-root",
};

export const selectors: Selectors = {
  showDetailsBtn: '[aria-label="Show details"]',
  detailsCard: ".ajA.SK",
  tableRow: "table tr",
  hovercardId: "[data-hovercard-id]",
  tooltipBtns: "[data-is-tooltip-wrapper]",
  sidebar: '[aria-label="Side panel"]',
  avatar: "img[data-hovercard-id]",
  leadCreatorEl: `#${ids.leadCreator}`,
};

export const getElement: (selector: string) => HTMLElement | null = (
  selector
) => document.querySelector(selector);

export const elements: () => Elements = () =>
  Object.keys(selectors).reduce((acc, selector) => {
    const key = selector as keyof Selectors;
    acc[key] = getElement(selectors[key]);
    return acc;
  }, {} as Elements);
