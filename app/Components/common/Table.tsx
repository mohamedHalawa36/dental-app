import {
  TableBody,
  TableCaption,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type TableProps<T extends Record<string, string>> = {
  caption: string;
  data: T[];
};

export default function Table({
  caption,
  data,
}: TableProps<Record<string, string>>) {
  const columnHead = Object.keys(data);
  return (
    <TableComponent>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columnHead.map((column) => (
            <TableHead>{column}</TableHead>
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
