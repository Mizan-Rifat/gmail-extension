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
