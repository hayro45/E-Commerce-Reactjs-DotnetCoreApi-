import { IProduct } from "../../model/IProduct";
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from "@mui/material";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";

import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";


interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const { status} = useAppSelector(state=>state.cart);
  const dispatch = useAppDispatch();

  

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}> 
        <CardContent sx={{ flexGrow: 1, textAlign: "center" }}> 
          <CardMedia
            sx={{ height: 140, backgroundSize: "contain" }}
            image={`http://localhost:5037/images/${product.imageUrl}`}
          />
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            color="text.secondary"
            sx={{ wordWrap: "break-word" }}
          >
            {product.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {currencyTRY.format(product.price)}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: 2, flexWrap: "wrap" }}> 
          <LoadingButton
            loadingPosition="start"
            loading={status === "pendingAddItem" + product.id}
            onClick={() => dispatch(addItemToCart({ productId: product.id }))}
            startIcon={<AddShoppingCart />}
            variant="outlined"
            size="small"
            color="success"
            sx={{ flex: "1 1 auto", minWidth: "120px" }}
          >
            Sepete Ekle
          </LoadingButton>
          <Button
            component={Link}
            to={`/catalog/${product.id}`}
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<Search />}
            sx={{ flex: "1 1 auto", minWidth: "120px" }}
          >
            Görüntüle
          </Button>
        </CardActions>
      </Card>
    </>
  );
}