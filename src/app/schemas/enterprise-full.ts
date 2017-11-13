export class EnterpriseFull {
  slug: string;
  name: string;
  logo: string;
  description: string;
  emails: string;
  phones: string;
  postAddress: string;
  faxes: string;
  contactPeople: ContactPeople;
  openHours: OpenHours;
  employeesNumber: number;
  yearOfFoundation: number;
  bankDetails: BankDetails;
  productsAndOffers: string;
  categoriesId: string[];
  companyRegionsId: string[];
}

class ContactPeople {
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
