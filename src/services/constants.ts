export const BASE_URL = "https://api.onesuite.io/api";

export const CLIENT_URL = "https://app.onesuite.io/auth/signin";

export const paths = {
  getBusiessList: `/business-user/business-list`,
  getStages: (businessId: string) =>
    `/business/${businessId}/opportunity-stage?type=simple-data`,
  getLeadAttributes: (businessId: string) =>
    `/business/${businessId}/lead-attributes`,
  createLead: (businessId: string) => `/business/${businessId}/lead`,
};
