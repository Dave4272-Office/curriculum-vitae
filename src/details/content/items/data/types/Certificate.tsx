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

export type ICertificate = {
  include: boolean;
  name: string;
  issuer: string;
  issuericon: string;
  issuedate: string;
  expirydate?: string;
  certid?: string;
  credurl: string;
};