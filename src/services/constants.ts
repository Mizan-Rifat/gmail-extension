export const BASE_URL = "https://api.onesuite.io/v1";

export const CLIENT_URL = "https://app.onesuite.io/auth/signin";

export const paths = {
  getBusiessList: `/leads/attributes`,
  getStages: (businessId: string) =>
    `/business/${businessId}/opportunity-stage?type=simple-data`,
  getLeadAttributes: (businessId: string) =>
    `/business/${businessId}/lead-attributes`,
  createLead: (businessId: string) => `/business/${businessId}/lead`,
};
