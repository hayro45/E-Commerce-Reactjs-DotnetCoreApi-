import { Box } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import Product from "./Product";

interface Props {
    products: IProduct[];
}

export default function ProductList({products}: Props) {
  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
    >
      {products.map((p: IProduct) => (
        <Product key={p.id} product={p} />
      ))}
    </Box>
  );
}