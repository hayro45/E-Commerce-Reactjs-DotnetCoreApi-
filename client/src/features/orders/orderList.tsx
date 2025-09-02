import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export default function OrderList() {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Delivery Fee</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* Map through orders and create table rows */}
            </TableBody>
        </Table>
    </TableContainer>
  )
}