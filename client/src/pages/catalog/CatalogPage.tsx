import { useState, useEffect } from "react";
import { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";
import CircularProgress from "@mui/material/CircularProgress";
import request from "../../api/requests";

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request.Catalog.list()
        .then(data => setProducts(data))
        .finally(() => setLoading(false));
    }, []);

    return (
    <div>
      <h1>Catalog</h1> 
      {loading ? <CircularProgress /> : <ProductList products={products} />}
    </div>
  );
}
