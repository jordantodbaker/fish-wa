import { StockingReport } from "@/generated/graphql-frontend";
import React from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { ConvertFishPerLb } from "@/backend/utils/lake-scraping";
import FormatLakeName from "@/app/utils/strings";

interface Props {
  stockingReports: [StockingReport];
}

const StockingReport: React.FC<Props> = ({ stockingReports }) => {
  return (
    <div>
      <div>
        <h1>Your Stocking Report</h1>
        <p>
          Add or edit lakes that show up in your stocking report in your{" "}
          <Link
            href="/account"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            account settings.
          </Link>
        </p>
        <p>
          You can also subscribe to text and/or email notifications and we will
          let you know as soon as your lakes are stocked.
        </p>
      </div>
      <>
        <Table aria-label="Your Stocking Report">
          <TableHeader>
            <TableColumn>Lake</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Size</TableColumn>
            <TableColumn>Species</TableColumn>
          </TableHeader>
          <TableBody>
            {stockingReports.map((report, i) => (
              <TableRow key={i}>
                <TableCell>{FormatLakeName(report.name!)}</TableCell>
                <TableCell>{new Date(report.date!).toDateString()}</TableCell>
                <TableCell>{report.number}</TableCell>
                <TableCell>{`${ConvertFishPerLb(report.size)} lbs`}</TableCell>
                <TableCell>{report.species}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </div>
  );
};

export default StockingReport;
