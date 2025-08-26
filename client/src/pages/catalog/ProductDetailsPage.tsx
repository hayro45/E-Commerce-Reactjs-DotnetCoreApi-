import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IProduct } from '../../model/IProduct';
import { CircularProgress, Box, Divider, TableContainer, Table, TableRow, TableCell, TableBody } from '@mui/material';
import request from '../../api/requests';
import NotFound from '../../errors/NotFound';

export default function ProductDetailsPage() {
  const {id} = useParams<{id: string}>();
  const [product, setProducts] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (id) {
        request.Catalog.details(id)
            .then(data => setProducts(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }
    }, [id]);

    if (loading) return <CircularProgress />;
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
          Price: ${product.price}
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
      </Box>
    </Box>
  );
}
