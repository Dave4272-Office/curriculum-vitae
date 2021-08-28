import { DateTime } from "luxon";

export type Certificate = {
  include: boolean;
  name: string;
  issuer: string;
  issuericon: string;
  issuedate: DateTime;
  expirydate?: DateTime;
  certid?: string;
  credurl: string;
};
