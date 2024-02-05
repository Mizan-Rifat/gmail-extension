export interface Business {
  id: string;
  slug: string;
  businessName: string;
  businessLogo: string;
  businessWebsite: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
}
export interface BusinessListItem {
  id: string;
  role: string;
  status: string;
  userId: string;
  businessId: string;
  business: Business;
}

export interface Stage {
  id: string;
  stageName: string;
  stageNo: number;
}

export interface LeadIndustry {
  id: string;
  name: string;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadOpportunityStage {
  id: string;
  stageName: string;
  stageNo: number;
  isFolded: boolean;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadSource {
  id: string;
  name: string;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadTag {
  id: string;
  name: string;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadAttributes {
  leadIndustries: LeadIndustry[];
  leadOpportunityStages: LeadOpportunityStage[];
  leadSources: LeadSource[];
  leadTags: LeadTag[];
}

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
