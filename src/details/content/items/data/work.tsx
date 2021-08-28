import { DateTime } from "luxon";
import { WorkItem } from "./types/WorkItem";

export const workList: WorkItem[] = [
  {
    include: true,
    designation: "Project Engineer",
    from: DateTime.local(2020, 9, 28),
    organization: "Wipro Limited",
    organizationicon: "static/logos/third-party/Wipro.png",
    emptype: "Full Time",
    desc: (
      <ul>
        <li>Working in Agile project in finance sector.</li>
        <li>
          Developed critical application modules related to foreign currency
          exchange.
        </li>
        <li>Handled deployments to production.</li>
        <li>Technologies used:</li>
        <ul>
          <li>Java</li>
          <li>Spring Boot</li>
          <li>Redis</li>
          <li>PCF</li>
          <li>Oracle Database</li>
        </ul>
      </ul>
    ),
  },
];
