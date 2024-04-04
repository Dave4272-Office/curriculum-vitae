import { DateTime } from "luxon";

export type WorkItem = {
  include: boolean;
  designation: string;
  from: DateTime;
  to?: DateTime;
  organization: string;
  organizationicon: string;
  emptype: string;
  desc: React.ReactElement;
  skills: React.ReactElement;
  location: string;
};

export type IWorkItem = {
  include: boolean;
  designation: string;
  from: string;
  to?: string;
  organization: string;
  organizationicon: string;
  emptype: string;
  desc: string[];
  skills: string[];
  location: string;
};
