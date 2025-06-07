import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { visitorData } from "@/data/mockData";

export const VisitorTable = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg">Visitor Details</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-400">Id</TableHead>
              <TableHead className="text-gray-400">Visitor</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">In Time</TableHead>
              <TableHead className="text-gray-400">Out Time</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitorData.map((visitor) => (
              <TableRow key={visitor.id} className="border-gray-700">
                <TableCell className="text-gray-300 font-medium">
                  {visitor.id}
                </TableCell>
                <TableCell className="text-gray-300">
                  {visitor.visitor}
                </TableCell>
                <TableCell className="text-gray-300">{visitor.date}</TableCell>
                <TableCell className="text-gray-300">
                  {visitor.inTime}
                </TableCell>
                <TableCell className="text-gray-300">
                  {visitor.outTime || "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={visitor.status === "In" ? "default" : "secondary"}
                    className={
                      visitor.status === "In"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {visitor.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
