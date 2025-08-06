import {
  TableBody,
  TableCaption,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type TableProps<T extends Record<string, string | number>> = {
  caption?: string;
  data: T[];
  columnHead: string[];
};

export default function Table({
  caption,
  data,
  columnHead,
}: TableProps<Record<string, string | number>>) {
  return (
    <TableComponent>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columnHead.map((column) => (
            <TableHead className="text-start text-black">{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => {
          const rowValues = Object.values(row);
          return (
            <TableRow key={row.id}>
              {rowValues.map((value) => (
                <TableCell>{value}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </TableComponent>
  );
}
