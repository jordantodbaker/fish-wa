import { StockingReport } from "@/generated/graphql-frontend";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { ConvertFishPerLb } from "@/backend/utils/lake-scraping";

interface Props {
  stockingReports: [StockingReport];
}

const StockingReport: React.FC<Props> = ({ stockingReports }) => {
  return (
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
            <TableCell>{report.name}</TableCell>
            <TableCell>
              {new Date(parseInt(report.date!)).toDateString()}
            </TableCell>
            <TableCell>{report.number}</TableCell>
            <TableCell>{`${ConvertFishPerLb(report.size)} lbs`}</TableCell>
            <TableCell>{report.species}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockingReport;
