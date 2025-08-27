import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import request from "../../api/requests";

export default function ShoppingCartPage()
{
    const { cart, setCart } = useCartContext();
    const [status, setStatus] = useState({loading: false, id: ""});

    function handleAddItem(productId:number, id: string) {
        setStatus({loading: true, id});
        
        request.Cart.addItem(productId, 1)
            .then(cart => setCart(cart))
            .catch(error => console.error(error))
            .finally(() => setStatus({loading: false, id: ""}));
    }

    function handleRemoveItem(productId: number, id: string, quantity: number) {
        setStatus({loading: true, id});

        request.Cart.deleteItem(productId, quantity)
            .then(cart => setCart(cart))
            .catch(error => console.error(error))
            .finally(() => setStatus({loading: false, id: ""}));
    }

    if (cart?.cartItems.length === 0) {
      return <Alert severity="warning">Sepetinizde ürün yok</Alert>;
    }

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Fiyat</TableCell>
              <TableCell align="right">Adet</TableCell>
              <TableCell align="right">Toplam</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.cartItems.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                 <TableCell component="th" scope="row">
                  <img src={`http://localhost:5037/images/${item.imageUrl}`} style={{height: 60}}/>
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.price} ₺</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status.loading && status.id === "add"+item.productId.toString()} onClick={() => handleAddItem(item.productId, "add"+item.productId.toString())}>
                    <AddCircleOutline />
                  </LoadingButton>
                    {item.quantity}
                  <LoadingButton loading={status.loading && status.id === "remove"+item.productId.toString()} onClick={() => handleRemoveItem(item.productId, "remove"+item.productId.toString(), 1)}>
                    <RemoveCircleOutline />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{item.price * item.quantity} ₺</TableCell>
                <TableCell align="right">
                    <LoadingButton color="error" loading={status.loading && status.id === "dell"+item.productId.toString()}
                     onClick={() => handleRemoveItem(item.productId, "dell"+item.productId.toString(), item.quantity)}>
                        <Delete />
                    </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}