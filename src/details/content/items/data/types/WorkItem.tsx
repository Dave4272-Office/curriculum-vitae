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
};
