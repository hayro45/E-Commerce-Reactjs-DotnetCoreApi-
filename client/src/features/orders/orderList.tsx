import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { IOrder } from "../../model/IOrder"
import requests from "../../api/requests";
import { currencyTRY } from "../../utils/formatCurrency";
import { ArrowRight } from "@mui/icons-material";
import CloseIcon  from "@mui/icons-material/Close";

const orderStatus = ["Pending", "Approved", "PaymentFailed", "Completed"];

export default function OrderList() {
    const [orders, setOrders] = useState<IOrder[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const [open, setOpen] = useState(false);

    const subTotal = selectedOrder?.orderItems.reduce((toplam, item) => toplam + (item.price * item.quantity), 0) ?? 0;
    const tax = subTotal * 0.18;
    const total = subTotal + tax;

    function handleDialogOpen(order: IOrder) {
        setOpen(true);
        setSelectedOrder(order);
    }

    function handleDialogClose() {
        setOpen(false);
        setSelectedOrder(null); 
    }

    useEffect(()=> {
        setLoading(true)
        requests.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error=>(console.error(error)))
            .finally(()=>setLoading(false));
    }, []);

    if(loading) return <CircularProgress />

  return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Order Status</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map(order => (
                        <TableRow key={order.id}>
                            <TableCell component="th" scope="row">{order.id}</TableCell>
                            <TableCell component="th" scope="row">{orderStatus[order.orderStatus]}</TableCell>
                            <TableCell component="th" scope="row">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell component="th" scope="row">{currencyTRY.format(order.subTotal)}</TableCell>
                            <TableCell component="th" scope="row" sx={{width: 100}}>
                                <Button onClick={()=>handleDialogOpen(order)} size="small" variant="contained" endIcon={<ArrowRight />}>Details</Button>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog fullWidth maxWidth="lg" open={open} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Sipariş No: ${selectedOrder?.id}</DialogTitle>
            <IconButton onClick={handleDialogClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers id="alert-dialog-description">
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Teslimat Bilgileri</Typography>
                    <Typography gutterBottom>{selectedOrder?.firstName} {selectedOrder?.lastName}</Typography>
                    <Typography gutterBottom>{selectedOrder?.phone}</Typography>
                    <Typography gutterBottom>{selectedOrder?.addressLine}/{selectedOrder?.city}</Typography>
                </Paper>
                <TableContainer component={Paper} sx={{ mb: 2, width: '100%' }}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">Fiyat</TableCell>
                                <TableCell align="right">Adet</TableCell>
                                <TableCell align="right">Toplam</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedOrder?.orderItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <img src={`http://localhost:5037/images/${item.productImageUrl}`} style={{height: 60}}/>
                                    </TableCell>
                                    <TableCell align="right">{item.productName}</TableCell>
                                    <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{currencyTRY.format(item.price * item.quantity)}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="right" colSpan={4}>Ara Toplam</TableCell>
                                <TableCell align="right">{subTotal}</TableCell>
                            </TableRow>
                              <TableRow>
                                <TableCell align="right" colSpan={4}>Vergi</TableCell>
                                <TableCell align="right">{tax}</TableCell>
                            </TableRow>
                              <TableRow>
                                <TableCell align="right" colSpan={4}>Toplam</TableCell>
                                <TableCell align="right">{total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    </>
    )
}