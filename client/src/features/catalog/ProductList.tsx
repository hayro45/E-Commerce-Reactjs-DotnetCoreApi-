import { Box } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import Product from "./Product";

interface Props {
    products: IProduct[];
}

export default function ProductList({products}: Props) {
    return (
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
        p: 2
      }}>
        { products.map((p: IProduct) => (
          <Box key={p.id}>
            <Product product={p} />
          </Box>
        )) }
      </Box>
    );
  }