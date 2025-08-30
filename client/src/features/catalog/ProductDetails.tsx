import Typography from '@mui/material/Typography';
import { useEffect} from 'react';
import { useParams } from 'react-router';
import { CircularProgress, Box, Divider, TableContainer, Table, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import NotFound from '../../errors/NotFound';
import { LoadingButton } from '@mui/lab';
import { AddShoppingCart } from '@mui/icons-material';
import { currencyTRY } from '../../utils/formatCurrency';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addItemToCart } from '../cart/cartSlice';
import { fetchProductById } from './catalogSlice';

export default function ProductDetails() {
  const{cart, status} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const {id} = useParams<{id: string}>();
  const product = useAppSelector(state => state.catalog.entities[Number(id)]);
  const {status:loading} = useAppSelector(state => state.catalog);
  const item = cart?.cartItems.find(i => i.productId === product?.id);
  
  useEffect(()=>{
    if(!product && id) dispatch(fetchProductById(parseInt(id)));
  }, [id]);

  if (loading === 'pendingFetchProductById') return <CircularProgress />;

  if (!product) {
      return <NotFound />;
  }
  
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
      <Box>
        <img src={`http://localhost:5037/images/${product.imageUrl}`} alt={product.name} style={{ width: '100%' }} />
      </Box>
      <Box>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant='h4' color='secondary'>
          Fiyat: {currencyTRY.format(product.price)}
        </Typography>
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
        <Stack direction="row" sx={{ mt: 3 }} alignItems="center" spacing={2}>
          <LoadingButton
              variant="outlined"
              loadingPosition="start"
              startIcon={<AddShoppingCart />}
              loading={status === "pendingAddItem" + product.id}
              onClick={() => dispatch(addItemToCart({productId: product.id}))}
          >
              Sepete Ekle
          </LoadingButton>
          {
            item?.quantity && item.quantity > 0 && (
            <Typography variant="body2" color="text.secondary">
              {item?.quantity} adet sepette
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
