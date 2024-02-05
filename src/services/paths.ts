export default {
  getBusiessList: `/business-user/business-list`,
  getStages: (businessId: string) =>
    `/business/${businessId}/opportunity-stage?type=simple-data`,
  getLeadAttributes: (businessId: string) =>
    `/business/${businessId}/lead-attributes`,
  createLead: (businessId: string) => `/business/${businessId}/lead`,
};
