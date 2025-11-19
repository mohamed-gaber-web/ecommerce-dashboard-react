import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import '../brands.css';
import type { IBrand } from "@/types/brand";


interface Props {
  brands: IBrand[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BrrandTable({ brands, onEdit, onDelete }: Props) {
  
  return (
    <Table className="table">
      <TableHeader>
        <TableRow>          
          <TableHead className="p-3">Name</TableHead>
          <TableHead className="p-3">Slug</TableHead>
          <TableHead className="p-3">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand._id}>
            <TableCell  className="p-3">{brand.name}</TableCell >
            <TableCell  className="p-3">{brand.slug}</TableCell >
            <TableCell  className="p-3 flex gap-2">
              <Button variant="outline" onClick={() => onEdit(brand._id!)} size="sm"><Pencil className="h-4 w-4" /> </Button>
              <Button variant="destructive" onClick={() => onDelete(brand._id!)} size="sm"><Trash2 className="h-4 w-4" /></Button>
            </TableCell >
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
