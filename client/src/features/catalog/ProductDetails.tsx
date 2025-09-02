import { CircularProgress, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { currencyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../cart/cartSlice";
import { fetchProductById, selectProductById } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ProductDetailsPage() {

    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    const product = useAppSelector(state => selectProductById(state, Number(id)));
    const { status: loading} = useAppSelector(state => state.catalog);

    const item = cart?.cartItems.find(i => i.productId == product?.id);

    useEffect(() => {
        if (!product && id) dispatch(fetchProductById(parseInt(id)))
    }, [id, dispatch, product]);

    if(loading === "pendingFetchProductById") return <CircularProgress />

    if(!product) return <NotFound />

    return (
       <Box sx={{
         display: 'grid',
         gridTemplateColumns: {
           xs: '1fr',
           sm: '1fr 1fr',
           md: '5fr 7fr',
           lg: '4fr 8fr',
           xl: '3fr 9fr'
         },
         gap: 6,
         p: 2
       }}>
            <Box>
                <img src={`http://localhost:5037/images/${product.imageUrl}`} 
                     alt={product.name}
                     style={{width: "100%", height: "auto", objectFit: "contain"}}/>
            </Box>
            <Box>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant="h4" color="secondary">{ currencyTRY.format(product.price)  } ₺</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stock</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack direction="row" spacing={2} sx={{mt: 3}} alignItems="center">
                    <LoadingButton 
                        variant="outlined" 
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        loading={ status === "pendingAddItem" + product.id } 
                        onClick={() => dispatch(addItemToCart({productId: product.id}))}>
                        Sepete Ekle
                    </LoadingButton>

                    {
                        item?.quantity && item.quantity > 0 && (
                            <Typography variant="body2">Sepetinize {item?.quantity} adet eklendi</Typography>
                        )
                    }
                </Stack>
            </Box>
       </Box>
    );
}