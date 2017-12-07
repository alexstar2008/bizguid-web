export class EnterpriseFull {
  slug: string;
  name: string;
  logo: string;
  description: string;
  emails: string[];
  phones: string;
  postAddress: string;
  address: string;
  faxes: string;
  contactPeople: ContactPeople;
  openHours: OpenHours;
  skype: string;
  employeesNumber: number;
  yearOfFoundation: number;
  bankDetails: BankDetails;
  productsAndOffers: string;
  branches: string[];
  trademarks: string;
  categoriesId: string[];
  companyRegionsId: string[];
  exportRegionsID: string[];
  importRegionsId: string[];
  qualityStandarts: string;
  sitesUrl: string;
}

class ContactPeople {
  manager: string;
  director: string;
  accountant: string;
}

class OpenHours {
  'Mon-Fri': string;
  'Sat-Sun': string;
}

class BankDetails {
  companyRegistrationNumber: number;
  bank: string;
  MFO: number;
  INN: number;
}
