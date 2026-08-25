import { DateTime } from "luxon";
import type { ReactElement } from "react";

export type WorkItem = {
  include: boolean;
  designation: string;
  from: DateTime;
  to?: DateTime;
  organization: string;
  organizationicon: string;
  emptype: string;
  desc: ReactElement;
  skills: ReactElement;
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
