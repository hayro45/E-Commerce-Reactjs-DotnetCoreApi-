import { IProduct } from "../../model/IProduct";
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from "@mui/material";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import request from "../../api/requests";
import { LoadingButton } from "@mui/lab";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const [loading, setLoading] = useState(false);

  function handleAddItem(id: number): void {
    setLoading(true);
    request.Cart.addItem(id, 1)
      .then((cart) => console.log(cart))
      .catch((cart) => console.error(cart))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}> {/* Card düzenlendi */}
        <CardContent sx={{ flexGrow: 1, textAlign: "center" }}> {/* İçerik esnek hale getirildi ve ortalandı */}
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
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: 2, flexWrap: "wrap" }}> {/* Düzenleme yapıldı */}
          <LoadingButton
            loadingPosition="start"
            loading={loading}
            onClick={() => handleAddItem(product.id)}
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