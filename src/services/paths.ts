export default {
  getBusiessList: `/business-user/business-list`,
  getStages: (businessId: string) =>
    `/business/${businessId}/opportunity-stage?type=simple-data`,
  createLead: (businessId: string) => `/business/${businessId}/lead`,
};
