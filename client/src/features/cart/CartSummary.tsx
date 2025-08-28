import { TableCell, TableRow } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/hooks";


export default function CartSummary() {
    const { cart } = useAppSelector(state => state.cart);
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam+ (item.quantity * item.price), 0);
  
    const tax = subTotal ? subTotal * 0.2 : 0;
    const total = subTotal ? subTotal + tax : 0;

    return (
      <>
        <TableRow>
            <TableCell align="right" colSpan={5}>Ara Toplam</TableCell>
            <TableCell align="right" colSpan={5}>{currencyTRY.format(subTotal ? subTotal : 0)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="right" colSpan={5}>Vergi (%20)</TableCell>
            <TableCell align="right" colSpan={5}>{currencyTRY.format(tax ? tax : 0)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="right" colSpan={5}>Toplam</TableCell>
            <TableCell align="right" colSpan={5}>{currencyTRY.format(total ? total : 0)}</TableCell>
        </TableRow>
      </>
    );
}