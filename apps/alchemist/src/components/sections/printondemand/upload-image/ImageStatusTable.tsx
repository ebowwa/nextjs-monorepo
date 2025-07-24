import React from 'react';
import { ImageFileWithStatus } from "@/types/index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/common/table";
import StatusBadge from './StatusBadge';

const ImageStatusTable: React.FC<{ images: ImageFileWithStatus[] }> = ({ images }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Preview</TableHead>
          <TableHead>Filename</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {images.map((image, index) => (
          <TableRow key={index}>
            <TableCell>
              {['converted', 'verifying'].includes(image.status) ? (
                // Removed height, width, and style attributes
                <img alt="Image Preview" className="rounded-md" src={image.pngUrl} />
              ) : (
                <span className="text-sm">Loading...</span>
              )}
            </TableCell>
            <TableCell>{image.file.name}</TableCell>
            <TableCell>
              <StatusBadge status={image.status} errorMessage={image.errorMessage} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImageStatusTable;
