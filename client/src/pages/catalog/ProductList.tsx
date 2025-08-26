import Product from './Product';
import { IProduct } from '../../model/IProduct';
import { Box } from '@mui/material';

interface Props {
    products: IProduct[];
}

export default function ProductList({ products }: Props) {
    return (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {
                products.map((p: IProduct) => (
                    <Box key={p.id}>
                        <Product product={p} />
                    </Box>
                ))
            }
        </Box>
    );
}